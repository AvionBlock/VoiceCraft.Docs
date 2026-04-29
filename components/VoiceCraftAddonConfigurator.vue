<script setup lang="ts">
type TransportMode = 'none' | 'http' | 'wss' | 'both'

type ReleaseOption = {
  tag: string
  name: string
  publishedAt: string | null
}

const { t, locale } = useI18n()

const transportMode = ref<TransportMode>('http')
const selectedVersion = ref<string>('')
const levelDatFile = ref<File | null>(null)
const levelDatOldFile = ref<File | null>(null)
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

const selectedRelease = computed(() => releaseOptions.value.find((item) => item.tag === selectedVersion.value) ?? null)

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

function resetMessages() {
  buildError.value = null
  buildMessage.value = null
  activityLog.value = []
}

function pushLog(message: string) {
  activityLog.value = [...activityLog.value, message]
}

function getArchiveName(mode: TransportMode, version: string) {
  const normalizedVersion = version.toLowerCase()
  if (mode === 'none') return `voicecraft-addon-world-basic-${normalizedVersion}.zip`
  if (mode === 'http') return `voicecraft-addon-world-mchttp-${normalizedVersion}.zip`
  if (mode === 'wss') return `voicecraft-addon-world-mcwss-${normalizedVersion}.zip`
  return `voicecraft-addon-world-complete-${normalizedVersion}.zip`
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

async function fileToBase64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''

  for (const chunk of Array.from(bytes)) {
    binary += String.fromCharCode(chunk)
  }

  return btoa(binary)
}

