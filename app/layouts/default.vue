<script setup lang="ts">
import { docsNavigation, topNavigation } from '~/utils/docs-navigation'

const { locale, locales, setLocale, t } = useI18n()
const route = useRoute()
const isScrolled = ref(false)
const isLocaleMenuOpen = ref(false)

const localeFlags: Record<string, string> = {
  en: 'flag-en',
  ru: 'flag-ru',
  de: 'flag-de',
  nl: 'flag-nl',
  pl: 'flag-pl',
  zh_cn: 'flag-zh-cn',
  zh_tw: 'flag-zh-tw',
}

const fallbackLocale = {
  code: 'en',
  name: 'English',
  flagClass: 'flag-en',
}

const availableLocales = computed(() => locales.value.map((item) => {
  const source = typeof item === 'string' ? { code: item, name: item } : item
  return {
    ...source,
    flagClass: localeFlags[source.code] || 'flag-en',
  }
}))

const currentLocale = computed(() => (
  availableLocales.value.find(item => item.code === locale.value) || availableLocales.value[0] || fallbackLocale
))

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

const changeLocale = async (code: string) => {
  isLocaleMenuOpen.value = false
  await setLocale(code)
}

const onScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

useHead({
  htmlAttrs: {
    lang: computed(() => String(locale.value).replace('_', '-')),
    'data-bs-theme': 'dark',
  },
})
</script>

<template>
  <div class="vc-app-shell">
    <header class="vc-doc-header" :class="{ 'nav-compact': isScrolled }">
      <NuxtLink to="/" class="vc-doc-brand" aria-label="VoiceCraft Docs">
        <img src="/images/brand/voicecraft-icon.png" alt="" class="vc-doc-brand-icon">
        <span class="vc-doc-brand-mark">
          <span class="brand-primary">Voice</span><span class="brand-accent">Craft</span>
        </span>
        <span class="vc-doc-brand-suffix">Docs</span>
      </NuxtLink>

      <nav class="vc-doc-top-nav" aria-label="Primary">
        <NuxtLink
          v-for="item in topNavigation"
          :key="item.to"
          :to="item.to"
          class="vc-doc-top-link"
          :class="{ 'vc-doc-top-link-active': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="vc-doc-header-actions">
        <AppHeaderCTA />
        <div class="vc-locale-menu">
          <button
            type="button"
            class="vc-locale-toggle"
            :aria-expanded="isLocaleMenuOpen"
            aria-label="Language"
            @click="isLocaleMenuOpen = !isLocaleMenuOpen"
          >
            <span class="flag-icon" :class="currentLocale.flagClass" />
            <span class="vc-locale-current">{{ currentLocale.code.replace('_', '-') }}</span>
          </button>

          <div v-if="isLocaleMenuOpen" class="vc-locale-dropdown">
            <button
              v-for="item in availableLocales"
              :key="item.code"
              type="button"
              class="vc-locale-option"
              :class="{ 'vc-locale-option-active': item.code === locale }"
              @click="changeLocale(item.code)"
            >
              <span class="flag-icon" :class="item.flagClass" />
              <span>{{ item.name || item.code }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="vc-doc-body">
      <aside class="vc-doc-sidebar">
        <nav aria-label="Documentation">
          <section
            v-for="group in docsNavigation"
            :key="group.title"
            class="vc-doc-nav-group"
          >
            <h2>{{ group.title }}</h2>
            <NuxtLink
              v-for="item in group.items"
              :key="item.to"
              :to="item.to"
              class="vc-doc-nav-link"
              :class="{ 'vc-doc-nav-link-active': isActive(item.to) }"
            >
              {{ item.label }}
            </NuxtLink>
          </section>
        </nav>
      </aside>

      <main class="vc-doc-main">
        <slot />
      </main>
    </div>
  </div>
</template>
