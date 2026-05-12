const voiceCraftLocales = [
  {
    code: 'en',
    name: 'English',
    file: 'en.json',
  },
  {
    code: 'ru',
    name: 'Русский',
    file: 'ru.json',
  },
  {
    code: 'nl',
    name: 'Nederlands',
    language: 'nl-NL',
    file: 'nl.json',
  },
  {
    code: 'de',
    name: 'Deutsch',
    language: 'de-DE',
    file: 'de.json',
  },
  {
    code: 'pl',
    name: 'Polski',
    language: 'pl-PL',
    file: 'pl.json',
  },
  {
    code: 'zh_cn',
    name: '简体中文',
    language: 'zh-CN',
    file: 'zh_cn.json',
  },
  {
    code: 'zh_tw',
    name: '繁體中文',
    language: 'zh-TW',
    file: 'zh_tw.json',
  },
]

const voiceCraftDocusLocaleModule = (_options: unknown, nuxt: any) => {
  nuxt.hook('modules:done', () => {
    const publicConfig = nuxt.options.runtimeConfig.public as Record<string, unknown>
    const docusConfig = typeof publicConfig.docus === 'object' && publicConfig.docus !== null
      ? publicConfig.docus as Record<string, unknown>
      : {}

    publicConfig.docus = {
      ...docusConfig,
      filteredLocales: voiceCraftLocales,
    }
  })
}

export default defineNuxtConfig({
  extends: ['docus'],
  ssr: true,
  modules: [voiceCraftDocusLocaleModule, '@nuxtjs/i18n', '@nuxtjs/google-fonts'],
  site: {
    name: 'VoiceCraft Docs',
    url: process.env.NUXT_SITE_URL || process.env.SITE_URL || process.env.COOLIFY_URL || 'https://voicecraft.avion.team',
  },
  llms: {
    domain: process.env.NUXT_SITE_URL || process.env.SITE_URL || process.env.COOLIFY_URL || 'https://voicecraft.avion.team',
    title: 'VoiceCraft Docs',
    description: 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
  },
  app: {
    head: {
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'icon', type: 'image/png', href: '/images/brand/voicecraft-icon.png?v=2' },
        { rel: 'apple-touch-icon', href: '/images/brand/voicecraft-icon.png?v=2' },
      ],
    },
  },
  css: ['~/assets/css/theme.scss'],
  googleFonts: {
    families: {
      Comfortaa: [100, 300, 400, 500, 700, 900],
      Nunito: [100, 300, 400, 500, 700, 900],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'voicecraft-docs-locale',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    locales: voiceCraftLocales,
  },
})
