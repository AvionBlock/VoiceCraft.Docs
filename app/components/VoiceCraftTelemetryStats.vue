<script setup lang="ts">
type TelemetryRole = 'client' | 'server'

const TELEMETRY_API_BASE = 'https://vc-api.avion.team'

const { t } = useI18n()
const activeRole = ref<TelemetryRole>('client')

const roleTabs = computed(() => [
  {
    role: 'client' as const,
    label: t('telemetry.roles.client'),
    description: t('telemetry.roles.clientShort'),
  },
  {
    role: 'server' as const,
    label: t('telemetry.roles.server'),
    description: t('telemetry.roles.serverShort'),
  },
])

</script>

<template>
  <section class="vc-telemetry-wrap">
    <div class="vc-telemetry-hero vc-reveal rounded-4 p-4 p-md-5">
      <div class="vc-telemetry-hero-layout">
        <div class="d-grid gap-4">
          <p class="comf-500-20 text-uppercase vc-page-kicker">
            {{ t('telemetry.kicker') }}
          </p>
          <div class="d-grid gap-3">
            <h1 class="nuni-800-50">
              {{ t('telemetry.title') }}
            </h1>
            <p class="vc-page-subtitle comf-500-20 text-muted">
              {{ t('telemetry.subtitle') }}
            </p>
          </div>
          <div class="d-flex flex-wrap gap-3">
            <UButton
              size="lg"
              class="btn-main comf-500-20"
              :to="TELEMETRY_API_BASE"
              target="_blank"
            >
              {{ t('telemetry.openApi') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="vc-telemetry-role-switch vc-reveal vc-delay-1" role="tablist" :aria-label="t('telemetry.roleSwitchLabel')">
      <button
        v-for="tab in roleTabs"
        :key="tab.role"
        type="button"
        class="vc-telemetry-role-tab"
        :class="{ 'vc-telemetry-role-tab-active': activeRole === tab.role }"
        role="tab"
        :aria-selected="activeRole === tab.role"
        @click="activeRole = tab.role"
      >
        <span class="vc-telemetry-role-tab-title">{{ tab.label }}</span>
        <span class="vc-telemetry-role-tab-desc">{{ tab.description }}</span>
      </button>
    </div>

    <VoiceCraftClientTelemetry v-if="activeRole === 'client'" />
    <VoiceCraftServerTelemetry v-else />
  </section>
</template>
