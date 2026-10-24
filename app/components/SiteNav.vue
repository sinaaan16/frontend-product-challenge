<script setup lang="ts">
import HeaderIcon from "./HeaderIcon.vue";
import { isNavItemCurrent, navItems, type NavItem } from "~/config/navigation";

const props = withDefaults(
  defineProps<{
    variant?: "bar" | "drawer";
    label: string;
  }>(),
  {
    variant: "bar",
  },
);

const route = useRoute();

function isCurrent(item: NavItem) {
  return isNavItemCurrent(route.path, item);
}
</script>

<template>
  <nav class="nav" :class="`nav--${props.variant}`" :aria-label="label">
    <template v-for="item in navItems" :key="item.id">
      <NuxtLink
        v-if="item.to"
        class="nav-link"
        :class="{ 'is-active': isCurrent(item) }"
        :to="item.to"
        :aria-current="isCurrent(item) ? 'page' : undefined"
      >
        <span class="nav-link__row">
          <HeaderIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </span>
        <span class="nav-link__dot" aria-hidden="true" />
      </NuxtLink>

      <button
        v-else
        type="button"
        class="nav-link"
        :class="{ 'is-active': isCurrent(item) }"
      >
        <span class="nav-link__row">
          <HeaderIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </span>
        <span class="nav-link__dot" aria-hidden="true" />
      </button>
    </template>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
}

.nav--bar {
  display: none;
  gap: 18px;
}

.nav--drawer {
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.nav-link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-navy);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.nav--drawer .nav-link {
  align-items: flex-start;
  font-size: 16px;
}

.nav-link__row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.nav-link__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
}

.nav-link.is-active {
  color: var(--color-pink);
}

.nav-link.is-active .nav-link__dot {
  background: var(--color-pink);
}

.nav-link:hover {
  color: var(--color-pink);
}

.nav-link:focus-visible {
  outline: 2px solid var(--color-pink);
  outline-offset: 3px;
}

@media (min-width: 768px) {
  .nav--bar {
    display: flex;
  }
}

@media (min-width: 1100px) {
  .nav--bar {
    gap: 34px;
  }

  .nav-link {
    font-size: 15px;
  }
}
</style>
