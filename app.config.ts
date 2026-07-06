export default defineAppConfig({
  docsVersioning: {
    current: '1.7.x',
    legacy: '1.6.x',
    versions: [
      {
        id: '1.7.x',
        label: '1.7.x',
        current: true,
        extends: '1.6.x',
      },
      {
        id: '1.6.x',
        label: '1.6.x',
        source: 'legacy',
      },
    ],
  },
  seo: {
    title: 'VoiceCraft Docs',
    description: 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
  },
})
