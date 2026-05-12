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

const apiLinks = computed(() => [
  {
    label: '/v1/public/stats?role=client',
    to: `${TELEMETRY_API_BASE}/v1/public/stats?role=client`,
  },
  {
    label: '/v1/public/stats?role=server',
    to: `${TELEMETRY_API_BASE}/v1/public/stats?role=server`,
  },
  {
    label: '/v1/public/breakdown',
    to: `${TELEMETRY_API_BASE}/v1/public/breakdown?field=device.osName&limit=20&role=client`,
  },
  {
    label: '/v1/public/metric-values',
    to: `${TELEMETRY_API_BASE}/v1/public/metric-values?key=positioning_type&limit=20&role=server`,
  },
])
</script>

<template>
  <section class="vc-telemetry-wrap space-y-8 md:space-y-10">
    <div class="vc-telemetry-hero vc-reveal rounded-3xl p-6 md:p-10">
      <div class="grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
        <div class="space-y-5">
          <p class="comf-500-20 uppercase tracking-wider text-cyan-300/90">
            {{ t('telemetry.kicker') }}
          </p>
          <div class="space-y-4">
            <h1 class="nuni-800-50 tracking-tight md:nuni-800-60">
              {{ t('telemetry.title') }}
            </h1>
            <p class="max-w-3xl comf-500-20 text-muted">
              {{ t('telemetry.subtitle') }}
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <UButton
              size="lg"
              class="vc-btn-main comf-500-20"
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
