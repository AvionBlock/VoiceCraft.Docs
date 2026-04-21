<script setup lang="ts">
import VoiceCraftTelemetryStats from '~/components/VoiceCraftTelemetryStats.vue'

const { t } = useI18n()

useSeoMeta({
  title: () => String(t('telemetry.title')),
  description: () => String(t('telemetry.subtitle')),
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <VoiceCraftTelemetryStats />
  </UContainer>
</template>
