const voiceCraftLocales = [
  { code: 'en', name: 'English', file: 'en.json', language: 'en-US' },
  { code: 'ru', name: 'Русский', file: 'ru.json', language: 'ru-RU' },
  { code: 'nl', name: 'Nederlands', file: 'nl.json', language: 'nl-NL' },
  { code: 'de', name: 'Deutsch', file: 'de.json', language: 'de-DE' },
  { code: 'pl', name: 'Polski', file: 'pl.json', language: 'pl-PL' },
  { code: 'zh_cn', name: '简体中文', file: 'zh_cn.json', language: 'zh-CN' },
  { code: 'zh_tw', name: '繁體中文', file: 'zh_tw.json', language: 'zh-TW' },
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@avion-block/usebootstrap',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    'nuxt-og-image',
  ],
  site: {
    url: 'https://voicecraft.avion.team',
    name: 'VoiceCraft Docs',
  },
  app: {
    head: {
      title: 'VoiceCraft Docs',
      titleTemplate: '%s · VoiceCraft Docs',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'icon', type: 'image/png', href: '/images/brand/voicecraft-icon.png?v=2' },
        { rel: 'apple-touch-icon', href: '/images/brand/voicecraft-icon.png?v=2' },
      ],
    },
  },
  css: ['~/assets/styles/main.scss'],
  googleFonts: {
    families: {
      Comfortaa: [300, 400, 500, 600, 700],
      Nunito: [500, 700, 800, 900],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
  },
  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
      extension: 'png',
      cacheMaxAgeSeconds: 60 * 60 * 24 * 14,
    },
    componentDirs: ['OgImage'],
    compatibility: {
      dev: { takumi: 'node-dev' },
      runtime: { takumi: 'node' },
      prerender: { takumi: 'node' },
    },
    security: {
      maxDimension: 1400,
      maxDpr: 2,
      renderTimeout: 12000,
      imageFetchTimeout: 2500,
    },
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
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
  usebootstrap: {
    image: false,
    fonts: false,
    sitemap: false,
    robots: false,
    shiki: true,
    leaflet: false,
    mdc: false,
    tiptap: false,
    pwa: false,
    aos: false,
    echarts: false,
    ogImage: false,
    schemaOrg: false,
  },
})
