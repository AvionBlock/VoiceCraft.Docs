import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

type VoiceCraftOgImageInput = {
  title: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string | undefined>
  section?: MaybeRefOrGetter<string | undefined>
  path?: MaybeRefOrGetter<string | undefined>
}

function cleanTitle(value: string) {
  return value.replace(/\s+·\s+VoiceCraft Docs$/i, '').trim()
}

export function useVoiceCraftOgImage(input: VoiceCraftOgImageInput) {
  const route = useRoute()

  const title = computed(() => cleanTitle(toValue(input.title) || 'VoiceCraft Docs'))
  const description = computed(() => toValue(input.description) || 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.')
  const section = computed(() => toValue(input.section) || 'Documentation')
  const path = computed(() => toValue(input.path) || route.path || '/')
  const alt = computed(() => `${title.value} - VoiceCraft Docs`)

  useSeoMeta({
    ogType: 'website',
    twitterCard: 'summary_large_image',
  })

  defineOgImage('VoiceCraft', {
    title,
    description,
    section,
    path,
  }, {
    alt,
  })
}
