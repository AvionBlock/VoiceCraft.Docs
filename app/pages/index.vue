<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale, t } = useI18n()

type ContentPage = Collections['content']

const contentPath = computed(() => `/${locale.value}`)
const fallbackContentPath = '/en'

const page = shallowRef<ContentPage | null>(null)
let loadId = 0

const resolveHomePage = async () => {
  const localized = await queryCollection('content').path(contentPath.value).first()
  if (localized) return localized
  return await queryCollection('content').path(fallbackContentPath).first()
}

const loadHomePage = async () => {
  const currentLoadId = ++loadId
  page.value = null
  const nextPage = await resolveHomePage()
  if (currentLoadId === loadId) {
    page.value = nextPage
  }
}

await loadHomePage()

watch(contentPath, () => {
  void loadHomePage()
})

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

useVoiceCraftOgImage({
  title,
  description,
  section: computed(() => String(t('ui.docsVersionLabel'))),
  path: '/',
})
</script>

<template>
  <article v-if="page" :key="page.path" class="vc-doc-article">
    <ContentRenderer :key="page.path" :value="page" class="vc-doc-content" />
  </article>
</template>
