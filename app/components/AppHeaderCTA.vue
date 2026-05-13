<script setup lang="ts">
type VersionConfig = {
  id: string
  label: string
  current?: boolean
  extends?: string
  source?: 'legacy' | 'overlay'
}

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const docsVersioning = useVoiceCraftDocsVersioning()

const versions = computed<VersionConfig[]>(() => docsVersioning.versions.value)
const activeVersionId = computed(() => {
  const routeVersion = getDocsVersionFromRoute(route.path)
  return routeVersion && docsVersioning.findVersion(routeVersion)
    ? routeVersion
    : docsVersioning.currentVersionId.value
})
const currentDocsPath = computed(() => {
  const path = getDocsPathFromRoute(route.path)
  return path === '/addon-configurator' ? '/' : path
})

const versionOptions = computed(() => {
  return versions.value.map((item) => {
    return {
      label: item.current
        ? `${item.label} (${t('ui.versionCurrent')})`
        : item.label,
      value: item.id,
    }
  })
})

const selectedVersionId = ref(activeVersionId.value)

watch(activeVersionId, (value) => {
  selectedVersionId.value = value
})

async function onVersionChange() {
  const selected = versions.value.find(item => item.id === selectedVersionId.value)
  if (!selected) return
  await router.push(docsVersioning.buildDocsPath(currentDocsPath.value, selected.id))
}
</script>

<template>
  <div v-if="versionOptions.length" class="vc-version-cta">
    <select
      v-model="selectedVersionId"
      class="vc-version-select"
      :disabled="versionOptions.length < 2"
      :aria-label="t('ui.versionSwitcher')"
      @change="onVersionChange"
    >
      <option v-for="item in versionOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
