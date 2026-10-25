<script setup lang="ts">
import { categories, sortOptions, type SortOptionId } from "~/data/products";

const query = defineModel<string>("query", { required: true });
const sort = defineModel<SortOptionId | null>("sort", { required: true });
const selectedCategories = defineModel<string[]>("categories", {
  required: true,
});

const emit = defineEmits<{
  search: [];
}>();

const sortOpen = ref(true);
const categoryOpen = ref(true);
const searchInput = ref<HTMLInputElement | null>(null);

function toggleCategory(id: string) {
  const current = selectedCategories.value;
  selectedCategories.value = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
}

function focusSearch() {
  searchInput.value?.focus();
}

defineExpose({ focusSearch });
</script>

<template>
  <section class="filters" aria-labelledby="filters-title">
    <h2 id="filters-title" class="filters__title">فیلتر و جستجو</h2>

    <form class="filters__search" @submit.prevent="emit('search')">
      <label class="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="11"
            cy="11"
            r="6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="m15.5 15.5 4 4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
        <input
          ref="searchInput"
          v-model="query"
          type="search"
          placeholder="جستجو"
          aria-label="جستجو"
        />
        <button
          v-if="query"
          type="button"
          class="search__clear"
          aria-label="پاک کردن جستجو"
          @click="query = ''"
        >
          ×
        </button>
      </label>
      <button type="submit" class="filters__submit">جستجو</button>
    </form>

    <div class="group">
      <button
        type="button"
        class="group__head"
        :aria-expanded="sortOpen"
        @click="sortOpen = !sortOpen"
      >
        <span>مرتب سازی</span>
        <svg
          viewBox="0 0 16 16"
          :class="{ 'is-open': sortOpen }"
          aria-hidden="true"
        >
          <path
            d="m4 10 4-4 4 4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div v-show="sortOpen" class="group__body">
        <label v-for="option in sortOptions" :key="option.id" class="choice">
          <input
            :checked="sort === option.id"
            type="radio"
            name="sort"
            @change="sort = option.id"
          />
          <span class="radio" />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </div>

    <div class="group">
      <button
        type="button"
        class="group__head"
        :aria-expanded="categoryOpen"
        @click="categoryOpen = !categoryOpen"
      >
        <span>دسته بندی</span>
        <svg
          viewBox="0 0 16 16"
          :class="{ 'is-open': categoryOpen }"
          aria-hidden="true"
        >
          <path
            d="m4 10 4-4 4 4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div v-show="categoryOpen" class="group__body">
        <label v-for="category in categories" :key="category.id" class="choice">
          <input
            :checked="selectedCategories.includes(category.id)"
            type="checkbox"
            @change="toggleCategory(category.id)"
          />
          <span class="box" />
          <span>{{ category.label }}</span>
          <!-- This span end line for category.label -->
          <span
            class="count"
            :class="{ 'is-active': selectedCategories.includes(category.id) }"
          >
            {{ category.count }}
          </span>
        </label>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters {
  padding: 18px 16px 8px;
  border-radius: 22px;
  background: var(--color-surface);
}

.filters__title {
  margin: 0 0 14px;
  color: #9aa3b5;
  font-size: 13px;
  font-weight: 500;
}

.filters__search {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 12px;
  border: 1.5px solid #f3b4cc;
  border-radius: 12px;
  background: #fff;
}

.search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--color-navy);
  font: inherit;
  font-size: 14px;
  text-align: right;
}

.search input::-webkit-search-cancel-button {
  appearance: none;
}

.search svg {
  width: 18px;
  height: 18px;
  flex: none;
  color: var(--color-pink);
}

.search__clear {
  border: 0;
  background: transparent;
  color: var(--color-pink);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.filters__submit {
  min-height: 46px;
  border: 0;
  border-radius: 12px;
  background: var(--color-pink);
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.filters__submit:hover {
  background: var(--color-pink-dark);
}

.group {
  margin-top: 8px;
}

.group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 2px;
  border: 0;
  background: transparent;
  color: var(--color-navy);
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.group__head svg {
  width: 16px;
  height: 16px;
  color: #8b93a7;
  transform: rotate(180deg);
}

.group__head svg.is-open {
  transform: rotate(0deg);
}

.group__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
}

.choice {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5d6780;
  font-size: 14px;
  cursor: pointer;
}

.choice input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.radio,
.box {
  width: 18px;
  height: 18px;
  flex: none;
  border: 1.5px solid #c9cfdb;
  background: #fff;
}

.radio {
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.box {
  display: grid;
  place-items: center;
  border-radius: 4px;
}

.choice input:checked + .radio {
  border-color: var(--color-pink);
}

.choice input:checked + .radio::after {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-pink);
  content: "";
}

.choice input:checked + .box {
  border-color: var(--color-pink);
  background: var(--color-pink);
}

.choice input:checked + .box::after {
  width: 8px;
  height: 4px;
  margin-top: -2px;
  border-bottom: 1.6px solid #fff;
  border-left: 1.6px solid #fff;
  transform: rotate(-45deg);
  content: "";
}

.choice input:focus-visible + .radio,
.choice input:focus-visible + .box {
  outline: 2px solid var(--color-pink);
  outline-offset: 2px;
}

.count {
  margin-inline-start: auto;
  min-width: 28px;
  padding: 2px 6px;
  border-radius: 6px;
  background: #2a3142;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
}

.count.is-active {
  background: var(--color-pink);
}
</style>
