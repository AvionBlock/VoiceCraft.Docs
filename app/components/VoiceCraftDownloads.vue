<script setup lang="ts">
const {
  t,
  releasePage,
  addonReleasePage,
  addonRepo,
  addonConfiguratorPath,
  clientPlatforms,
  serverPlatforms,
  selectedClientOs,
  selectedServerOs,
  recommendedClientKey,
  clientItemsForSelectedOs,
  serverItemsForSelectedOs,
  isRecommended,
} = useVoiceCraftDownloads()
</script>

<template>
  <section class="vc-downloads-wrap">
    <div class="vc-hero vc-reveal rounded-4 p-4 p-md-5">
      <div class="vc-page-hero-copy mx-auto text-center d-grid gap-3">
        <p class="comf-500-20 text-uppercase vc-page-kicker vc-page-kicker-violet">
          {{ t('download.kicker') }}
        </p>
        <h1 class="nuni-800-50">
          {{ t('download.title') }}
        </h1>
        <p class="vc-page-subtitle mx-auto comf-500-20 text-muted">
          {{ t('download.subtitle') }}
        </p>
        <p v-if="recommendedClientKey" class="comf-500-20 vc-downloads-detected">
          {{ t('download.detected') }}
        </p>
      </div>
    </div>

    <div class="vc-downloads-grid">
      <section class="vc-glass vc-download-card vc-reveal rounded-4 p-4">
        <div class="d-grid gap-2">
          <p class="comf-500-20 text-uppercase vc-page-kicker">
            {{ t('download.clientKicker') }}
          </p>
          <h2 class="nuni-800-40">
            {{ t('download.clientTitle') }}
          </h2>
          <p class="comf-500-20 text-muted">
            {{ t('download.clientSubtitle') }}
          </p>
        </div>

        <div class="d-grid gap-2">
          <p class="comf-500-20 text-muted">
            {{ t('download.platformLabel') }}
          </p>
          <div class="vc-platform-tabs">
            <button
              v-for="platformItem in clientPlatforms"
              :key="platformItem.key"
              class="vc-platform-tab"
              :class="{ 'vc-platform-tab-active': selectedClientOs === platformItem.key }"
              @click="selectedClientOs = platformItem.key"
            >
              {{ t(platformItem.labelKey) }}
            </button>
          </div>
        </div>

        <div class="vc-download-grid">
          <a
            v-for="item in clientItemsForSelectedOs"
            :key="item.key"
            :href="item.href"
            target="_blank"
            rel="noreferrer"
            class="vc-download-button"
            :class="{ 'vc-download-button-active': isRecommended(item.key) }"
          >
            <span class="vc-download-button-title">{{ item.label }}</span>
            <span class="vc-download-button-meta">{{ item.meta }}</span>
            <span v-if="isRecommended(item.key)" class="vc-download-badge">
              {{ t('download.recommended') }}
            </span>
          </a>
        </div>

        <p class="comf-500-20 text-muted">
          {{ t('download.androidNote') }}
        </p>
      </section>

      <section class="vc-glass vc-download-card vc-reveal vc-delay-1 rounded-4 p-4">
        <div class="d-grid gap-2">
          <p class="comf-500-20 text-uppercase vc-page-kicker vc-page-kicker-emerald">
            {{ t('download.serverKicker') }}
          </p>
          <h2 class="nuni-800-40">
            {{ t('download.serverTitle') }}
          </h2>
          <p class="comf-500-20 text-muted">
            {{ t('download.serverSubtitle') }}
          </p>
        </div>

        <div class="d-grid gap-2">
          <p class="comf-500-20 text-muted">
            {{ t('download.platformLabel') }}
          </p>
          <div class="vc-platform-tabs">
            <button
              v-for="platformItem in serverPlatforms"
              :key="platformItem.key"
              class="vc-platform-tab"
              :class="{ 'vc-platform-tab-active': selectedServerOs === platformItem.key }"
              @click="selectedServerOs = platformItem.key"
            >
              {{ t(platformItem.labelKey) }}
            </button>
          </div>
        </div>

        <div class="vc-download-grid">
          <a
            v-for="item in serverItemsForSelectedOs"
            :key="item.key"
            :href="item.href"
            target="_blank"
            rel="noreferrer"
            class="vc-download-button vc-download-button-server"
          >
            <span class="vc-download-button-title">{{ item.label }}</span>
            <span class="vc-download-button-meta">{{ item.meta }}</span>
          </a>
        </div>

        <div class="vc-download-footer d-grid gap-3">
          <p class="comf-500-20 text-muted">
            {{ t('download.serverSourceNote') }}
          </p>
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            class="btn-outline comf-500-20"
            :to="releasePage"
            target="_blank"
          >
            {{ t('download.allReleases') }}
          </UButton>
        </div>
      </section>

      <section class="vc-glass vc-download-card vc-reveal vc-delay-2 rounded-4 p-4">
        <div class="d-grid gap-2">
          <p class="comf-500-20 text-uppercase vc-page-kicker vc-page-kicker-amber">
            {{ t('download.addonKicker') }}
          </p>
          <h2 class="nuni-800-40">
            {{ t('download.addonTitle') }}
          </h2>
          <p class="comf-500-20 text-muted">
            {{ t('download.addonSubtitle') }}
          </p>
        </div>

        <div class="vc-download-grid">
          <NuxtLink
            :to="addonConfiguratorPath"
            class="vc-download-button"
          >
            <span class="vc-download-button-title">{{ t('download.addonConfigurator') }}</span>
            <span class="vc-download-button-meta">{{ t('download.worldReady') }}</span>
          </NuxtLink>
          <a
            :href="addonReleasePage"
            target="_blank"
            rel="noreferrer"
            class="vc-download-button"
          >
            <span class="vc-download-button-title">{{ t('download.addonReleases') }}</span>
            <span class="vc-download-button-meta">GitHub Releases</span>
          </a>
        </div>

        <div class="vc-download-footer d-grid gap-3">
          <p class="comf-500-20 text-muted">
            {{ t('download.addonNote') }}
          </p>
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            class="btn-outline comf-500-20"
            :to="addonRepo"
            target="_blank"
          >
            {{ t('download.addonRepo') }}
          </UButton>
        </div>
      </section>
    </div>
  </section>
</template>
