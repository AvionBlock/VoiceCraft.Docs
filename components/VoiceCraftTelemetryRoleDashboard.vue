<script setup lang="ts">
type TelemetryRole = 'client' | 'server'

type BreakdownItem = {
  key: string | number | null
  count: number
}

type StatsSnapshot = {
  totalTelemetryEvents: number
  totalDumps: number
  uniqueFingerprints: number
  lastEventAt: string | null
  breakdowns: {
    appVersions: BreakdownItem[]
    uniqueFingerprintsByOs: BreakdownItem[]
  }
}

type BreakdownSnapshot = {
  field: string
  items: BreakdownItem[]
}

type MetricValuesSnapshot = {
  key: string
  items: BreakdownItem[]
}

type DashboardSnapshot = {
  stats: StatsSnapshot
  appVersions: BreakdownSnapshot
  appChannels: BreakdownSnapshot
  osVersions: BreakdownSnapshot
  architectures: BreakdownSnapshot
  processArchitectures: BreakdownSnapshot
  runtimes: BreakdownSnapshot
  locales: BreakdownSnapshot
  tags: BreakdownSnapshot
  dumpCategories: BreakdownSnapshot
  vendors: BreakdownSnapshot
  models: BreakdownSnapshot
  serverPlatforms: BreakdownSnapshot
  serverArchitectures: BreakdownSnapshot
  serverLocales: BreakdownSnapshot
  serverConnectedClients: BreakdownSnapshot
  serverMaxClients: BreakdownSnapshot
  positioningTypes: MetricValuesSnapshot
  pushToTalk: MetricValuesSnapshot
  mcHttp: MetricValuesSnapshot
  mcTcp: MetricValuesSnapshot
  mcWss: MetricValuesSnapshot
  partial: boolean
}

type ChartSlice = {
  label: string
  count: number
  percent: number
  color: string
}

type DonutChart = {
  title: string
  subtitle: string
  items: ChartSlice[]
}

type ListChart = {
  title: string
  subtitle: string
  items: BreakdownItem[]
  valueType?: 'label' | 'metric'
  required?: boolean
  allowSingleKnown?: boolean
}

const props = defineProps<{
  role: TelemetryRole
}>()

const TELEMETRY_API_BASE = 'https://vc-api.avion.team'
const palette = ['#ca89ff', '#5fffe0', '#facc15', '#38bdf8', '#fb7185', '#34d399', '#a78bfa', '#f97316']

const emptyStats = (): StatsSnapshot => ({
  totalTelemetryEvents: 0,
  totalDumps: 0,
  uniqueFingerprints: 0,
  lastEventAt: null,
  breakdowns: {
    appVersions: [],
    uniqueFingerprintsByOs: [],
  },
})

const emptyBreakdown = (field: string): BreakdownSnapshot => ({ field, items: [] })
const emptyMetric = (key: string): MetricValuesSnapshot => ({ key, items: [] })

const emptyDashboard = (): DashboardSnapshot => ({
  stats: emptyStats(),
  appVersions: emptyBreakdown('app.version'),
  appChannels: emptyBreakdown('app.channel'),
  osVersions: emptyBreakdown('device.osVersion'),
  architectures: emptyBreakdown('device.architecture'),
  processArchitectures: emptyBreakdown('device.processArchitecture'),
  runtimes: emptyBreakdown('device.runtime'),
  locales: emptyBreakdown('device.locale'),
  tags: emptyBreakdown('tags'),
  dumpCategories: emptyBreakdown('dump.category'),
  vendors: emptyBreakdown('device.vendor'),
  models: emptyBreakdown('device.model'),
  serverPlatforms: emptyBreakdown('server.platform'),
  serverArchitectures: emptyBreakdown('server.architecture'),
  serverLocales: emptyBreakdown('server.locale'),
  serverConnectedClients: emptyBreakdown('server.connectedClients'),
  serverMaxClients: emptyBreakdown('server.maxClients'),
  positioningTypes: emptyMetric('positioning_type'),
  pushToTalk: emptyMetric('push_to_talk_enabled'),
  mcHttp: emptyMetric('mc_http_enabled'),
  mcTcp: emptyMetric('mc_tcp_enabled'),
  mcWss: emptyMetric('mc_wss_enabled'),
  partial: false,
})

const { t, locale } = useI18n()

function roleQuery() {
  return `role=${encodeURIComponent(props.role)}`
}

async function safeFetch<T>(path: string, fallback: T, failures: string[]) {
  try {
    return await $fetch<T>(`${TELEMETRY_API_BASE}${path}`)
  } catch {
    failures.push(path)
    return fallback
  }
}

