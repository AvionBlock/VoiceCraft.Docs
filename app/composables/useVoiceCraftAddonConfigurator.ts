import { computed, onMounted, ref } from 'vue'

type TransportMode = 'none' | 'http' | 'wss' | 'both'

type ReleaseOption = {
  tag: string
  name: string
  publishedAt: string | null
}

function getArchiveName(mode: TransportMode, version: string) {
  const normalizedVersion = version.toLowerCase()
  if (mode === 'none') return `voicecraft-addon-world-basic-${normalizedVersion}.zip`
  if (mode === 'http') return `voicecraft-addon-world-mchttp-${normalizedVersion}.zip`
  if (mode === 'wss') return `voicecraft-addon-world-mcwss-${normalizedVersion}.zip`
  return `voicecraft-addon-world-complete-${normalizedVersion}.zip`
}

async function fileToBase64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''

  for (const chunk of Array.from(bytes)) {
    binary += String.fromCharCode(chunk)
  }

  return btoa(binary)
}

export function useVoiceCraftAddonConfigurator() {
  const { t, locale } = useI18n()

  const transportMode = ref<TransportMode>('http')
  const selectedVersion = ref('')
  const levelDatFile = ref<File | null>(null)
  const levelDatOldFile = ref<File | null>(null)
  const worldBehaviorPacksFile = ref<File | null>(null)
  const worldResourcePacksFile = ref<File | null>(null)
  const isLoadingVersions = ref(true)
  const isBuilding = ref(false)
  const buildError = ref<string | null>(null)
  const buildMessage = ref<string | null>(null)
  const activityLog = ref<string[]>([])
  const releaseOptions = ref<ReleaseOption[]>([])

  const transportOptions = computed(() => [
    { value: 'none' as const, label: t('addonConfigurator.transport.none') },
    { value: 'http' as const, label: t('addonConfigurator.transport.http') },
    { value: 'wss' as const, label: t('addonConfigurator.transport.wss') },
    { value: 'both' as const, label: t('addonConfigurator.transport.both') },
  ])

  const selectedPackLabels = computed(() => {
    const labels = [t('addonConfigurator.packNames.base')]
    if (transportMode.value === 'http' || transportMode.value === 'both') labels.push(t('addonConfigurator.packNames.http'))
    if (transportMode.value === 'wss' || transportMode.value === 'both') labels.push(t('addonConfigurator.packNames.wss'))
    return labels
  })

  const selectedRelease = computed(() => releaseOptions.value.find(item => item.tag === selectedVersion.value) ?? null)

  const selectedReleaseCaption = computed(() => {
    if (!selectedRelease.value?.publishedAt) return selectedRelease.value?.name ?? selectedVersion.value

    return t('addonConfigurator.versionSelected', {
      version: selectedRelease.value.name,
      date: new Date(selectedRelease.value.publishedAt).toLocaleDateString(locale.value),
    })
  })

  const canBuild = computed(() => levelDatFile.value !== null && selectedVersion.value !== '' && !isBuilding.value)

  function setLevelDat(files: FileList | null) {
    levelDatFile.value = files?.[0] ?? null
    buildError.value = null
  }

  function setLevelDatOld(files: FileList | null) {
    levelDatOldFile.value = files?.[0] ?? null
    buildError.value = null
  }

  function setWorldBehaviorPacks(files: FileList | null) {
    worldBehaviorPacksFile.value = files?.[0] ?? null
    buildError.value = null
  }

  function setWorldResourcePacks(files: FileList | null) {
    worldResourcePacksFile.value = files?.[0] ?? null
    buildError.value = null
  }

  function resetMessages() {
    buildError.value = null
    buildMessage.value = null
    activityLog.value = []
  }

  function pushLog(message: string) {
    activityLog.value = [...activityLog.value, message]
  }

  async function loadReleaseOptions() {
    isLoadingVersions.value = true

    try {
      const response = await $fetch<{ releases: ReleaseOption[] }>('/api/addon-configurator/releases')
      releaseOptions.value = response.releases
      selectedVersion.value = response.releases[0]?.tag ?? ''
    } catch (error) {
      buildError.value = error instanceof Error ? error.message : t('addonConfigurator.errors.releases')
    } finally {
      isLoadingVersions.value = false
    }
  }

  async function downloadConfiguredWorld() {
    if (!levelDatFile.value || !selectedVersion.value || isBuilding.value) return

    resetMessages()
    isBuilding.value = true

    try {
      pushLog(t('addonConfigurator.progress.levelDat'))
      if (levelDatOldFile.value) pushLog(t('addonConfigurator.progress.levelDatOld'))
      if (worldBehaviorPacksFile.value) pushLog(t('addonConfigurator.progress.behaviorJson'))
      if (worldResourcePacksFile.value) pushLog(t('addonConfigurator.progress.resourceJson'))
      pushLog(t('addonConfigurator.progress.release', { version: selectedVersion.value }))
      pushLog(t('addonConfigurator.progress.request'))

      const levelDatBase64 = await fileToBase64(levelDatFile.value)
      const levelDatOldBase64 = levelDatOldFile.value ? await fileToBase64(levelDatOldFile.value) : null
      const worldBehaviorPacksBase64 = worldBehaviorPacksFile.value ? await fileToBase64(worldBehaviorPacksFile.value) : null
      const worldResourcePacksBase64 = worldResourcePacksFile.value ? await fileToBase64(worldResourcePacksFile.value) : null
      const response = await fetch('/api/addon-configurator/build', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          version: selectedVersion.value,
          transportMode: transportMode.value,
          levelDatBase64,
          levelDatFileName: levelDatFile.value.name,
          levelDatOldBase64,
          levelDatOldFileName: levelDatOldFile.value?.name ?? null,
          worldBehaviorPacksBase64,
          worldBehaviorPacksFileName: worldBehaviorPacksFile.value?.name ?? null,
          worldResourcePacksBase64,
          worldResourcePacksFileName: worldResourcePacksFile.value?.name ?? null,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(payload?.statusMessage ?? t('addonConfigurator.errors.generic'))
      }

      pushLog(t('addonConfigurator.progress.archive'))
      const archiveBlob = await response.blob()
      const downloadUrl = URL.createObjectURL(archiveBlob)
      const anchor = document.createElement('a')
      anchor.href = downloadUrl
      anchor.download = getArchiveName(transportMode.value, selectedVersion.value)
      anchor.click()
      URL.revokeObjectURL(downloadUrl)

      buildMessage.value = t('addonConfigurator.success')
      pushLog(t('addonConfigurator.progress.done'))
    } catch (error) {
      buildError.value = error instanceof Error ? error.message : t('addonConfigurator.errors.generic')
    } finally {
      isBuilding.value = false
    }
  }

  onMounted(() => {
    void loadReleaseOptions()
  })

  return {
    t,
    transportMode,
    selectedVersion,
    levelDatFile,
    levelDatOldFile,
    worldBehaviorPacksFile,
    worldResourcePacksFile,
    isLoadingVersions,
    isBuilding,
    buildError,
    buildMessage,
    activityLog,
    releaseOptions,
    transportOptions,
    selectedPackLabels,
    selectedRelease,
    selectedReleaseCaption,
    canBuild,
    setLevelDat,
    setLevelDatOld,
    setWorldBehaviorPacks,
    setWorldResourcePacks,
    downloadConfiguredWorld,
  }
}
