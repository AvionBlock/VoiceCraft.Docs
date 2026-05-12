<script setup lang="ts">
import { docsNavigation, topNavigation } from '~/utils/docs-navigation'

const { locale, locales, setLocale, t } = useI18n()
const route = useRoute()

const availableLocales = computed(() => locales.value.map(item => (
  typeof item === 'string' ? { code: item, name: item } : item
)))

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

useHead({
  htmlAttrs: {
    lang: computed(() => String(locale.value).replace('_', '-')),
    'data-bs-theme': 'dark',
  },
})
</script>

<template>
  <div class="vc-app-shell">
    <header class="vc-doc-header">
      <NuxtLink to="/" class="vc-doc-brand" aria-label="VoiceCraft Docs">
        <img src="/images/brand/voicecraft-icon.png" alt="" class="vc-doc-brand-icon">
        <span>{{ t('ui.siteTitle') }}</span>
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
        <select
          class="vc-locale-select"
          :value="locale"
          aria-label="Language"
          @change="setLocale(($event.target as HTMLSelectElement).value)"
        >
          <option
            v-for="item in availableLocales"
            :key="item.code"
            :value="item.code"
          >
            {{ item.name || item.code }}
          </option>
        </select>
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
