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
    description: 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
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
    title: 'On this page',
    bottom: {
      title: 'Useful links',
      links: [
        {
          icon: 'i-simple-icons-github',
          label: 'GitHub',
          to: 'https://github.com/AvionBlock/VoiceCraft',
          target: '_blank',
        },
        {
          icon: 'i-lucide-download',
          label: 'Downloads',
          to: '/en/download',
        },
      ],
    },
  },
  docus: {
    colorMode: 'dark',
  },
})
