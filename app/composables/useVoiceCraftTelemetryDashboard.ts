import { computed } from 'vue'
import {
  emptyTelemetryDashboard,
  fetchTelemetryDashboard,
  telemetryPalette,
} from '~/utils/voicecraft-telemetry-api'
import type {
  BreakdownItem,
  DashboardSnapshot,
  TelemetryRole,
} from '~/utils/voicecraft-telemetry-api'

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

export async function useVoiceCraftTelemetryDashboard(role: TelemetryRole) {
  const { t, locale } = useI18n()

  const { data, status, error, refresh } = await useAsyncData<DashboardSnapshot>(
    `voicecraft-telemetry-${role}`,
    () => fetchTelemetryDashboard(role),
    {
      server: false,
      lazy: true,
      default: emptyTelemetryDashboard,
    },
  )

  const dashboard = computed(() => data.value ?? emptyTelemetryDashboard())

  function currentLocale() {
    const localeMap: Record<string, string> = {
      de: 'de-DE',
      en: 'en-US',
      nl: 'nl-NL',
      pl: 'pl-PL',
      ru: 'ru-RU',
      zh_cn: 'zh-CN',
      zh_tw: 'zh-TW',
    }

    return localeMap[locale.value] || 'en-US'
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
      color: telemetryPalette[index % telemetryPalette.length] || '#5fffe0',
    }))
  }

  function maxCount(items: BreakdownItem[]) {
    return items.reduce((max, item) => Math.max(max, item.count), 0)
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
    role === 'client' ? t('telemetry.roles.client') : t('telemetry.roles.server')
  ))

  const roleDescription = computed(() => (
    role === 'client' ? t('telemetry.roles.clientDescription') : t('telemetry.roles.serverDescription')
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
    ...(role === 'client' ? clientListCharts.value : serverListCharts.value),
  ].filter(isUsefulChart))

  const hasAnyData = computed(() => {
    const stats = dashboard.value.stats
    return stats.totalTelemetryEvents > 0
      || stats.totalDumps > 0
      || stats.uniqueFingerprints > 0
      || donutCharts.value.some(chart => chart.items.length)
      || listCharts.value.some(chart => chart.items.length)
  })

  return {
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
  }
}
