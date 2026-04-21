<script setup lang="ts">
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
    roles: BreakdownItem[]
    appNames: BreakdownItem[]
    appVersions: BreakdownItem[]
    appChannels: BreakdownItem[]
    osNames: BreakdownItem[]
    osVersions: BreakdownItem[]
    osBuilds: BreakdownItem[]
    osDescriptions: BreakdownItem[]
    architectures: BreakdownItem[]
    processArchitectures: BreakdownItem[]
    runtimes: BreakdownItem[]
    vendors: BreakdownItem[]
    locales: BreakdownItem[]
    serverPlatforms: BreakdownItem[]
    serverArchitectures: BreakdownItem[]
    serverLocales: BreakdownItem[]
    serverConnectedClients: BreakdownItem[]
    serverMaxClients: BreakdownItem[]
    tags: BreakdownItem[]
    dumpCategories: BreakdownItem[]
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
  modelBreakdown: BreakdownSnapshot
  serverConnectedBreakdown: BreakdownSnapshot
  serverCapacityBreakdown: BreakdownSnapshot
  serverLocalesBreakdown: BreakdownSnapshot
  serverArchitecturesBreakdown: BreakdownSnapshot
  positioningTypeBreakdown: MetricValuesSnapshot
  pushToTalkBreakdown: MetricValuesSnapshot
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

type PieSliceGeometry = ChartSlice & {
  key: string
  path: string
  linePath: string
  labelX: number
  labelY: number
  labelAnchor: 'start' | 'end'
  fullCircle: boolean
}

const TELEMETRY_API_BASE = 'https://vc-api.avion.team'
const donutPalette = ['#ca89ff', '#5fffe0', '#facc15', '#38bdf8', '#fb7185', '#34d399', '#a78bfa', '#f97316']

const emptyStats = (): StatsSnapshot => ({
  totalTelemetryEvents: 0,
  totalDumps: 0,
  uniqueFingerprints: 0,
  lastEventAt: null,
  breakdowns: {
    roles: [],
    appNames: [],
    appVersions: [],
    appChannels: [],
    osNames: [],
    osVersions: [],
    osBuilds: [],
    osDescriptions: [],
    architectures: [],
    processArchitectures: [],
    runtimes: [],
    vendors: [],
    locales: [],
    serverPlatforms: [],
    serverArchitectures: [],
    serverLocales: [],
    serverConnectedClients: [],
    serverMaxClients: [],
    tags: [],
    dumpCategories: [],
    uniqueFingerprintsByOs: [],
  },
})

const emptyDashboard = (): DashboardSnapshot => ({
  stats: emptyStats(),
  modelBreakdown: {
    field: 'device.model',
    items: [],
  },
  serverConnectedBreakdown: {
    field: 'server.connectedClients',
    items: [],
  },
  serverCapacityBreakdown: {
    field: 'server.maxClients',
    items: [],
  },
  serverLocalesBreakdown: {
    field: 'server.locale',
    items: [],
  },
  serverArchitecturesBreakdown: {
    field: 'server.architecture',
    items: [],
  },
  positioningTypeBreakdown: {
    key: 'positioning_type',
    items: [],
  },
  pushToTalkBreakdown: {
    key: 'push_to_talk_enabled',
    items: [],
  },
})

const { t, locale } = useI18n()

async function safeFetch<T>(path: string, fallback: T) {
  try {
    return await $fetch<T>(`${TELEMETRY_API_BASE}${path}`)
  } catch {
    return fallback
  }
}

