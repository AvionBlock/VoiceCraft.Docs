<script setup lang="ts">
const route = useRoute()
const version = computed(() => String(route.params.version || ''))
</script>

<template>
  <VoiceCraftDocsPage route-path="/" :version="version" />
</template>
