<template>
  <Navbar
    :class="['fixed-top nav-bg', { 'nav-compact': isScrolled }]"
    expand="lg"
  >
    <Container>
      <NavbarBrand class="comf-600-30px brand-wrap order-lg-1" @click="navigateTo('/')">
        <span class="brand-link">
          <span class="nuni-800-40 brand-word brand-primary">Voice</span>
          <span class="nuni-800-40 brand-word brand-accent" data-text="Craft">Craft</span>
        </span>
      </NavbarBrand>

      <div class="nav-controls d-flex align-items-center ms-auto order-lg-3 ms-lg-0">
        <Dropdown class="ms-2 ms-lg-3 position-relative">
          <DropdownToggle class="no-caret btn-lang" color="light-subtle" :aria-label="currentLocaleMeta.name">
            <span :class="['flag-icon', currentLocaleMeta.flagClass]" aria-hidden="true"></span>
          </DropdownToggle>
          <DropdownMenu class="dropdown-menu animated animated-fade-in">
            <DropdownItem
              v-for="loc in languageOptions"
              :key="loc.code"
              @click="changeLocale(loc.code)"
            >
              <span :class="['flag-icon', 'menu-flag', loc.flagClass]" aria-hidden="true" />
              <span>{{ loc.name }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarToggler class="ms-2 d-lg-none" />
      </div>

      <NavbarCollapse class="w-100 nav-collapse-panel order-lg-2 flex-lg-grow-1">
        <NavbarNavList class="mx-auto align-items-center nav-links-wrap">
          <NavItem
            v-for="item in topNavigation"
            :key="item.to"
            class="ms-3 ms-lg-3"
          >
            <NavLink :to="item.to" class="comf-400-20">
              {{ item.label }}
            </NavLink>
          </NavItem>
        </NavbarNavList>
      </NavbarCollapse>
    </Container>
  </Navbar>
</template>

<script setup lang="ts">
import { topNavigation } from '~/utils/docs-navigation'

const { locale, locales, setLocale } = useI18n()
const isScrolled = ref(false)

type LocaleCode = 'en' | 'ru' | 'de' | 'nl' | 'pl' | 'zh_cn' | 'zh_tw'

const localeFlags: Record<LocaleCode, string> = {
  en: 'flag-en',
  ru: 'flag-ru',
  de: 'flag-de',
  nl: 'flag-nl',
  pl: 'flag-pl',
  zh_cn: 'flag-zh-cn',
  zh_tw: 'flag-zh-tw',
}

const languageOptions = computed(() => locales.value.map((item) => {
  const source = typeof item === 'string' ? { code: item, name: item } : item
  const code = source.code as LocaleCode
  return {
    code,
    name: source.name || source.code,
    flagClass: localeFlags[code] || 'flag-en',
  }
}))

const currentLocaleMeta = computed(() => (
  languageOptions.value.find(loc => loc.code === locale.value) || languageOptions.value[0] || {
    code: 'en',
    name: 'English',
    flagClass: 'flag-en',
  }
))

const changeLocale = (code: LocaleCode) => {
  setLocale(code)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss" src="../../assets/styles/components/landing/_header.scss"></style>
