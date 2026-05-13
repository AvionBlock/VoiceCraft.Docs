const localeCodes = ['en', 'ru', 'nl', 'de', 'pl', 'zh_cn', 'zh_tw']

export default defineNuxtRouteMiddleware(async (to) => {
  const firstSegment = to.path.split('/').filter(Boolean)[0]
  if (!firstSegment || !localeCodes.includes(firstSegment)) return

  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n as {
    locale?: { value: string }
    setLocaleCookie?: (locale: string) => void
  }
  i18n.locale && (i18n.locale.value = firstSegment)
  i18n.setLocaleCookie?.(firstSegment)

  const localeCookie = useCookie('voicecraft-docs-locale', {
    path: '/',
    sameSite: 'lax',
  })
  localeCookie.value = firstSegment

  const nextPath = to.path.replace(new RegExp(`^/${firstSegment}(?=/|$)`), '') || '/'
  return navigateTo({ path: nextPath, query: to.query, hash: to.hash }, { replace: true, redirectCode: 301 })
})
