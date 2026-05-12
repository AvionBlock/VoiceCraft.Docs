export type DocsNavigationGroup = {
  title: string
  items: {
    label: string
    to: string
  }[]
}

export const docsNavigation: DocsNavigationGroup[] = [
  {
    title: 'Start',
    items: [
      { label: 'Overview', to: '/start/overview' },
      { label: 'Quick Start', to: '/start/quick-start' },
    ],
  },
  {
    title: 'Client',
    items: [
      { label: 'Installation', to: '/client/installation' },
      { label: 'Settings', to: '/client/settings' },
      { label: 'Settings.json', to: '/client/settings-json' },
    ],
  },
  {
    title: 'Server',
    items: [
      { label: 'Installation', to: '/server/installation' },
      { label: 'First Run', to: '/server/first-run' },
      { label: 'ServerProperties.json', to: '/server/server-properties' },
      { label: 'Commands', to: '/server/commands' },
      { label: 'Runtime Overrides', to: '/server/runtime-overrides' },
      { label: 'Transports', to: '/server/transports' },
    ],
  },
  {
    title: 'Minecraft',
    items: [
      { label: 'McHttp for BDS', to: '/minecraft/mchttp-bds' },
      { label: 'McWss Singleplayer', to: '/minecraft/mcwss-singleplayer' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Update & Backup', to: '/operations/update-backup' },
      { label: 'Troubleshooting', to: '/operations/troubleshooting' },
      { label: 'Security Hardening', to: '/operations/security-hardening' },
      { label: 'Hosting Caveats', to: '/operations/hosting-caveats' },
      { label: 'Backup & Restore', to: '/operations/backup-restore-runbook' },
      { label: 'Upgrade Runbook', to: '/operations/upgrade-runbook' },
      { label: 'Troubleshooting Matrix', to: '/operations/troubleshooting-matrix' },
    ],
  },
  {
    title: 'Ecosystem',
    items: [
      { label: 'Overview', to: '/ecosystem/overview' },
      { label: 'VoiceCraft Repository', to: '/ecosystem/voicecraft-repository' },
      { label: 'GeyserVoice', to: '/ecosystem/geyservoice' },
      { label: 'VoiceCraft.Addon', to: '/ecosystem/voicecraft-addon' },
      { label: 'Integration Recipes', to: '/ecosystem/integration-recipes' },
      { label: 'Direct Paper', to: '/ecosystem/geyservoice-direct-paper' },
      { label: 'Proxy', to: '/ecosystem/geyservoice-proxy' },
      { label: 'Addon API', to: '/ecosystem/addon-api' },
      { label: 'Production Blueprints', to: '/ecosystem/production-blueprints' },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { label: 'System Architecture', to: '/architecture/system-architecture' },
      { label: 'Packet Flow', to: '/architecture/packet-flow' },
      { label: 'Authentication & Trust', to: '/architecture/authentication-and-trust' },
      { label: 'Positioning Model', to: '/architecture/positioning-model' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'FAQ', to: '/faq/faq' },
    ],
  },
]

export const topNavigation = [
  { label: 'Docs', to: '/start/overview' },
  { label: 'Download', to: '/download' },
  { label: 'Telemetry', to: '/telemetry' },
  { label: 'Addon Configurator', to: '/addon-configurator' },
]
