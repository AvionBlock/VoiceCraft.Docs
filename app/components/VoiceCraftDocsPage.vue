<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = withDefaults(defineProps<{
  routePath?: string
  version?: string
}>(), {
  routePath: '/',
})

const route = useRoute()
const { locale, t } = useI18n()
const docsVersioning = useVoiceCraftDocsVersioning()

type ContentPage = Collections['content']

const docsPath = computed(() => normalizeDocsPath(props.routePath))
const requestedVersionId = computed(() => props.version || docsVersioning.currentVersionId.value)
const activeVersion = computed(() => docsVersioning.findVersion(requestedVersionId.value))
const contentPathCandidates = computed(() => docsVersioning.getContentPathCandidates(
  requestedVersionId.value,
  locale.value,
  docsPath.value,
))

const page = shallowRef<ContentPage | null>(null)
let loadId = 0

const resolvePage = async () => {
  for (const path of contentPathCandidates.value) {
    const page = await queryCollection('content').path(path).first()
    if (page) return page
  }

  return null
}

const loadPage = async () => {
  const currentLoadId = ++loadId
  page.value = null
  const nextPage = await resolvePage()
  if (currentLoadId === loadId) {
    page.value = nextPage
  }
}

await loadPage()

watch(contentPathCandidates, () => {
  void loadPage()
})

const title = computed(() => {
  const seo = page.value?.seo as { title?: string } | undefined
  return seo?.title || page.value?.title || t('ui.siteTitle')
})

const description = computed(() => {
  const seo = page.value?.seo as { description?: string } | undefined
  return seo?.description || page.value?.description || t('ui.seoDescription')
})

const ogSection = computed(() => {
  const [section] = docsPath.value.split('/').filter(Boolean)
  const labels: Record<string, string> = {
    architecture: 'Architecture',
    client: 'Client',
    download: String(t('download.kicker')),
    ecosystem: 'Ecosystem',
    faq: 'FAQ',
    minecraft: 'Minecraft',
    operations: 'Operations',
    server: 'Server',
    start: 'Start',
    telemetry: String(t('telemetry.kicker')),
  }

  const sectionLabel = section ? labels[section] || section : String(t('ui.docsVersionLabel'))
  return activeVersion.value?.label ? `${sectionLabel} ${activeVersion.value.label}` : sectionLabel
})

const pageKey = computed(() => `${requestedVersionId.value}:${page.value?.path || 'missing'}`)
const ogPath = computed(() => route.path || docsVersioning.buildDocsPath(docsPath.value, requestedVersionId.value))

useSeoMeta({
  title,
  description,
})

useVoiceCraftOgImage({
  title,
  description,
  section: ogSection,
  path: ogPath,
})
</script>

<template>
  <article v-if="page" :key="pageKey" class="vc-doc-article">
    <ContentRenderer :key="pageKey" :value="page" class="vc-doc-content" />
  </article>
  <section v-else class="vc-doc-missing vc-glass">
    <p class="vc-doc-missing-kicker">404</p>
    <h1>{{ t('ui.notFoundTitle') }}</h1>
    <p>{{ t('ui.notFoundDescription') }}</p>
    <NuxtLink :to="docsVersioning.buildDocsPath('/', requestedVersionId)" class="btn btn-main">
      {{ t('ui.backHome') }}
    </NuxtLink>
  </section>
</template>