async function downloadConfiguredWorld() {
  if (!levelDatFile.value || !selectedVersion.value || isBuilding.value) return

  resetMessages()
  isBuilding.value = true

  try {
    pushLog(t('addonConfigurator.progress.levelDat'))
    if (levelDatOldFile.value) {
      pushLog(t('addonConfigurator.progress.levelDatOld'))
    }
    pushLog(t('addonConfigurator.progress.release', { version: selectedVersion.value }))
    pushLog(t('addonConfigurator.progress.request'))

    const levelDatBase64 = await fileToBase64(levelDatFile.value)
    const levelDatOldBase64 = levelDatOldFile.value ? await fileToBase64(levelDatOldFile.value) : null
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
</script>

<template>
  <section class="vc-addon-config-wrap space-y-8 md:space-y-10">
    <div class="vc-addon-config-hero vc-reveal rounded-3xl p-6 md:p-10">
      <div class="max-w-4xl space-y-5">
        <p class="comf-500-20 uppercase tracking-wider text-emerald-300/90">
          {{ t('addonConfigurator.kicker') }}
        </p>
        <h1 class="nuni-800-50 tracking-tight md:nuni-800-60">
          {{ t('addonConfigurator.title') }}
        </h1>
        <p class="max-w-3xl comf-500-20 text-muted">
          {{ t('addonConfigurator.subtitle') }}
        </p>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section class="vc-glass vc-reveal rounded-3xl p-5 md:p-7 space-y-7">
        <div class="space-y-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.steps.version') }}
          </p>
          <div class="vc-addon-config-summary">
            <select
              v-model="selectedVersion"
              class="vc-addon-config-select"
              :disabled="isLoadingVersions || !releaseOptions.length"
            >
              <option value="" disabled>
                {{ isLoadingVersions ? t('addonConfigurator.loadingVersions') : t('addonConfigurator.versionPlaceholder') }}
              </option>
              <option
                v-for="release in releaseOptions"
                :key="release.tag"
                :value="release.tag"
              >
                {{ release.name }}
              </option>
            </select>

            <div v-if="selectedReleaseCaption" class="vc-addon-config-note">
              {{ selectedReleaseCaption }}
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.steps.selection') }}
          </p>
          <div class="vc-addon-config-summary">
            <div class="vc-addon-config-chip vc-addon-config-chip-fixed">
              {{ t('addonConfigurator.packNames.base') }}
            </div>
            <div class="vc-addon-config-choice-grid">
              <button
                v-for="option in transportOptions"
                :key="option.value"
                type="button"
                class="vc-addon-config-choice"
                :class="{ 'vc-addon-config-choice-active': transportMode === option.value }"
                @click="transportMode = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.steps.levelDat') }}
          </p>
          <label class="vc-addon-config-upload">
            <input
              type="file"
              class="sr-only"
              accept=".dat,level.dat"
              @change="setLevelDat(($event.target as HTMLInputElement).files)"
            >
            <span class="vc-addon-config-upload-title">
              {{ levelDatFile ? levelDatFile.name : t('addonConfigurator.uploadTitle') }}
            </span>
            <span class="vc-addon-config-upload-subtitle">
              {{ t('addonConfigurator.uploadSubtitle') }}
            </span>
          </label>
          <div class="vc-addon-config-note">
            {{ t('addonConfigurator.betaApiStub') }}
          </div>
          <label class="vc-addon-config-upload">
            <input
              type="file"
              class="sr-only"
              accept=".dat_old,level.dat_old"
              @change="setLevelDatOld(($event.target as HTMLInputElement).files)"
            >
            <span class="vc-addon-config-upload-title">
              {{ levelDatOldFile ? levelDatOldFile.name : t('addonConfigurator.uploadOldTitle') }}
            </span>
            <span class="vc-addon-config-upload-subtitle">
              {{ t('addonConfigurator.uploadOldSubtitle') }}
            </span>
          </label>
        </div>

        <div class="space-y-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.steps.build') }}
          </p>
          <UButton
            size="xl"
            class="vc-btn-main comf-500-20"
            :disabled="!canBuild"
            @click="downloadConfiguredWorld"
          >
            {{ isBuilding ? t('addonConfigurator.building') : t('addonConfigurator.buildAction') }}
          </UButton>
          <p v-if="buildError" class="vc-addon-config-error">
            {{ buildError }}
          </p>
          <p v-else-if="buildMessage" class="vc-addon-config-success">
            {{ buildMessage }}
          </p>
        </div>
      </section>

      <aside class="vc-glass vc-reveal vc-delay-1 rounded-3xl p-5 md:p-7 space-y-6">
        <div class="space-y-2">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.summaryTitle') }}
          </p>
          <p class="comf-500-20 text-muted">
            {{ t('addonConfigurator.summarySubtitle') }}
          </p>
        </div>

        <div class="space-y-3">
          <div
            v-for="label in selectedPackLabels"
            :key="label"
            class="vc-addon-config-list-item"
          >
            <span>{{ label }}</span>
          </div>
        </div>

        <div class="space-y-3">
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">release</span>
            <span>{{ selectedRelease?.name ?? t('addonConfigurator.versionPlaceholder') }}</span>
          </div>
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">level.dat</span>
            <span>{{ t('addonConfigurator.outputs.levelDat') }}</span>
          </div>
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">level.dat_old</span>
            <span>{{ levelDatOldFile ? t('addonConfigurator.outputs.levelDatOldIncluded') : t('addonConfigurator.outputs.levelDatOldOptional') }}</span>
          </div>
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">world_behavior_packs.json</span>
            <span>{{ t('addonConfigurator.outputs.behaviorJson') }}</span>
          </div>
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">world_resource_packs.json</span>
            <span>{{ t('addonConfigurator.outputs.resourceJson') }}</span>
          </div>
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">behavior_packs/</span>
            <span>{{ t('addonConfigurator.outputs.behaviorFolder') }}</span>
          </div>
          <div class="vc-addon-config-file-map">
            <span class="vc-addon-config-file-key">resource_packs/</span>
            <span>{{ t('addonConfigurator.outputs.resourceFolder') }}</span>
          </div>
        </div>

        <div v-if="activityLog.length" class="space-y-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.progressTitle') }}
          </p>
          <div class="space-y-2">
            <div
              v-for="(item, index) in activityLog"
              :key="`${item}-${index}`"
              class="vc-addon-config-log-item"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <p class="vc-addon-config-note">
          {{ t('addonConfigurator.archiveNote') }}
        </p>
      </aside>
    </div>
  </section>
</template>