const { data, status, error, refresh } = await useAsyncData<DashboardSnapshot>(
  'voicecraft-telemetry-dashboard',
  async () => {
    const [
      stats,
      modelBreakdown,
      serverConnectedBreakdown,
      serverCapacityBreakdown,
      serverLocalesBreakdown,
      serverArchitecturesBreakdown,
      positioningTypeBreakdown,
      pushToTalkBreakdown,
    ] = await Promise.all([
      safeFetch<StatsSnapshot>('/v1/public/stats', emptyStats()),
      safeFetch<BreakdownSnapshot>('/v1/public/breakdown?field=device.model&limit=8', { field: 'device.model', items: [] }),
      safeFetch<BreakdownSnapshot>('/v1/public/breakdown?field=server.connectedClients&limit=8&role=server', { field: 'server.connectedClients', items: [] }),
      safeFetch<BreakdownSnapshot>('/v1/public/breakdown?field=server.maxClients&limit=8&role=server', { field: 'server.maxClients', items: [] }),
      safeFetch<BreakdownSnapshot>('/v1/public/breakdown?field=server.locale&limit=8&role=server', { field: 'server.locale', items: [] }),
      safeFetch<BreakdownSnapshot>('/v1/public/breakdown?field=server.architecture&limit=8&role=server', { field: 'server.architecture', items: [] }),
      safeFetch<MetricValuesSnapshot>('/v1/public/metric-values?key=positioning_type&limit=8', { key: 'positioning_type', items: [] }),
      safeFetch<MetricValuesSnapshot>('/v1/public/metric-values?key=push_to_talk_enabled&limit=8', { key: 'push_to_talk_enabled', items: [] }),
    ])

    return {
      stats,
      modelBreakdown,
      serverConnectedBreakdown,
      serverCapacityBreakdown,
      serverLocalesBreakdown,
      serverArchitecturesBreakdown,
      positioningTypeBreakdown,
      pushToTalkBreakdown,
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
  if (normalized === 'True') return t('telemetry.enabled')
  if (normalized === 'False') return t('telemetry.disabled')
  return normalized
}

function toChartSlices(items: BreakdownItem[], limit = 5): ChartSlice[] {
  const filtered = items.filter(item => item.count > 0)
  const trimmed = filtered.slice(0, limit)
  const remainder = filtered.slice(limit).reduce((sum, item) => sum + item.count, 0)
  const combined = remainder > 0
    ? [...trimmed, { key: 'other', count: remainder }]
    : trimmed

  const total = combined.reduce((sum, item) => sum + item.count, 0)

  if (!total) return []

  return combined.map((item, index) => ({
    label: item.key === 'other' ? t('telemetry.other') : normalizeLabel(item.key),
    count: item.count,
    percent: (item.count / total) * 100,
    color: donutPalette[index % donutPalette.length],
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

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180)
  return {
    x: cx + (radius * Math.cos(angleInRadians)),
    y: cy + (radius * Math.sin(angleInRadians)),
  }
}

function describePieSlice(startAngle: number, endAngle: number, radius = 76, cx = 120, cy = 120) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
}

function toPieSlices(items: ChartSlice[]): PieSliceGeometry[] {
  let currentAngle = 0

  return items.map((item, index) => {
    const sliceAngle = (item.percent / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    const midAngle = startAngle + (sliceAngle / 2)
    currentAngle = endAngle

    const lineStart = polarToCartesian(120, 120, 84, midAngle)
    const lineBreak = polarToCartesian(120, 120, 100, midAngle)
    const labelOnRight = lineBreak.x >= 120
    const labelX = labelOnRight ? 214 : 26
    const labelY = Math.min(Math.max(lineBreak.y, 34), 206)
    const lineEndX = labelOnRight ? labelX - 8 : labelX + 8

    return {
      ...item,
      key: `${item.label}-${index}`,
      path: describePieSlice(startAngle, endAngle),
      linePath: `M ${lineStart.x} ${lineStart.y} L ${lineBreak.x} ${lineBreak.y} L ${lineEndX} ${labelY}`,
      labelX,
      labelY,
      labelAnchor: labelOnRight ? 'start' : 'end',
      fullCircle: item.percent >= 99.95,
    }
  })
}

const activeSliceLabels = ref<Record<string, string>>({})

function setActiveSlice(chartTitle: string, label: string) {
  activeSliceLabels.value = {
    ...activeSliceLabels.value,
    [chartTitle]: label,
  }
}

function clearActiveSlice(chartTitle: string) {
  const next = { ...activeSliceLabels.value }
  delete next[chartTitle]
  activeSliceLabels.value = next
}

function pieSlices(chart: DonutChart) {
  return toPieSlices(chart.items)
}

function activeSlice(chart: DonutChart) {
  const slices = pieSlices(chart)
  if (!slices.length) return null
  const activeLabel = activeSliceLabels.value[chart.title]
  return slices.find(slice => slice.label === activeLabel) ?? slices[0]
}

function isActivePieSlice(chart: DonutChart, slice: PieSliceGeometry) {
  const current = activeSlice(chart)
  return current?.key === slice.key
}

const overviewCards = computed(() => [
  {
    label: t('telemetry.cards.events'),
    value: formatNumber(dashboard.value.stats.totalTelemetryEvents),
    accent: 'violet',
  },
  {
    label: t('telemetry.cards.instances'),
    value: formatNumber(dashboard.value.stats.uniqueFingerprints),
    accent: 'cyan',
  },
  {
    label: t('telemetry.cards.dumps'),
    value: formatNumber(dashboard.value.stats.totalDumps),
    accent: 'amber',
  },
  {
    label: t('telemetry.cards.lastEvent'),
    value: formatDateTime(dashboard.value.stats.lastEventAt),
    accent: 'emerald',
  },
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
    items: toChartSlices(dashboard.value.stats.breakdowns.appVersions),
  },
  {
    title: t('telemetry.charts.positioningTypes'),
    subtitle: t('telemetry.charts.positioningTypesSubtitle'),
    items: toChartSlices(dashboard.value.positioningTypeBreakdown.items),
  },
])

function isOnlyUnknown(items: BreakdownItem[]) {
  return items.length > 0 && items.every(item => normalizeLabel(item.key) === t('telemetry.unknown'))
}

function isUsefulChart(items: BreakdownItem[], allowSingleKnown = false) {
  if (!items.length) return false
  if (isOnlyUnknown(items)) return false
  return allowSingleKnown || items.length > 1
}

const listCharts = computed(() => [
  {
    title: t('telemetry.charts.roleShare'),
    subtitle: t('telemetry.charts.roleShareSubtitle'),
    items: dashboard.value.stats.breakdowns.roles.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.osVersionShare'),
    subtitle: t('telemetry.charts.osVersionShareSubtitle'),
    items: dashboard.value.stats.breakdowns.osVersions.slice(0, 8),
    allowSingleKnown: true,
  },
  {
    title: t('telemetry.charts.osBuildShare'),
    subtitle: t('telemetry.charts.osBuildShareSubtitle'),
    items: dashboard.value.stats.breakdowns.osBuilds.slice(0, 8),
    allowSingleKnown: true,
  },
  {
    title: t('telemetry.charts.osDescriptionShare'),
    subtitle: t('telemetry.charts.osDescriptionShareSubtitle'),
    items: dashboard.value.stats.breakdowns.osDescriptions.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.architectureShare'),
    subtitle: t('telemetry.charts.architectureShareSubtitle'),
    items: dashboard.value.stats.breakdowns.architectures.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.processArchitectureShare'),
    subtitle: t('telemetry.charts.processArchitectureShareSubtitle'),
    items: dashboard.value.stats.breakdowns.processArchitectures.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.runtimeShare'),
    subtitle: t('telemetry.charts.runtimeShareSubtitle'),
    items: dashboard.value.stats.breakdowns.runtimes.slice(0, 8),
    allowSingleKnown: true,
  },
  {
    title: t('telemetry.charts.localeShare'),
    subtitle: t('telemetry.charts.localeShareSubtitle'),
    items: dashboard.value.stats.breakdowns.locales.slice(0, 8),
    allowSingleKnown: true,
  },
  {
    title: t('telemetry.charts.vendorShare'),
    subtitle: t('telemetry.charts.vendorShareSubtitle'),
    items: dashboard.value.stats.breakdowns.vendors.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.modelShare'),
    subtitle: t('telemetry.charts.modelShareSubtitle'),
    items: dashboard.value.modelBreakdown.items.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.serverPlatformShare'),
    subtitle: t('telemetry.charts.serverPlatformShareSubtitle'),
    items: dashboard.value.stats.breakdowns.serverPlatforms.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.serverArchitectureShare'),
    subtitle: t('telemetry.charts.serverArchitectureShareSubtitle'),
    items: dashboard.value.serverArchitecturesBreakdown.items.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.serverLocaleShare'),
    subtitle: t('telemetry.charts.serverLocaleShareSubtitle'),
    items: dashboard.value.serverLocalesBreakdown.items.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.serverConnectedClients'),
    subtitle: t('telemetry.charts.serverConnectedClientsSubtitle'),
    items: dashboard.value.serverConnectedBreakdown.items.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.serverMaxClients'),
    subtitle: t('telemetry.charts.serverMaxClientsSubtitle'),
    items: dashboard.value.serverCapacityBreakdown.items.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.tagShare'),
    subtitle: t('telemetry.charts.tagShareSubtitle'),
    items: dashboard.value.stats.breakdowns.tags.slice(0, 8),
    allowSingleKnown: false,
  },
  {
    title: t('telemetry.charts.dumpCategoryShare'),
    subtitle: t('telemetry.charts.dumpCategoryShareSubtitle'),
    items: dashboard.value.stats.breakdowns.dumpCategories.slice(0, 8),
    allowSingleKnown: true,
  },
].filter(chart => isUsefulChart(chart.items, chart.allowSingleKnown)))

const metricCharts = computed(() => [
  {
    title: t('telemetry.charts.positioningTypes'),
    subtitle: t('telemetry.charts.positioningTypesSubtitle'),
    items: dashboard.value.positioningTypeBreakdown.items,
  },
  {
    title: t('telemetry.charts.pushToTalk'),
    subtitle: t('telemetry.charts.pushToTalkSubtitle'),
    items: dashboard.value.pushToTalkBreakdown.items,
  },
].filter(chart => isUsefulChart(chart.items, true)))

const hasAnyData = computed(() => {
  const stats = dashboard.value.stats
  return stats.totalTelemetryEvents > 0
    || stats.totalDumps > 0
    || stats.uniqueFingerprints > 0
    || donutCharts.value.some(chart => chart.items.length)
    || listCharts.value.some(chart => chart.items.length)
    || metricCharts.value.some(chart => chart.items.length)
})

const apiLinks = computed(() => [
  {
    label: '/v1/public/stats',
    to: `${TELEMETRY_API_BASE}/v1/public/stats`,
  },
  {
    label: '/v1/public/breakdown',
    to: `${TELEMETRY_API_BASE}/v1/public/breakdown?field=device.osName&limit=20`,
  },
  {
    label: '/v1/public/metric-values',
    to: `${TELEMETRY_API_BASE}/v1/public/metric-values?key=positioning_type&limit=20`,
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
        </div>

        <div class="vc-glass rounded-3xl p-5 md:p-6">
          <p class="vc-telemetry-mini-label">
            {{ t('telemetry.apiEndpoints') }}
          </p>
          <div class="mt-4 space-y-3">
            <a
              v-for="link in apiLinks"
              :key="link.label"
              :href="link.to"
              target="_blank"
              rel="noreferrer"
              class="vc-telemetry-api-link"
            >
              <span>{{ link.label }}</span>
              <span class="vc-telemetry-api-link-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
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

    <div
      v-else-if="!hasAnyData"
      class="vc-glass vc-reveal rounded-3xl p-7 md:p-9"
    >
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

          <div class="mt-6">
            <div
              v-if="chart.items.length"
              class="vc-telemetry-pie-shell"
              @mouseleave="clearActiveSlice(chart.title)"
            >
              <div class="vc-telemetry-pie-stage">
                <svg
                  viewBox="0 0 240 240"
                  class="vc-telemetry-pie-svg"
                  role="img"
                  :aria-label="chart.title"
                >
                  <g
                    v-for="slice in pieSlices(chart)"
                    :key="slice.key"
                    class="vc-telemetry-pie-group"
                    :class="{ 'is-active': isActivePieSlice(chart, slice) }"
                    @mouseenter="setActiveSlice(chart.title, slice.label)"
                  >
                    <circle
                      v-if="slice.fullCircle"
                      class="vc-telemetry-pie-slice"
                      cx="120"
                      cy="120"
                      r="76"
                      :fill="slice.color"
                    />
                    <path
                      v-else
                      class="vc-telemetry-pie-slice"
                      :d="slice.path"
                      :fill="slice.color"
                    />
                    <path
                      class="vc-telemetry-pie-line"
                      :d="slice.linePath"
                      :stroke="slice.color"
                    />
                    <circle
                      class="vc-telemetry-pie-node"
                      :cx="slice.labelAnchor === 'start' ? slice.labelX - 8 : slice.labelX + 8"
                      :cy="slice.labelY"
                      r="3.5"
                      :fill="slice.color"
                    />
                    <text
                      class="vc-telemetry-pie-label"
                      :x="slice.labelX"
                      :y="slice.labelY - 6"
                      :text-anchor="slice.labelAnchor"
                    >
                      {{ slice.label }}
                    </text>
                    <text
                      class="vc-telemetry-pie-value"
                      :x="slice.labelX"
                      :y="slice.labelY + 16"
                      :text-anchor="slice.labelAnchor"
                    >
                      {{ formatPercent(slice.percent) }}%
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div v-else class="vc-telemetry-chart-empty">
              {{ t('telemetry.noChartData') }}
            </div>
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
                <span class="vc-telemetry-rank-label">{{ normalizeLabel(item.key) }}</span>
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

      <div v-if="metricCharts.length" class="grid gap-6 xl:grid-cols-2">
        <article
          v-for="chart in metricCharts"
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
              class="vc-telemetry-key-row"
            >
              <div class="flex items-center justify-between gap-4">
                <code class="vc-telemetry-key-name">{{ normalizeMetricValue(item.key) }}</code>
                <span class="vc-telemetry-row-value">{{ formatNumber(item.count) }}</span>
              </div>
              <div class="vc-telemetry-bar-track">
                <div
                  class="vc-telemetry-bar-fill vc-telemetry-bar-fill-alt"
                  :style="{ width: barWidth(item.count, maxCount(chart.items)) }"
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

    <div v-if="error" class="vc-telemetry-note">
      {{ t('telemetry.partialData') }}
    </div>
  </section>
</template>
