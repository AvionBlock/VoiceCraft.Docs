import { watch } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig() as Record<string, any>
  const i18n = nuxtApp.$i18n as {
    locale?: { value?: string }
    t?: (key: string) => string
    global?: {
      locale?: { value?: string }
      t?: (key: string) => string
    }
  } | undefined

  const translate = (key: string, fallback: string) => {
    const t = i18n?.t || i18n?.global?.t
    if (!t) return fallback
    const value = t(key)
    if (!value || value === key) return fallback
    return String(value)
  }

  const applyLabels = () => {
    const toc = appConfig.toc as Record<string, any> | undefined

    if (appConfig.header) {
      appConfig.header.title = translate('ui.siteTitle', 'VoiceCraft Documentation')
    }

    if (appConfig.seo) {
      appConfig.seo.title = translate('ui.siteTitle', 'VoiceCraft Documentation')
      appConfig.seo.description = translate(
        'ui.seoDescription',
        'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
      )
    }

    if (toc) {
      toc.title = translate('ui.toc.onThisPage', 'On this page')

      if (toc.bottom) {
        toc.bottom.title = translate('ui.toc.usefulLinks', 'Useful links')

        const links = toc.bottom.links || []
        const releaseLink = links.find(link => link?.icon === 'i-lucide-download')
        if (releaseLink) {
          releaseLink.label = translate('ui.links.latestRelease', 'Latest release')
        }
      }
    }
  }

  const localeRef = i18n?.locale || i18n?.global?.locale
  applyLabels()

  useHead({
    titleTemplate: (titleChunk?: string) => {
      const siteTitle = translate('ui.siteTitle', 'VoiceCraft Documentation')
      return titleChunk ? `${titleChunk} · ${siteTitle}` : siteTitle
    },
  })

  if (localeRef) {
    watch(localeRef, () => applyLabels())
  }
})
