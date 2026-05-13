<script setup lang="ts">
const {
  t,
  transportMode,
  selectedVersion,
  levelDatFile,
  levelDatOldFile,
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
  downloadConfiguredWorld,
} = useVoiceCraftAddonConfigurator()
</script>

<template>
  <section class="vc-addon-config-wrap">
    <div class="vc-addon-config-hero vc-reveal rounded-4 p-4 p-md-5">
      <div class="vc-page-hero-copy d-grid gap-3">
        <p class="comf-500-20 text-uppercase vc-page-kicker vc-page-kicker-emerald">
          {{ t('addonConfigurator.kicker') }}
        </p>
        <h1 class="nuni-800-50">
          {{ t('addonConfigurator.title') }}
        </h1>
        <p class="vc-page-subtitle comf-500-20 text-muted">
          {{ t('addonConfigurator.subtitle') }}
        </p>
      </div>
    </div>

    <div class="vc-addon-config-layout">
      <section class="vc-glass vc-reveal rounded-4 p-4 d-grid gap-4">
        <div class="d-grid gap-3">
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

        <div class="d-grid gap-3">
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

        <div class="d-grid gap-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.steps.levelDat') }}
          </p>
          <label class="vc-addon-config-upload">
            <input
              type="file"
              class="visually-hidden"
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
              class="visually-hidden"
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

        <div class="d-grid gap-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.steps.build') }}
          </p>
          <UButton
            size="xl"
            class="btn-main comf-500-20"
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

      <aside class="vc-glass vc-reveal vc-delay-1 rounded-4 p-4 d-grid gap-4">
        <div class="d-grid gap-2">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.summaryTitle') }}
          </p>
          <p class="comf-500-20 text-muted">
            {{ t('addonConfigurator.summarySubtitle') }}
          </p>
        </div>

        <div class="d-grid gap-3">
          <div
            v-for="label in selectedPackLabels"
            :key="label"
            class="vc-addon-config-list-item"
          >
            <span>{{ label }}</span>
          </div>
        </div>

        <div class="d-grid gap-3">
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

        <div v-if="activityLog.length" class="d-grid gap-3">
          <p class="vc-addon-config-section-label">
            {{ t('addonConfigurator.progressTitle') }}
          </p>
          <div class="d-grid gap-2">
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
