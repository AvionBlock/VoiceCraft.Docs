<script setup lang="ts">
import type { TelemetryRole } from '~/utils/voicecraft-telemetry-api'

const props = defineProps<{
  role: TelemetryRole
}>()

const {
  t,
  status,
  error,
  refresh,
  dashboard,
  roleTitle,
  roleDescription,
  overviewCards,
  donutCharts,
  listCharts,
  hasAnyData,
  formatNumber,
  formatPercent,
  normalizeLabel,
  normalizeMetricValue,
  maxCount,
  filledDots,
} = await useVoiceCraftTelemetryDashboard(props.role)
</script>

<template>
  <div class="vc-telemetry-dashboard">
    <div class="vc-telemetry-role-heading vc-reveal vc-delay-1">
      <div>
        <p class="vc-telemetry-role-kicker">
          {{ t('telemetry.roleSwitchLabel') }}
        </p>
        <h2 class="nuni-800-40">
          {{ roleTitle }}
        </h2>
        <p class="mt-2 vc-telemetry-role-desc comf-500-20 text-muted">
          {{ roleDescription }}
        </p>
      </div>

      <UButton
        size="lg"
        color="neutral"
        variant="outline"
        class="btn-outline comf-500-20"
        @click="() => refresh()"
      >
        {{ t('telemetry.refresh') }}
      </UButton>
    </div>

    <div class="vc-telemetry-grid vc-reveal vc-delay-1">
      <article
        v-for="card in overviewCards"
        :key="card.label"
        class="vc-glass vc-telemetry-stat-card rounded-4 p-4"
        :data-accent="card.accent"
      >
        <p class="vc-telemetry-mini-label">
          {{ card.label }}
        </p>
        <p class="mt-3 vc-telemetry-stat-value">
          {{ card.value }}
        </p>
      </article>
    </div>

    <div v-if="status === 'pending'" class="vc-glass vc-reveal rounded-4 p-4 p-md-5">
      <div class="vc-telemetry-loading">
        <span class="vc-telemetry-spinner" />
        <div>
          <h2 class="nuni-800-40">
            {{ t('telemetry.loadingTitle') }}
          </h2>
          <p class="mt-2 comf-500-20 text-muted">
            {{ t('telemetry.loadingSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="!hasAnyData" class="vc-glass vc-reveal rounded-4 p-4 p-md-5">
      <div class="vc-telemetry-empty">
        <div class="vc-telemetry-empty-orb" />
        <div class="d-grid gap-3">
          <h2 class="nuni-800-40">
            {{ t('telemetry.emptyTitle') }}
          </h2>
          <p class="comf-500-20 text-muted">
            {{ t('telemetry.emptySubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="vc-telemetry-donut-grid">
        <article
          v-for="chart in donutCharts"
          :key="chart.title"
          class="vc-glass vc-reveal vc-telemetry-pie-card rounded-4 p-4"
        >
          <div class="d-grid gap-2">
            <h2 class="vc-telemetry-pie-title">
              {{ chart.title }}
            </h2>
            <p class="vc-telemetry-pie-subtitle text-muted">
              {{ chart.subtitle }}
            </p>
          </div>

          <div v-if="chart.items.length" class="mt-4 d-grid gap-3">
            <div
              v-for="item in chart.items"
              :key="`${chart.title}-${item.label}`"
              class="vc-telemetry-legend-row"
            >
              <div class="vc-telemetry-legend-main">
                <span class="vc-telemetry-swatch" :style="{ background: item.color }" />
                <span class="vc-telemetry-legend-label">{{ item.label }}</span>
              </div>
              <div class="vc-telemetry-legend-meta">
                <div class="vc-telemetry-row-value">{{ formatPercent(item.percent) }}%</div>
                <div class="vc-telemetry-row-subtle">{{ formatNumber(item.count) }}</div>
              </div>
            </div>
            <div class="vc-telemetry-bar-track d-flex">
              <div
                v-for="item in chart.items"
                :key="`${chart.title}-${item.label}-bar`"
                class="vc-telemetry-bar-fill"
                :style="{ width: `${item.percent}%`, background: item.color }"
              />
            </div>
          </div>

          <div v-else class="vc-telemetry-chart-empty">
            {{ t('telemetry.noChartData') }}
          </div>
        </article>
      </div>

      <div class="vc-telemetry-list-grid">
        <article
          v-for="(chart, chartIndex) in listCharts"
          :key="chart.title"
          class="vc-glass vc-reveal rounded-4 p-4"
        >
          <div class="d-grid gap-2">
            <h2 class="nuni-800-40">
              {{ chart.title }}
            </h2>
            <p class="comf-500-20 text-muted">
              {{ chart.subtitle }}
            </p>
          </div>

          <div v-if="chart.items.length" class="mt-4 d-grid gap-3">
            <div
              v-for="item in chart.items"
              :key="`${chart.title}-${String(item.key)}`"
              class="vc-telemetry-rank-row"
            >
              <div class="d-flex align-items-start justify-content-between gap-4">
                <span class="vc-telemetry-rank-label">
                  {{ chart.valueType === 'metric' ? normalizeMetricValue(item.key) : normalizeLabel(item.key) }}
                </span>
                <div class="flex-shrink-0 text-end">
                  <div class="vc-telemetry-row-value">{{ formatNumber(item.count) }}</div>
                  <div class="vc-telemetry-row-subtle">
                    {{ formatPercent((item.count / maxCount(chart.items)) * 100) }} {{ t('telemetry.ofTop') }}
                  </div>
                </div>
              </div>
              <div class="vc-telemetry-dot-track" :style="{ '--vc-dot-hue': String((chartIndex * 29) % 360) }">
                <span
                  v-for="dotIndex in 12"
                  :key="dotIndex"
                  class="vc-telemetry-dot-cell"
                  :class="{ 'vc-telemetry-dot-cell-active': dotIndex <= filledDots(item.count, maxCount(chart.items)) }"
                />
              </div>
            </div>
          </div>

          <div v-else class="vc-telemetry-chart-empty mt-6">
            {{ t('telemetry.noChartData') }}
          </div>
        </article>
      </div>
    </template>

    <div v-if="error || dashboard.partial" class="vc-telemetry-note">
      {{ t('telemetry.partialData') }}
    </div>
  </div>
</template>
