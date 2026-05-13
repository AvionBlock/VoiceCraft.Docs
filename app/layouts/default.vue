<script setup lang="ts">
import { docsNavigation } from '~/utils/docs-navigation'

const { locale } = useI18n()
const route = useRoute()
const docsVersioning = useVoiceCraftDocsVersioning()

const widePagePaths = ['/download', '/telemetry', '/addon-configurator']
const logicalRoutePath = computed(() => getDocsPathFromRoute(route.path))
const activeVersionId = computed(() => getDocsVersionFromRoute(route.path) || docsVersioning.currentVersionId.value)
const showDocsSidebar = computed(() => !widePagePaths.includes(logicalRoutePath.value))
const versionedDocsNavigation = computed(() => docsNavigation.map(group => ({
  ...group,
  items: group.items.map(item => ({
    ...item,
    to: docsVersioning.buildDocsPath(item.to, activeVersionId.value),
  })),
})))

const isActive = (path: string) => {
  const logicalPath = getDocsPathFromRoute(path)
  if (logicalPath === '/') return logicalRoutePath.value === '/'
  return logicalRoutePath.value === logicalPath || logicalRoutePath.value.startsWith(`${logicalPath}/`)
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
    <LandingHeader />

    <div class="vc-doc-body" :class="{ 'vc-doc-body-wide': !showDocsSidebar }">
      <aside v-if="showDocsSidebar" class="vc-doc-sidebar">
        <nav aria-label="Documentation">
          <section
            v-for="group in versionedDocsNavigation"
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

    <LandingFooter />
  </div>
</template>