const { data, status, error, refresh } = await useAsyncData<DashboardSnapshot>(
  `voicecraft-telemetry-${props.role}`,
  async () => {
    const failures: string[] = []
    const breakdown = (field: string) => safeFetch<BreakdownSnapshot>(
      `/v1/public/breakdown?field=${encodeURIComponent(field)}&limit=8&${roleQuery()}`,
      emptyBreakdown(field),
      failures,
    )
    const metric = (key: string) => safeFetch<MetricValuesSnapshot>(
      `/v1/public/metric-values?key=${encodeURIComponent(key)}&limit=8&${roleQuery()}`,
      emptyMetric(key),
      failures,
    )

    const [
      stats,
      appVersions,
      appChannels,
      osVersions,
      architectures,
      processArchitectures,
      runtimes,
      locales,
      tags,
      dumpCategories,
      vendors,
      models,
      serverPlatforms,
      serverArchitectures,
      serverLocales,
      serverConnectedClients,
      serverMaxClients,
      positioningTypes,
      pushToTalk,
      mcHttp,
      mcTcp,
      mcWss,
    ] = await Promise.all([
      safeFetch<StatsSnapshot>(`/v1/public/stats?${roleQuery()}`, emptyStats(), failures),
      breakdown('app.version'),
      breakdown('app.channel'),
      breakdown('device.osVersion'),
      breakdown('device.architecture'),
      breakdown('device.processArchitecture'),
      breakdown('device.runtime'),
      breakdown('device.locale'),
      breakdown('tags'),
      breakdown('dump.category'),
      breakdown('device.vendor'),
      breakdown('device.model'),
      breakdown('server.platform'),
      breakdown('server.architecture'),
      breakdown('server.locale'),
      breakdown('server.connectedClients'),
      breakdown('server.maxClients'),
      metric('positioning_type'),
      metric('push_to_talk_enabled'),
      metric('mc_http_enabled'),
      metric('mc_tcp_enabled'),
      metric('mc_wss_enabled'),
    ])

    return {
      stats,
      appVersions,
      appChannels,
      osVersions,
      architectures,
      processArchitectures,
      runtimes,
      locales,
      tags,
      dumpCategories,
      vendors,
      models,
      serverPlatforms,
      serverArchitectures,
      serverLocales,
      serverConnectedClients,
      serverMaxClients,
      positioningTypes,
      pushToTalk,
      mcHttp,
      mcTcp,
      mcWss,
      partial: failures.length > 0,
    }
  },
  {
    server: false,
    lazy: true,
    default: emptyDashboard,
  },
)

const dashboard = computed(() => data.value ?? emptyDashboard())

function currentLocale() {
  return locale.value === 'ru' ? 'ru-RU' : 'en-US'
}

function formatNumber(value: number) {
  return new Intl.NumberFormat(currentLocale()).format(value)
}

function formatPercent(value: number) {
  return new Intl.NumberFormat(currentLocale(), {
    maximumFractionDigits: value >= 10 ? 0 : 1,
  }).format(value)
}

