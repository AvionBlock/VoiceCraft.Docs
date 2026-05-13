<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => String(t('addonConfigurator.title')),
  description: () => String(t('addonConfigurator.subtitle')),
})
</script>

<template>
  <UContainer class="py-4 py-md-5">
    <VoiceCraftAddonConfigurator />
  </UContainer>
</template>
