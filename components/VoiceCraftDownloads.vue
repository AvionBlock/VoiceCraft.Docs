<script setup lang="ts">
import { computed } from 'vue'

type ClientOs = 'windows' | 'linux' | 'macos' | 'android' | 'ios'
type ClientArch = 'x64' | 'x86' | 'arm' | 'arm64'
type ServerOs = 'windows' | 'linux'

type ClientDownloadItem = {
  key: string
  label: string
  meta: string
  href: string
  os: ClientOs
  arch: ClientArch
}

type ServerDownloadItem = {
  key: string
  label: string
  meta: string
  href: string
  os: ServerOs
}

const { t } = useI18n()

const releaseBase = 'https://github.com/AvionBlock/VoiceCraft/releases/latest/download'
const releasePage = 'https://github.com/AvionBlock/VoiceCraft/releases/latest'
const addonReleasePage = 'https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest'
const addonSourceZip = 'https://github.com/AvionBlock/VoiceCraft.Addon/archive/refs/heads/main.zip'
const addonRepo = 'https://github.com/AvionBlock/VoiceCraft.Addon'

const clientItems: ClientDownloadItem[] = [
  {
    key: 'client-windows-x64',
    label: 'Windows x64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Client.Windows.x64.zip`,
    os: 'windows',
    arch: 'x64',
  },
  {
    key: 'client-windows-arm64',
    label: 'Windows arm64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Client.Windows.arm64.zip`,
    os: 'windows',
    arch: 'arm64',
  },
  {
    key: 'client-windows-x86',
    label: 'Windows x86',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Client.Windows.x86.zip`,
    os: 'windows',
    arch: 'x86',
  },
  {
    key: 'client-linux-x64',
    label: 'Linux x64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Client.Linux.x64.zip`,
    os: 'linux',
    arch: 'x64',
  },
  {
    key: 'client-linux-arm64',
    label: 'Linux arm64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Client.Linux.arm64.zip`,
    os: 'linux',
    arch: 'arm64',
  },
  {
    key: 'client-linux-arm',
    label: 'Linux arm32',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Client.Linux.arm.zip`,
    os: 'linux',
    arch: 'arm',
  },
  {
    key: 'client-macos-arm64',
    label: 'macOS arm64',
    meta: '.dmg',
    href: `${releaseBase}/VoiceCraft.Client.MacOS.arm64.dmg`,
    os: 'macos',
    arch: 'arm64',
  },
  {
    key: 'client-macos-x64',
    label: 'macOS x64',
    meta: '.dmg',
    href: `${releaseBase}/VoiceCraft.Client.MacOS.x64.dmg`,
    os: 'macos',
    arch: 'x64',
  },
  {
    key: 'client-android-arm64',
    label: 'Android arm64',
    meta: '.zip / APK inside',
    href: `${releaseBase}/VoiceCraft.Client.Android.arm64.zip`,
    os: 'android',
    arch: 'arm64',
  },
  {
    key: 'client-ios-arm64',
    label: 'iOS arm64',
    meta: '.ipa',
    href: `${releaseBase}/VoiceCraft.Client.iOS.arm64.ipa`,
    os: 'ios',
    arch: 'arm64',
  },
]

const serverItems: ServerDownloadItem[] = [
  {
    key: 'server-windows-x64',
    label: 'Windows x64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Server.Windows.x64.zip`,
    os: 'windows',
  },
  {
    key: 'server-windows-arm64',
    label: 'Windows arm64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Server.Windows.arm64.zip`,
    os: 'windows',
  },
  {
    key: 'server-windows-x86',
    label: 'Windows x86',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Server.Windows.x86.zip`,
    os: 'windows',
  },
  {
    key: 'server-linux-x64',
    label: 'Linux x64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Server.Linux.x64.zip`,
    os: 'linux',
  },
  {
    key: 'server-linux-arm64',
    label: 'Linux arm64',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Server.Linux.arm64.zip`,
    os: 'linux',
  },
  {
    key: 'server-linux-arm',
    label: 'Linux arm32',
    meta: '.zip',
    href: `${releaseBase}/VoiceCraft.Server.Linux.arm.zip`,
    os: 'linux',
  },
]

const clientPlatforms: { key: ClientOs, labelKey: string }[] = [
  { key: 'windows', labelKey: 'download.platforms.windows' },
  { key: 'linux', labelKey: 'download.platforms.linux' },
  { key: 'macos', labelKey: 'download.platforms.macos' },
  { key: 'android', labelKey: 'download.platforms.android' },
  { key: 'ios', labelKey: 'download.platforms.ios' },
]

const serverPlatforms: { key: ServerOs, labelKey: string }[] = [
  { key: 'windows', labelKey: 'download.platforms.windows' },
  { key: 'linux', labelKey: 'download.platforms.linux' },
]

const selectedClientOs = ref<ClientOs>('windows')
const selectedServerOs = ref<ServerOs>('windows')
const platform = ref<ClientOs | 'unknown'>('unknown')
const architecture = ref<ClientArch | 'unknown'>('unknown')
const hydrated = ref(false)

function detectClient() {
  if (typeof navigator === 'undefined') return

  const userAgent = navigator.userAgent.toLowerCase()
  const platformString = String(navigator.userAgentData?.platform || navigator.platform || '').toLowerCase()

  if (userAgent.includes('android')) {
    platform.value = 'android'
  } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
    platform.value = 'ios'
  } else if (platformString.includes('win')) {
    platform.value = 'windows'
  } else if (platformString.includes('mac')) {
    platform.value = 'macos'
  } else if (platformString.includes('linux')) {
    platform.value = 'linux'
  }

  if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
    architecture.value = 'arm64'
  } else if (userAgent.includes('arm')) {
    architecture.value = 'arm'
  } else if (userAgent.includes('x86_64') || userAgent.includes('win64') || userAgent.includes('x64') || userAgent.includes('amd64')) {
    architecture.value = 'x64'
  } else if (userAgent.includes('i686') || userAgent.includes('i386') || userAgent.includes('x86')) {
    architecture.value = 'x86'
  } else if (platform.value === 'android' || platform.value === 'ios') {
    architecture.value = 'arm64'
  }
}

const recommendedClientKey = computed(() => {
  if (!hydrated.value) return null

  const exactMatch = clientItems.find(item => item.os === platform.value && item.arch === architecture.value)
  if (exactMatch) return exactMatch.key

  const osFallback = clientItems.find(item => item.os === platform.value)
  return osFallback?.key ?? null
})

const clientItemsForSelectedOs = computed(() =>
  clientItems.filter(item => item.os === selectedClientOs.value),
)

const serverItemsForSelectedOs = computed(() =>
  serverItems.filter(item => item.os === selectedServerOs.value),
)

function isRecommended(key: string) {
  return key === recommendedClientKey.value
}

onMounted(() => {
  detectClient()
  if (platform.value !== 'unknown') {
    const hasClientPlatform = clientPlatforms.some(item => item.key === platform.value)
    if (hasClientPlatform) {
      selectedClientOs.value = platform.value
    }
    if (platform.value === 'linux' || platform.value === 'windows') {
      selectedServerOs.value = platform.value
    }
  }
  hydrated.value = true
})
</script>

<template>
  <section class="vc-downloads-wrap space-y-8 md:space-y-10">
    <div class="vc-hero vc-reveal rounded-2xl p-6 md:p-10">
      <div class="mx-auto max-w-4xl text-center space-y-5">
        <p class="comf-500-20 uppercase tracking-wider text-violet-300/90">
          {{ t('download.kicker') }}
        </p>
        <h1 class="nuni-800-50 tracking-tight md:nuni-800-60">
          {{ t('download.title') }}
        </h1>
        <p class="mx-auto max-w-3xl comf-500-20 text-muted">
          {{ t('download.subtitle') }}
        </p>
        <p v-if="recommendedClientKey" class="comf-500-20 vc-downloads-detected">
          {{ t('download.detected') }}
        </p>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-3">
      <section class="vc-glass vc-download-card vc-reveal rounded-2xl p-5 md:p-7 space-y-5">
        <div class="space-y-2">
          <p class="comf-500-20 uppercase tracking-wider text-cyan-300/90">
            {{ t('download.clientKicker') }}
          </p>
          <h2 class="nuni-800-40">
            {{ t('download.clientTitle') }}
          </h2>
          <p class="comf-500-20 text-muted">
            {{ t('download.clientSubtitle') }}
          </p>
        </div>

        <div class="space-y-2">
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

      <section class="vc-glass vc-download-card vc-reveal vc-delay-1 rounded-2xl p-5 md:p-7 space-y-5">
        <div class="space-y-2">
          <p class="comf-500-20 uppercase tracking-wider text-emerald-300/90">
            {{ t('download.serverKicker') }}
          </p>
          <h2 class="nuni-800-40">
            {{ t('download.serverTitle') }}
          </h2>
          <p class="comf-500-20 text-muted">
            {{ t('download.serverSubtitle') }}
          </p>
        </div>

        <div class="space-y-2">
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

        <div class="vc-download-footer space-y-3">
          <p class="comf-500-20 text-muted">
            {{ t('download.serverSourceNote') }}
          </p>
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            class="vc-btn-outline comf-500-20"
            :to="releasePage"
            target="_blank"
          >
            {{ t('download.allReleases') }}
          </UButton>
        </div>
      </section>

      <section class="vc-glass vc-download-card vc-reveal vc-delay-2 rounded-2xl p-5 md:p-7 space-y-5">
        <div class="space-y-2">
          <p class="comf-500-20 uppercase tracking-wider text-amber-300/90">
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
          <a
            :href="addonReleasePage"
            target="_blank"
            rel="noreferrer"
            class="vc-download-button"
          >
            <span class="vc-download-button-title">{{ t('download.addonReleases') }}</span>
            <span class="vc-download-button-meta">GitHub Releases</span>
          </a>
          <a
            :href="addonSourceZip"
            target="_blank"
            rel="noreferrer"
            class="vc-download-button"
          >
            <span class="vc-download-button-title">{{ t('download.addonSourceZip') }}</span>
            <span class="vc-download-button-meta">.zip</span>
          </a>
        </div>

        <div class="vc-download-footer space-y-3">
          <p class="comf-500-20 text-muted">
            {{ t('download.addonNote') }}
          </p>
          <UButton
            size="lg"
            color="neutral"
            variant="outline"
            class="vc-btn-outline comf-500-20"
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
