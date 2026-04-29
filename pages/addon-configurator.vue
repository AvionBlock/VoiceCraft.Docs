<script setup lang="ts">
import VoiceCraftAddonConfigurator from '~/components/VoiceCraftAddonConfigurator.vue'

const { t } = useI18n()

useSeoMeta({
  title: () => String(t('addonConfigurator.title')),
  description: () => String(t('addonConfigurator.subtitle')),
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <VoiceCraftAddonConfigurator />
  </UContainer>
</template>
