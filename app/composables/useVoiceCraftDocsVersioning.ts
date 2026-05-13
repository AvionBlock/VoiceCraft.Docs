export type VoiceCraftDocsVersion = {
  id: string
  label: string
  current?: boolean
  extends?: string
  source?: 'legacy' | 'overlay'
}

type VoiceCraftDocsVersioningConfig = {
  current?: string
  legacy?: string
  versions?: VoiceCraftDocsVersion[]
}

const versionPrefix = '/v'
const overlayContentPrefix = '/docs'
const defaultVersion: VoiceCraftDocsVersion = {
  id: '1.6.x',
  label: '1.6.x',
  current: true,
  source: 'legacy',
}

function withoutTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function normalizeDocsPath(path?: string) {
  const normalized = `/${(path || '').split('/').filter(Boolean).join('/')}`
  return normalized === '/' ? '/' : withoutTrailingSlash(normalized)
}

export function getDocsPathFromRoute(path: string) {
  const normalized = normalizeDocsPath(path)
  const match = normalized.match(/^\/v\/([^/]+)(\/.*)?$/)
  return match ? normalizeDocsPath(match[2] || '/') : normalized
}

export function getDocsVersionFromRoute(path: string) {
  return normalizeDocsPath(path).match(/^\/v\/([^/]+)(?:\/|$)/)?.[1]
}

export function useVoiceCraftDocsVersioning() {
  const appConfig = useAppConfig() as {
    docsVersioning?: VoiceCraftDocsVersioningConfig
  }

  const versions = computed(() => {
    const items = appConfig.docsVersioning?.versions
    return items?.length ? items : [defaultVersion]
  })

  const versionsById = computed(() => new Map(versions.value.map(version => [version.id, version])))

  const currentVersionId = computed(() => (
    appConfig.docsVersioning?.current
    || versions.value.find(version => version.current)?.id
    || versions.value[0]?.id
    || defaultVersion.id
  ))

  const legacyVersionId = computed(() => (
    appConfig.docsVersioning?.legacy
    || versions.value.find(version => version.source === 'legacy')?.id
    || currentVersionId.value
  ))

  const currentVersion = computed(() => findVersion(currentVersionId.value))

  function findVersion(id?: string) {
    return id ? versionsById.value.get(id) : undefined
  }

  function getVersionChain(versionId?: string) {
    const chain: VoiceCraftDocsVersion[] = []
    const seen = new Set<string>()
    let nextVersionId = versionId || currentVersionId.value

    while (nextVersionId && !seen.has(nextVersionId)) {
      const version = findVersion(nextVersionId)
      if (!version) break
      chain.push(version)
      seen.add(nextVersionId)
      nextVersionId = version.extends || ''
    }

    return chain
  }

  function isLegacyVersion(version: VoiceCraftDocsVersion) {
    return version.source === 'legacy' || version.id === legacyVersionId.value
  }

  function getContentPathCandidates(versionId: string | undefined, locale: string, path: string) {
    const version = findVersion(versionId || currentVersionId.value)
    if (!version) return []

    const routePath = normalizeDocsPath(path)
    const suffix = routePath === '/' ? '' : routePath
    const locales = Array.from(new Set([locale, 'en'].filter(Boolean)))

    return getVersionChain(version.id).flatMap((versionItem) => {
      const contentBase = isLegacyVersion(versionItem)
        ? ''
        : `${overlayContentPrefix}/${versionItem.id}`

      return locales.map(localeCode => `${contentBase}/${localeCode}${suffix}`)
    })
  }

  function buildDocsPath(path: string, versionId?: string) {
    const routePath = normalizeDocsPath(path)
    const targetVersionId = versionId || currentVersionId.value
    const suffix = routePath === '/' ? '' : routePath

    return targetVersionId === currentVersionId.value
      ? routePath
      : `${versionPrefix}/${targetVersionId}${suffix}`
  }

  return {
    versions,
    currentVersion,
    currentVersionId,
    legacyVersionId,
    findVersion,
    getContentPathCandidates,
    getVersionChain,
    buildDocsPath,
  }
}
