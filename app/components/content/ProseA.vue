<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const route = useRoute()
const docsVersioning = useVoiceCraftDocsVersioning()

const assetPrefixes = ['/api/', '/css/', '/fonts/', '/images/', '/_nuxt/', '/__nuxt_content/']
const currentRouteVersion = computed(() => getDocsVersionFromRoute(route.path))

function splitUrlSuffix(value: string) {
  const match = value.match(/^([^?#]*)([?#].*)?$/)
  return {
    path: match?.[1] || value,
    suffix: match?.[2] || '',
  }
}

const resolvedHref = computed(() => {
  const href = props.href || ''
  if (!href || href.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(href)) return href
  if (!href.startsWith('/') || !currentRouteVersion.value) return href

  const { path, suffix } = splitUrlSuffix(href)
  if (getDocsVersionFromRoute(path)) return href
  if (path === '/addon-configurator') return href
  if (assetPrefixes.some(prefix => path.startsWith(prefix))) return href

  return `${docsVersioning.buildDocsPath(path, currentRouteVersion.value)}${suffix}`
})

const isInternal = computed(() => resolvedHref.value.startsWith('/'))
</script>

<template>
  <NuxtLink v-if="isInternal" :to="resolvedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
  <a v-else :href="resolvedHref" :target="target" v-bind="$attrs">
    <slot />
  </a>
</template>