function formatDateTime(value: string | null) {
  if (!value) return t('telemetry.neverUpdated')
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return t('telemetry.neverUpdated')
  return new Intl.DateTimeFormat(currentLocale(), {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function normalizeLabel(value: string | number | null) {
  if (value === null || value === undefined || value === '') return t('telemetry.unknown')
  return String(value)
}

function normalizeMetricValue(value: string | number | null) {
  const normalized = normalizeLabel(value)
  const lower = normalized.toLowerCase()
  if (lower === 'true') return t('telemetry.enabled')
  if (lower === 'false') return t('telemetry.disabled')
  return normalized
}

function toChartSlices(items: BreakdownItem[], limit = 5): ChartSlice[] {
  const filtered = items.filter(item => item.count > 0)
  const trimmed = filtered.slice(0, limit)
  const remainder = filtered.slice(limit).reduce((sum, item) => sum + item.count, 0)
  const combined = remainder > 0 ? [...trimmed, { key: 'other', count: remainder }] : trimmed
  const total = combined.reduce((sum, item) => sum + item.count, 0)
  if (!total) return []

  return combined.map((item, index) => ({
    label: item.key === 'other' ? t('telemetry.other') : normalizeLabel(item.key),
    count: item.count,
    percent: (item.count / total) * 100,
    color: palette[index % palette.length],
  }))
}

function maxCount(items: BreakdownItem[]) {
  return items.reduce((max, item) => Math.max(max, item.count), 0)
}

function barWidth(count: number, max: number) {
  if (!max) return '0%'
  return `${Math.max((count / max) * 100, 5)}%`
}

function filledDots(count: number, max: number, total = 12) {
  if (!max || total <= 0) return 0
  return Math.max(1, Math.round((count / max) * total))
}

function isOnlyUnknown(items: BreakdownItem[]) {
  return items.length > 0 && items.every(item => normalizeLabel(item.key) === t('telemetry.unknown'))
}

function isUsefulChart(chart: ListChart) {
  if (chart.required) return true
  if (!chart.items.length) return false
  if (isOnlyUnknown(chart.items)) return false
  return chart.allowSingleKnown || chart.items.length > 1
}

const roleTitle = computed(() => (
  props.role === 'client' ? t('telemetry.roles.client') : t('telemetry.roles.server')
))

const roleDescription = computed(() => (
  props.role === 'client' ? t('telemetry.roles.clientDescription') : t('telemetry.roles.serverDescription')
))

const overviewCards = computed(() => [
  { label: t('telemetry.cards.events'), value: formatNumber(dashboard.value.stats.totalTelemetryEvents), accent: 'violet' },
  { label: t('telemetry.cards.instances'), value: formatNumber(dashboard.value.stats.uniqueFingerprints), accent: 'cyan' },
  { label: t('telemetry.cards.dumps'), value: formatNumber(dashboard.value.stats.totalDumps), accent: 'amber' },
  { label: t('telemetry.cards.lastEvent'), value: formatDateTime(dashboard.value.stats.lastEventAt), accent: 'emerald' },
])

const donutCharts = computed<DonutChart[]>(() => [
  {
    title: t('telemetry.charts.uniqueOsShare'),
    subtitle: t('telemetry.charts.uniqueOsShareSubtitle'),
    items: toChartSlices(dashboard.value.stats.breakdowns.uniqueFingerprintsByOs),
  },
  {
    title: t('telemetry.charts.versionShare'),
    subtitle: t('telemetry.charts.versionShareSubtitle'),
    items: toChartSlices(dashboard.value.appVersions.items),
  },
  {
    title: t('telemetry.charts.positioningTypes'),
    subtitle: t('telemetry.charts.positioningTypesSubtitle'),
    items: toChartSlices(dashboard.value.positioningTypes.items),
  },
])

const commonListCharts = computed<ListChart[]>(() => [
  { title: t('telemetry.charts.osVersionShare'), subtitle: t('telemetry.charts.osVersionShareSubtitle'), items: dashboard.value.osVersions.items, required: true, allowSingleKnown: true },
  { title: t('telemetry.charts.channelShare'), subtitle: t('telemetry.charts.channelShareSubtitle'), items: dashboard.value.appChannels.items, allowSingleKnown: true },
  { title: t('telemetry.charts.architectureShare'), subtitle: t('telemetry.charts.architectureShareSubtitle'), items: dashboard.value.architectures.items, allowSingleKnown: true },
  { title: t('telemetry.charts.localeShare'), subtitle: t('telemetry.charts.localeShareSubtitle'), items: dashboard.value.locales.items, allowSingleKnown: true },
  { title: t('telemetry.charts.dumpCategoryShare'), subtitle: t('telemetry.charts.dumpCategoryShareSubtitle'), items: dashboard.value.dumpCategories.items, allowSingleKnown: true },
])

const clientListCharts = computed<ListChart[]>(() => [
  { title: t('telemetry.charts.processArchitectureShare'), subtitle: t('telemetry.charts.processArchitectureShareSubtitle'), items: dashboard.value.processArchitectures.items, allowSingleKnown: true },
  { title: t('telemetry.charts.vendorShare'), subtitle: t('telemetry.charts.vendorShareSubtitle'), items: dashboard.value.vendors.items, allowSingleKnown: true },
  { title: t('telemetry.charts.modelShare'), subtitle: t('telemetry.charts.modelShareSubtitle'), items: dashboard.value.models.items, allowSingleKnown: true },
  { title: t('telemetry.charts.pushToTalk'), subtitle: t('telemetry.charts.pushToTalkSubtitle'), items: dashboard.value.pushToTalk.items, valueType: 'metric', allowSingleKnown: true },
])

const serverListCharts = computed<ListChart[]>(() => [
  { title: t('telemetry.charts.serverPlatformShare'), subtitle: t('telemetry.charts.serverPlatformShareSubtitle'), items: dashboard.value.serverPlatforms.items, allowSingleKnown: true },
  { title: t('telemetry.charts.serverArchitectureShare'), subtitle: t('telemetry.charts.serverArchitectureShareSubtitle'), items: dashboard.value.serverArchitectures.items, allowSingleKnown: true },
  { title: t('telemetry.charts.serverLocaleShare'), subtitle: t('telemetry.charts.serverLocaleShareSubtitle'), items: dashboard.value.serverLocales.items, allowSingleKnown: true },
  { title: t('telemetry.charts.serverConnectedClients'), subtitle: t('telemetry.charts.serverConnectedClientsSubtitle'), items: dashboard.value.serverConnectedClients.items, allowSingleKnown: true },
  { title: t('telemetry.charts.serverMaxClients'), subtitle: t('telemetry.charts.serverMaxClientsSubtitle'), items: dashboard.value.serverMaxClients.items, allowSingleKnown: true },
  { title: t('telemetry.charts.transportHttp'), subtitle: t('telemetry.charts.transportHttpSubtitle'), items: dashboard.value.mcHttp.items, valueType: 'metric', allowSingleKnown: true },
  { title: t('telemetry.charts.transportTcp'), subtitle: t('telemetry.charts.transportTcpSubtitle'), items: dashboard.value.mcTcp.items, valueType: 'metric', allowSingleKnown: true },
  { title: t('telemetry.charts.transportWss'), subtitle: t('telemetry.charts.transportWssSubtitle'), items: dashboard.value.mcWss.items, valueType: 'metric', allowSingleKnown: true },
])

const listCharts = computed(() => [
  ...commonListCharts.value,
  ...(props.role === 'client' ? clientListCharts.value : serverListCharts.value),
].filter(isUsefulChart))

const hasAnyData = computed(() => {
  const stats = dashboard.value.stats
  return stats.totalTelemetryEvents > 0
    || stats.totalDumps > 0
    || stats.uniqueFingerprints > 0
    || donutCharts.value.some(chart => chart.items.length)
    || listCharts.value.some(chart => chart.items.length)
})
</script>

<template>
  <div class="space-y-8 md:space-y-10">
    <div class="vc-telemetry-role-heading vc-reveal vc-delay-1">
      <div>
        <p class="vc-telemetry-role-kicker">
          {{ t('telemetry.roleSwitchLabel') }}
        </p>
        <h2 class="nuni-800-40">
          {{ roleTitle }}
        </h2>
        <p class="mt-2 max-w-4xl comf-500-20 text-muted">
          {{ roleDescription }}
        </p>
      </div>

      <UButton
        size="lg"
        color="neutral"
        variant="outline"
        class="vc-btn-outline comf-500-20"
        @click="refresh"
      >
        {{ t('telemetry.refresh') }}
      </UButton>
    </div>

    <div class="vc-telemetry-grid vc-reveal vc-delay-1">
      <article
        v-for="card in overviewCards"
        :key="card.label"
        class="vc-glass vc-telemetry-stat-card rounded-2xl p-5 md:p-6"
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

    <div v-if="status === 'pending'" class="vc-glass vc-reveal rounded-3xl p-7 md:p-9">
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

    <div v-else-if="!hasAnyData" class="vc-glass vc-reveal rounded-3xl p-7 md:p-9">
      <div class="vc-telemetry-empty">
        <div class="vc-telemetry-empty-orb" />
        <div class="space-y-3">
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
      <div class="grid gap-6 xl:grid-cols-3">
        <article
          v-for="chart in donutCharts"
          :key="chart.title"
          class="vc-glass vc-reveal vc-telemetry-pie-card rounded-3xl p-5 md:p-6"
        >
          <div class="space-y-2">
            <h2 class="vc-telemetry-pie-title">
              {{ chart.title }}
            </h2>
            <p class="vc-telemetry-pie-subtitle text-muted">
              {{ chart.subtitle }}
            </p>
          </div>

          <div v-if="chart.items.length" class="mt-6 space-y-4">
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
            <div class="vc-telemetry-bar-track flex">
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

      <div class="grid gap-6 xl:grid-cols-2">
        <article
          v-for="(chart, chartIndex) in listCharts"
          :key="chart.title"
          class="vc-glass vc-reveal rounded-3xl p-5 md:p-6"
        >
          <div class="space-y-2">
            <h2 class="nuni-800-40">
              {{ chart.title }}
            </h2>
            <p class="comf-500-20 text-muted">
              {{ chart.subtitle }}
            </p>
          </div>

          <div v-if="chart.items.length" class="mt-6 space-y-4">
            <div
              v-for="item in chart.items"
              :key="`${chart.title}-${String(item.key)}`"
              class="vc-telemetry-rank-row"
            >
              <div class="flex items-start justify-between gap-4">
                <span class="vc-telemetry-rank-label">
                  {{ chart.valueType === 'metric' ? normalizeMetricValue(item.key) : normalizeLabel(item.key) }}
                </span>
                <div class="shrink-0 text-right">
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
