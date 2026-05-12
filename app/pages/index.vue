<script setup lang="ts">
const { locale, t } = useI18n()

const contentPath = computed(() => `/${locale.value}`)
const fallbackContentPath = '/en'

const { data: page } = await useAsyncData(
  'voicecraft-doc-home',
  async () => {
    const localized = await queryCollection('content').path(contentPath.value).first()
    if (localized) return localized
    return await queryCollection('content').path(fallbackContentPath).first()
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
</template>
