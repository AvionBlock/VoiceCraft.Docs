<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()

const routePath = computed(() => {
  const param = route.params.slug
  const segments = Array.isArray(param) ? param : param ? [String(param)] : []
  const path = `/${segments.filter(Boolean).join('/')}`
  return path === '/' ? '' : path.replace(/\/+$/, '')
})

const contentPath = computed(() => `/${locale.value}${routePath.value}`)
const fallbackContentPath = computed(() => `/en${routePath.value}`)

const { data: page } = await useAsyncData(
  'voicecraft-doc-page',
  async () => {
    const localized = await queryCollection('content').path(contentPath.value).first()
    if (localized) return localized
    return await queryCollection('content').path(fallbackContentPath.value).first()
  },
  { watch: [contentPath] },
)

const title = computed(() => {
  const seo = page.value?.seo as { title?: string } | undefined
  return seo?.title || page.value?.title || t('ui.siteTitle')
})

const description = computed(() => {
  const seo = page.value?.seo as { description?: string } | undefined
  return seo?.description || page.value?.description || t('ui.seoDescription')
})

useSeoMeta({
  title,
  description,
})
</script>

<template>
  <article v-if="page" class="vc-doc-article">
    <ContentRenderer :value="page" class="vc-doc-content" />
  </article>
  <section v-else class="vc-doc-missing vc-glass">
    <p class="vc-doc-missing-kicker">404</p>
    <h1>{{ t('ui.notFoundTitle') }}</h1>
    <p>{{ t('ui.notFoundDescription') }}</p>
    <NuxtLink to="/" class="btn vc-btn-main">
      {{ t('ui.backHome') }}
    </NuxtLink>
  </section>
</template>
