export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/i18n', '@nuxtjs/google-fonts'],
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
    locales: [{
      code: 'en',
      name: 'English',
      file: 'en.json',
    }, {
      code: 'ru',
      name: 'Русский',
      file: 'ru.json',
    }],
  },
})
