export type DocsNavigationGroup = {
  title: string
  titleKey: string
  items: {
    label: string
    labelKey: string
    to: string
    versioned?: boolean
  }[]
}

export type TopNavigationItem = {
  label: string
  labelKey: string
  to: string
  versioned?: boolean
}

export const resolveNavigationLabel = (
  translate: (key: string) => string,
  key: string,
  fallback: string,
) => {
  const translated = translate(key)
  return translated === key ? fallback : translated
}

export const docsNavigation: DocsNavigationGroup[] = [
  {
    title: 'Start',
    titleKey: 'navigation.groups.start',
    items: [
      { label: 'Overview', labelKey: 'navigation.items.overview', to: '/start/overview' },
      { label: 'Quick Start', labelKey: 'navigation.items.quickStart', to: '/start/quick-start' },
    ],
  },
  {
    title: 'Client',
    titleKey: 'navigation.groups.client',
    items: [
      { label: 'Installation', labelKey: 'navigation.items.installation', to: '/client/installation' },
      { label: 'Settings', labelKey: 'navigation.items.settings', to: '/client/settings' },
      { label: 'Settings.json', labelKey: 'navigation.items.settingsJson', to: '/client/settings-json' },
    ],
  },
  {
    title: 'Server',
    titleKey: 'navigation.groups.server',
    items: [
      { label: 'Installation', labelKey: 'navigation.items.installation', to: '/server/installation' },
      { label: 'First Run', labelKey: 'navigation.items.firstRun', to: '/server/first-run' },
      { label: 'ServerProperties.json', labelKey: 'navigation.items.serverProperties', to: '/server/server-properties' },
      { label: 'Commands', labelKey: 'navigation.items.commands', to: '/server/commands' },
      { label: 'Runtime Overrides', labelKey: 'navigation.items.runtimeOverrides', to: '/server/runtime-overrides' },
      { label: 'Transports', labelKey: 'navigation.items.transports', to: '/server/transports' },
    ],
  },
  {
    title: 'Minecraft',
    titleKey: 'navigation.groups.minecraft',
    items: [
      { label: 'McHttp for BDS', labelKey: 'navigation.items.mcHttpBds', to: '/minecraft/mchttp-bds' },
      { label: 'McWss Singleplayer', labelKey: 'navigation.items.mcWssSingleplayer', to: '/minecraft/mcwss-singleplayer' },
    ],
  },
  {
    title: 'Operations',
    titleKey: 'navigation.groups.operations',
    items: [
      { label: 'Update & Backup', labelKey: 'navigation.items.updateBackup', to: '/operations/update-backup' },
      { label: 'Troubleshooting', labelKey: 'navigation.items.troubleshooting', to: '/operations/troubleshooting' },
      { label: 'Security Hardening', labelKey: 'navigation.items.securityHardening', to: '/operations/security-hardening' },
      { label: 'Hosting Caveats', labelKey: 'navigation.items.hostingCaveats', to: '/operations/hosting-caveats' },
      { label: 'Backup & Restore', labelKey: 'navigation.items.backupRestore', to: '/operations/backup-restore-runbook' },
      { label: 'Upgrade Runbook', labelKey: 'navigation.items.upgradeRunbook', to: '/operations/upgrade-runbook' },
      { label: 'Troubleshooting Matrix', labelKey: 'navigation.items.troubleshootingMatrix', to: '/operations/troubleshooting-matrix' },
    ],
  },
  {
    title: 'Ecosystem',
    titleKey: 'navigation.groups.ecosystem',
    items: [
      { label: 'Overview', labelKey: 'navigation.items.overview', to: '/ecosystem/overview' },
      { label: 'VoiceCraft Repository', labelKey: 'navigation.items.voiceCraftRepository', to: '/ecosystem/voicecraft-repository' },
      { label: 'GeyserVoice', labelKey: 'navigation.items.geyserVoice', to: '/ecosystem/geyservoice' },
      { label: 'VoiceCraft.Addon', labelKey: 'navigation.items.voiceCraftAddon', to: '/ecosystem/voicecraft-addon' },
      { label: 'Integration Recipes', labelKey: 'navigation.items.integrationRecipes', to: '/ecosystem/integration-recipes' },
      { label: 'Direct Paper', labelKey: 'navigation.items.directPaper', to: '/ecosystem/geyservoice-direct-paper' },
      { label: 'Proxy', labelKey: 'navigation.items.proxy', to: '/ecosystem/geyservoice-proxy' },
      { label: 'Addon API', labelKey: 'navigation.items.addonApi', to: '/ecosystem/addon-api' },
      { label: 'Production Blueprints', labelKey: 'navigation.items.productionBlueprints', to: '/ecosystem/production-blueprints' },
    ],
  },
  {
    title: 'Architecture',
    titleKey: 'navigation.groups.architecture',
    items: [
      { label: 'System Architecture', labelKey: 'navigation.items.systemArchitecture', to: '/architecture/system-architecture' },
      { label: 'Packet Flow', labelKey: 'navigation.items.packetFlow', to: '/architecture/packet-flow' },
      { label: 'Authentication & Trust', labelKey: 'navigation.items.authenticationTrust', to: '/architecture/authentication-and-trust' },
      { label: 'Positioning Model', labelKey: 'navigation.items.positioningModel', to: '/architecture/positioning-model' },
    ],
  },
  {
    title: 'Reference',
    titleKey: 'navigation.groups.reference',
    items: [
      { label: 'FAQ', labelKey: 'navigation.items.faq', to: '/faq/faq' },
    ],
  },
]

export const topNavigation: TopNavigationItem[] = [
  { label: 'Docs', labelKey: 'navigation.top.docs', to: '/start/overview', versioned: true },
  { label: 'Download', labelKey: 'navigation.top.download', to: '/download', versioned: true },
  { label: 'Telemetry', labelKey: 'navigation.top.telemetry', to: '/telemetry', versioned: true },
  { label: 'Addon Configurator', labelKey: 'navigation.top.addonConfigurator', to: '/addon-configurator' },
]
