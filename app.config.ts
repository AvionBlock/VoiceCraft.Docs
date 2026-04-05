export default defineAppConfig({
  ui: {
    colors: {
      primary: 'purple',
      neutral: 'zinc',
    },
  },
  header: {
    title: 'VoiceCraft Docs',
    logo: {
      light: '/images/brand/voicecraft-icon.png',
      dark: '/images/brand/voicecraft-icon.png',
      alt: 'VoiceCraft',
      class: '!h-10 md:!h-11 !w-auto rounded-lg',
      display: 'logo',
      favicon: '/favicon.ico?v=2',
    },
  },
  seo: {
    titleTemplate: '%s',
    title: 'VoiceCraft Docs',
    description: 'Установка и настройка VoiceCraft Client/Server для Minecraft Bedrock.',
  },
  socials: {
    github: 'https://github.com/AvionBlock/VoiceCraft',
  },
  github: {
    url: 'https://github.com/AvionBlock/VoiceCraft',
    branch: 'main',
  },
  navigation: {
    sub: 'header',
  },
  toc: {
    title: 'На этой странице',
    bottom: {
      title: 'Полезные ссылки',
      links: [
        {
          icon: 'i-simple-icons-github',
          label: 'GitHub',
          to: 'https://github.com/AvionBlock/VoiceCraft',
          target: '_blank',
        },
        {
          icon: 'i-lucide-download',
          label: 'Последний релиз',
          to: 'https://github.com/AvionBlock/VoiceCraft/releases/latest',
          target: '_blank',
        },
      ],
    },
  },
  docus: {
    colorMode: 'dark',
  },
})
