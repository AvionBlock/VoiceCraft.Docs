export type TelemetryRole = 'client' | 'server'

export type BreakdownItem = {
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

export type DashboardSnapshot = {
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

const TELEMETRY_API_BASE = 'https://vc-api.avion.team'

export const telemetryPalette = ['#ca89ff', '#5fffe0', '#facc15', '#38bdf8', '#fb7185', '#34d399', '#a78bfa', '#f97316']

const emptyBreakdown = (field: string): BreakdownSnapshot => ({ field, items: [] })
const emptyMetric = (key: string): MetricValuesSnapshot => ({ key, items: [] })

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

export const emptyTelemetryDashboard = (): DashboardSnapshot => ({
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

async function safeFetch<T>(path: string, fallback: T, failures: string[]) {
  try {
    return await $fetch<T>(`${TELEMETRY_API_BASE}${path}`)
  } catch {
    failures.push(path)
    return fallback
  }
}

export async function fetchTelemetryDashboard(role: TelemetryRole): Promise<DashboardSnapshot> {
  const failures: string[] = []
  const roleQuery = `role=${encodeURIComponent(role)}`
  const breakdown = (field: string) => safeFetch<BreakdownSnapshot>(
    `/v1/public/breakdown?field=${encodeURIComponent(field)}&limit=8&${roleQuery}`,
    emptyBreakdown(field),
    failures,
  )
  const metric = (key: string) => safeFetch<MetricValuesSnapshot>(
    `/v1/public/metric-values?key=${encodeURIComponent(key)}&limit=8&${roleQuery}`,
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
    safeFetch<StatsSnapshot>(`/v1/public/stats?${roleQuery}`, emptyStats(), failures),
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
}
