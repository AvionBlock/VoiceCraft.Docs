export default defineAppConfig({
  docsVersioning: {
    current: '1.6.x',
    legacy: '1.6.x',
    versions: [
      {
        id: '1.6.x',
        label: '1.6.x',
        current: true,
        source: 'legacy',
      },
    ],
  },
  seo: {
    title: 'VoiceCraft Docs',
    description: 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
  },
})
