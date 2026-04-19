<script setup lang="ts">
type VersionConfig = {
  id: string
  label: string
  current?: boolean
  paths?: {
    en?: string
    ru?: string
  }
}

const appConfig = useAppConfig() as {
  docsVersioning?: {
    current?: string
    versions?: VersionConfig[]
  }
}

const { locale, t } = useI18n()
const router = useRouter()

const versions = computed(() => appConfig.docsVersioning?.versions || [])
const currentVersion = computed(() => appConfig.docsVersioning?.current || '')

const versionOptions = computed(() => {
  const localeCode = locale.value === 'ru' ? 'ru' : 'en'
  return versions.value.map((item) => {
    const path = item.paths?.[localeCode]
    return {
      label: item.current
        ? `${item.label} (${t('ui.versionCurrent')})`
        : item.label,
      value: item.id,
      path: path || '',
    }
  })
})

const selectedVersionId = ref(currentVersion.value)

watch(currentVersion, (value) => {
  selectedVersionId.value = value
})

async function onVersionChange() {
  const selected = versionOptions.value.find(item => item.value === selectedVersionId.value)
  if (!selected?.path) return
  if (selected.path.startsWith('http://') || selected.path.startsWith('https://')) {
    await navigateTo(selected.path, { external: true })
    return
  }
  await router.push(selected.path)
}
</script>

<template>
  <div class="vc-version-cta">
    <select
      v-model="selectedVersionId"
      class="vc-version-select"
      :aria-label="t('ui.versionSwitcher')"
      @change="onVersionChange"
    >
      <option v-for="item in versionOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
