<script setup lang="ts">
import { sortOptions, type SortOptionId } from '~/data/products'

const props = defineProps<{
  query: string
  sort: SortOptionId | null
}>()

const emit = defineEmits<{
  removeQuery: []
  removeSort: []
  focusSearch: []
}>()

const activeSort = computed(() => sortOptions.find(option => option.id === props.sort))
</script>

<template>
  <div class="applied">
    <p class="applied__label">فیلترهای اعمال شده</p>

    <div class="applied__tools">
      <span v-if="query" class="chip">
        <button type="button" class="chip__icon" aria-label="جستجو" @click="emit('focusSearch')">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.8" />
            <path d="m15.5 15.5 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
        <span>{{ query }}</span>
        <button type="button" class="chip__x" :aria-label="`حذف ${query}`" @click="emit('removeQuery')">×</button>
      </span>

      <span v-if="activeSort" class="chip">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            v-if="activeSort.direction === 'asc'"
            d="M8 13V3.5M8 3.5 4.8 6.6M8 3.5l3.2 3.1"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            v-else
            d="M8 3v9.5M8 12.5l-3.2-3.1M8 12.5l3.2-3.1"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ activeSort.chip }}</span>
        <button type="button" class="chip__x" :aria-label="`حذف ${activeSort.chip}`" @click="emit('removeSort')">×</button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.applied {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 58px;
  padding: 10px 16px;
  border-radius: 16px;
  background: var(--color-surface);
}

.applied__label {
  margin: 0;
  color: #9aa3b5;
  font-size: 14px;
}

.applied__tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  background: #fde8f2;
  color: var(--color-pink);
  font-size: 13px;
  font-weight: 500;
}

.chip svg {
  width: 14px;
  height: 14px;
}

.chip__icon,
.chip__x {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1;
  cursor: pointer;
}

.chip__icon svg {
  width: 15px;
  height: 15px;
}

.chip__x {
  font-size: 16px;
}

.chip__icon:focus-visible,
.chip__x:focus-visible {
  outline: 2px solid var(--color-pink);
  outline-offset: 3px;
  border-radius: 4px;
}
</style>
