<script setup lang="ts">
const route = useRoute()

const version = computed(() => String(route.params.version || ''))
const routePath = computed(() => {
  const param = route.params.slug
  const segments = Array.isArray(param) ? param : param ? [String(param)] : []
  return normalizeDocsPath(segments.join('/'))
})
</script>

<template>
  <VoiceCraftDocsPage :route-path="routePath" :version="version" />
</template>
