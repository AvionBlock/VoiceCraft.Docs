export default defineAppConfig({
  docsVersioning: {
    current: '1.6.x',
    versions: [
      {
        id: '1.6.x',
        label: '1.6.x',
        current: true,
        paths: {
          en: '/',
          ru: '/',
          nl: '/',
          de: '/',
          pl: '/',
          zh_cn: '/',
          zh_tw: '/',
        },
      },
    ],
  },
  seo: {
    title: 'VoiceCraft Docs',
    description: 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
  },
})
