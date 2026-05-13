<script setup lang="ts">
const props = withDefaults(defineProps<{
  to?: string
  href?: string
  target?: string
  disabled?: boolean
  icon?: string
  trailingIcon?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | string
  color?: string
  variant?: string
}>(), {
  size: 'md',
  color: 'primary',
  variant: 'solid',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const buttonClass = computed(() => [
  'btn',
  `vc-u-btn-${props.size}`,
  props.variant === 'outline' ? 'btn-outline-light' : props.variant === 'soft' ? 'btn-dark' : 'btn-primary',
  { disabled: props.disabled },
])

const linkTarget = computed(() => props.href || props.to)

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="linkTarget"
    :target="target"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :class="buttonClass"
    @click="onClick"
  >
    <Icon v-if="icon" :name="icon" aria-hidden="true" />
    <span v-if="$slots.default" class="vc-u-btn-label">
      <slot />
    </span>
    <Icon v-if="trailingIcon" :name="trailingIcon" aria-hidden="true" />
  </component>
</template>
