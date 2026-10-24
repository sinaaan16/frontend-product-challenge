<script setup lang="ts">
import HeaderIcon from './HeaderIcon.vue'
import SiteNav from './SiteNav.vue'

const route = useRoute()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

function onBreakpoint(event: MediaQueryListEvent) {
  if (event.matches) {
    closeMenu()
  }
}

let tabletUp: MediaQueryList | undefined

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  tabletUp = window.matchMedia('(min-width: 768px)')
  tabletUp.addEventListener('change', onBreakpoint)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  tabletUp?.removeEventListener('change', onBreakpoint)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="header">
    <div class="shell header__bar">
      <SiteNav class="header__nav" label="منوی اصلی" />

      <button type="button" class="cta header__cta">
        <HeaderIcon name="phone" />
        <span>تماس</span>
      </button>

      <div class="header__tools">
        <button
          type="button"
          class="icon-btn"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="منو"
          @click="toggleMenu"
        >
          <HeaderIcon :name="menuOpen ? 'close' : 'menu'" />
        </button>

        <button type="button" class="icon-btn" aria-label="تماس">
          <HeaderIcon name="phone" />
        </button>
      </div>
    </div>

    <div class="shell header__drawer" :class="{ 'is-open': menuOpen }">
      <SiteNav id="mobile-menu" variant="drawer" label="منوی موبایل" />
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-surface);
  color: var(--color-navy);
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.header__bar {
  display: flex;
  align-items: center;
  min-height: 76px;
}

.header__tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.header__drawer {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  padding-bottom: 18px;
}

.header__drawer.is-open {
  display: flex;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: var(--color-pink);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.cta:hover {
  background: var(--color-pink-dark);
}

.cta.header__cta {
  display: none;
}

.cta:focus-visible,
.icon-btn:focus-visible {
  outline: 2px solid var(--color-pink);
  outline-offset: 3px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  padding: 0;
  border: 1.5px solid var(--color-pink);
  border-radius: 14px;
  background: var(--color-surface);
  color: var(--color-pink);
  cursor: pointer;
}

.icon-btn:hover {
  background: #fff5f9;
}

.icon-btn :deep(.icon) {
  width: 26px;
  height: 26px;
}

@media (min-width: 768px) {
  .header__bar {
    justify-content: center;
    gap: 28px;
    min-height: 84px;
  }

  .cta.header__cta {
    display: inline-flex;
  }

  .header__tools,
  .header__drawer,
  .header__drawer.is-open {
    display: none;
  }
}

@media (min-width: 1100px) {
  .header__bar {
    justify-content: space-between;
  }

  .cta {
    min-height: 48px;
    padding: 0 22px;
    font-size: 16px;
  }
}
</style>
