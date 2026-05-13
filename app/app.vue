<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'dark',
    'data-bs-theme': 'dark',
  },
  bodyAttrs: {
    'data-bs-theme': 'dark',
  },
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
