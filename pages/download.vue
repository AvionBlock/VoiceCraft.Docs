<script setup lang="ts">
import VoiceCraftDownloads from '~/components/VoiceCraftDownloads.vue'

const { t } = useI18n()

useSeoMeta({
  title: () => String(t('download.title')),
  description: () => String(t('download.subtitle')),
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <VoiceCraftDownloads />
  </UContainer>
</template>
