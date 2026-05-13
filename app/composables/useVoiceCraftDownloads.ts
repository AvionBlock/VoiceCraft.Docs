import { computed, onMounted, ref } from 'vue'

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

const releaseBase = 'https://github.com/AvionBlock/VoiceCraft/releases/latest/download'

const clientItems: ClientDownloadItem[] = [
  { key: 'client-windows-x64', label: 'Windows x64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Client.Windows.x64.zip`, os: 'windows', arch: 'x64' },
  { key: 'client-windows-arm64', label: 'Windows arm64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Client.Windows.arm64.zip`, os: 'windows', arch: 'arm64' },
  { key: 'client-windows-x86', label: 'Windows x86', meta: '.zip', href: `${releaseBase}/VoiceCraft.Client.Windows.x86.zip`, os: 'windows', arch: 'x86' },
  { key: 'client-linux-x64', label: 'Linux x64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Client.Linux.x64.zip`, os: 'linux', arch: 'x64' },
  { key: 'client-linux-arm64', label: 'Linux arm64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Client.Linux.arm64.zip`, os: 'linux', arch: 'arm64' },
  { key: 'client-linux-arm', label: 'Linux arm32', meta: '.zip', href: `${releaseBase}/VoiceCraft.Client.Linux.arm.zip`, os: 'linux', arch: 'arm' },
  { key: 'client-macos-arm64', label: 'macOS arm64', meta: '.dmg', href: `${releaseBase}/VoiceCraft.Client.MacOS.arm64.dmg`, os: 'macos', arch: 'arm64' },
  { key: 'client-macos-x64', label: 'macOS x64', meta: '.dmg', href: `${releaseBase}/VoiceCraft.Client.MacOS.x64.dmg`, os: 'macos', arch: 'x64' },
  { key: 'client-android-arm64', label: 'Android arm64', meta: '.zip / APK inside', href: `${releaseBase}/VoiceCraft.Client.Android.arm64.zip`, os: 'android', arch: 'arm64' },
  { key: 'client-ios-arm64', label: 'iOS arm64', meta: '.ipa', href: `${releaseBase}/VoiceCraft.Client.iOS.arm64.ipa`, os: 'ios', arch: 'arm64' },
]

const serverItems: ServerDownloadItem[] = [
  { key: 'server-windows-x64', label: 'Windows x64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Server.Windows.x64.zip`, os: 'windows' },
  { key: 'server-windows-arm64', label: 'Windows arm64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Server.Windows.arm64.zip`, os: 'windows' },
  { key: 'server-windows-x86', label: 'Windows x86', meta: '.zip', href: `${releaseBase}/VoiceCraft.Server.Windows.x86.zip`, os: 'windows' },
  { key: 'server-linux-x64', label: 'Linux x64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Server.Linux.x64.zip`, os: 'linux' },
  { key: 'server-linux-arm64', label: 'Linux arm64', meta: '.zip', href: `${releaseBase}/VoiceCraft.Server.Linux.arm64.zip`, os: 'linux' },
  { key: 'server-linux-arm', label: 'Linux arm32', meta: '.zip', href: `${releaseBase}/VoiceCraft.Server.Linux.arm.zip`, os: 'linux' },
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

export function useVoiceCraftDownloads() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  const selectedClientOs = ref<ClientOs>('windows')
  const selectedServerOs = ref<ServerOs>('windows')
  const platform = ref<ClientOs | 'unknown'>('unknown')
  const architecture = ref<ClientArch | 'unknown'>('unknown')
  const hydrated = ref(false)

  function detectClient() {
    if (typeof navigator === 'undefined') return

    const userAgent = navigator.userAgent.toLowerCase()
    const platformString = String((navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.platform || '').toLowerCase()

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
      if (clientPlatforms.some(item => item.key === platform.value)) {
        selectedClientOs.value = platform.value
      }

      if (platform.value === 'linux' || platform.value === 'windows') {
        selectedServerOs.value = platform.value
      }
    }

    hydrated.value = true
  })

  return {
    t,
    releasePage: 'https://github.com/AvionBlock/VoiceCraft/releases/latest',
    addonReleasePage: 'https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest',
    addonRepo: 'https://github.com/AvionBlock/VoiceCraft.Addon',
    addonConfiguratorPath: computed(() => localePath('/addon-configurator')),
    clientPlatforms,
    serverPlatforms,
    selectedClientOs,
    selectedServerOs,
    recommendedClientKey,
    clientItemsForSelectedOs,
    serverItemsForSelectedOs,
    isRecommended,
  }
}
