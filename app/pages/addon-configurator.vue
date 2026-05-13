<script setup lang="ts">
const { t } = useI18n()
const title = computed(() => String(t('addonConfigurator.title')))
const description = computed(() => String(t('addonConfigurator.subtitle')))
const section = computed(() => String(t('addonConfigurator.kicker')))

useSeoMeta({
  title,
  description,
})

useVoiceCraftOgImage({
  title,
  description,
  section,
  path: '/addon-configurator',
})
</script>

<template>
  <UContainer class="py-4 py-md-5">
    <VoiceCraftAddonConfigurator />
  </UContainer>
</template>
