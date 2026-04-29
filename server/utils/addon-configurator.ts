import JSZip from 'jszip'
import * as nbt from 'prismarine-nbt'

export type TransportMode = 'none' | 'http' | 'wss' | 'both'

type GitHubReleaseAsset = {
  name: string
  browser_download_url: string
}

type GitHubRelease = {
  tag_name: string
  name: string
  draft: boolean
  prerelease: boolean
  published_at: string | null
  assets: GitHubReleaseAsset[]
}

type PackManifestReference = {
  pack_id: string
  version: number[]
}

type ReleasePackKey = 'base' | 'http' | 'wss'

type LoadedPack = {
  bundleZip: JSZip
  bpManifest: Record<string, unknown>
  rpManifest: Record<string, unknown>
  folderSlug: string
}

const OWNER = 'AvionBlock'
const REPO = 'VoiceCraft'
const RELEASES_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases`

const PACK_DEFINITIONS: Record<ReleasePackKey, { assetName: string, folderSlug: string }> = {
  base: {
    assetName: 'VoiceCraft.Addon.Basic.zip',
    folderSlug: 'voicecraft-basic',
  },
  http: {
    assetName: 'VoiceCraft.Addon.Core.McHttp.zip',
    folderSlug: 'voicecraft-mchttp',
  },
  wss: {
    assetName: 'VoiceCraft.Addon.Core.McWss.zip',
    folderSlug: 'voicecraft-mcwss',
  },
}

export async function fetchAddonReleases() {
  const releases = await $fetch<GitHubRelease[]>(RELEASES_URL, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'VoiceCraft.Docs',
    },
  })

  return releases
    .filter((release) => !release.draft)
    .filter((release) => hasRequiredAssets(release.assets))
    .map((release) => ({
      tag: release.tag_name,
      name: release.name || release.tag_name,
      publishedAt: release.published_at,
      assets: release.assets,
    }))
}

export function getPackKeysForMode(mode: TransportMode): ReleasePackKey[] {
  if (mode === 'none') return ['base']
  if (mode === 'http') return ['base', 'http']
  if (mode === 'wss') return ['base', 'wss']
  return ['base', 'http', 'wss']
}

export async function buildConfiguredAddonArchive(input: {
  version: string
  transportMode: TransportMode
  levelDatBytes: Uint8Array
}) {
  const releases = await fetchAddonReleases()
  const release = releases.find((item) => item.tag === input.version)

  if (!release) {
    throw createError({
      statusCode: 404,
      statusMessage: `VoiceCraft release ${input.version} was not found.`,
    })
  }

  const outputZip = new JSZip()
  outputZip.file('level.dat', await patchLevelDatPlaceholder(input.levelDatBytes))

  const worldBehaviorPacks: PackManifestReference[] = []
  const worldResourcePacks: PackManifestReference[] = []

  for (const packKey of getPackKeysForMode(input.transportMode)) {
    const loadedPack = await loadPackBundle(release.assets, packKey)
    await addPackEntries(outputZip, loadedPack.bundleZip, 'BP', `behavior_packs/${loadedPack.folderSlug}`)
    await addPackEntries(outputZip, loadedPack.bundleZip, 'RP', `resource_packs/${loadedPack.folderSlug}`)
    worldBehaviorPacks.push(makeWorldPackReference(loadedPack.bpManifest))
    worldResourcePacks.push(makeWorldPackReference(loadedPack.rpManifest))
  }

  outputZip.file('world_behavior_packs.json', JSON.stringify(worldBehaviorPacks, null, 2))
  outputZip.file('world_resource_packs.json', JSON.stringify(worldResourcePacks, null, 2))

  return await outputZip.generateAsync({ type: 'uint8array' })
}

function hasRequiredAssets(assets: GitHubReleaseAsset[]) {
  return Object.values(PACK_DEFINITIONS).every((definition) => assets.some((asset) => asset.name === definition.assetName))
}

async function loadPackBundle(assets: GitHubReleaseAsset[], packKey: ReleasePackKey): Promise<LoadedPack> {
  const definition = PACK_DEFINITIONS[packKey]
  const asset = assets.find((item) => item.name === definition.assetName)

  if (!asset) {
    throw createError({
      statusCode: 404,
      statusMessage: `Release asset ${definition.assetName} was not found.`,
    })
  }

  const zipBytes = await fetchArrayBuffer(asset.browser_download_url)
  const bundleZip = await JSZip.loadAsync(zipBytes)
  const bpManifestEntry = bundleZip.file('BP/manifest.json')
  const rpManifestEntry = bundleZip.file('RP/manifest.json')

  if (!bpManifestEntry || !rpManifestEntry) {
    throw createError({
      statusCode: 500,
      statusMessage: `Release asset ${definition.assetName} is missing BP/RP manifests.`,
    })
  }

  return {
    bundleZip,
    bpManifest: JSON.parse(await bpManifestEntry.async('string')),
    rpManifest: JSON.parse(await rpManifestEntry.async('string')),
    folderSlug: definition.folderSlug,
  }
}

async function fetchArrayBuffer(url: string) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'VoiceCraft.Docs',
    },
  })

  if (!response.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: `Failed to download release asset from GitHub: ${url}`,
    })
  }

  return await response.arrayBuffer()
}

async function addPackEntries(outputZip: JSZip, sourceZip: JSZip, sourceFolder: 'BP' | 'RP', destinationFolder: string) {
  for (const [relativePath, file] of Object.entries(sourceZip.files)) {
    if (!relativePath.startsWith(`${sourceFolder}/`) || file.dir) continue
    const nextPath = relativePath.replace(`${sourceFolder}/`, `${destinationFolder}/`)
    outputZip.file(nextPath, await file.async('uint8array'))
  }
}

async function patchLevelDatPlaceholder(bytes: Uint8Array) {
  const raw = Buffer.from(bytes)

  if (raw.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'level.dat is too small to contain a Bedrock header.',
    })
  }

  const version = raw.readUInt32LE(0)
  const bodyLength = raw.readUInt32LE(4)
  const body = raw.subarray(8)

  if (body.length !== bodyLength) {
    console.warn(`level.dat header length ${bodyLength}, actual ${body.length}`)
  }

  const { parsed } = await nbt.parse(body, 'little')
  const root = parsed.value as Record<string, { type: string, value: unknown }>

  if (!root.experiments || root.experiments.type !== 'compound') {
    root.experiments = {
      type: 'compound',
      value: {},
    }
  }

  const experiments = root.experiments.value as Record<string, { type: string, value: number }>
  experiments.experiments_ever_used = { type: 'byte', value: 1 }
  experiments.gametest = { type: 'byte', value: 1 }
  experiments.saved_with_toggled_experiments = { type: 'byte', value: 1 }

  const newBody = Buffer.from(nbt.writeUncompressed(parsed, 'little'))
  const header = Buffer.alloc(8)
  header.writeUInt32LE(version, 0)
  header.writeUInt32LE(newBody.length, 4)

  return new Uint8Array(Buffer.concat([header, newBody]))
}

function makeWorldPackReference(manifest: Record<string, unknown>): PackManifestReference {
  const header = manifest.header as { uuid: string, version: number[] }
  return {
    pack_id: header.uuid,
    version: JSON.parse(JSON.stringify(header.version)) as number[],
  }
}
