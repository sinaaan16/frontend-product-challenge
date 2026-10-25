<script setup lang="ts">
import {
  PRODUCTS_API_URL,
  buildCategories,
  normalizeProduct,
  type ApiProduct,
  type SortOptionId,
} from '~/data/products'

useHead({
  title: 'لیست محصولات',
})

const { data: rawProducts, status, error, refresh } = await useFetch<ApiProduct[]>(PRODUCTS_API_URL, {
  server: false,
  default: () => [],
})

const products = computed(() => rawProducts.value.map(normalizeProduct))
const categories = computed(() => buildCategories(products.value))

const filters = ref<{ focusSearch: () => void } | null>(null)
const filtersOpen = ref(false)
const draftQuery = ref('')
const appliedQuery = ref('')
const sort = ref<SortOptionId | null>('count-asc')
const selectedCategories = ref<string[]>([])

const visibleProducts = computed(() => {
  const selected = selectedCategories.value
  const needle = appliedQuery.value.trim().toLowerCase()

  const list = products.value.filter((product) => {
    const matchesCategory = selected.length === 0 || selected.includes(product.categoryId)
    const matchesQuery = !needle
      || product.title.toLowerCase().includes(needle)
      || product.description.toLowerCase().includes(needle)

    return matchesCategory && matchesQuery
  })

  return [...list].sort((a, b) => {
    if (sort.value === 'count-desc') return b.count - a.count
    if (sort.value === 'rating-desc') return b.rating - a.rating
    if (sort.value === 'rating-asc') return a.rating - b.rating
    if (sort.value === 'count-asc') return a.count - b.count
    return 0
  })
})

function search() {
  appliedQuery.value = draftQuery.value.trim()
  filtersOpen.value = false
}

function removeQuery() {
  appliedQuery.value = ''
  draftQuery.value = ''
}

function clearFilters() {
  selectedCategories.value = []
  removeQuery()
}
</script>

<template>
  <section class="catalog">
    <h1 class="sr-only">لیست محصولات</h1>

    <button
      type="button"
      class="catalog__toggle"
      :aria-expanded="filtersOpen"
      @click="filtersOpen = !filtersOpen"
    >
      فیلتر و جستجو
    </button>

    <aside class="catalog__aside" :class="{ 'is-open': filtersOpen }">
      <CatalogFilters
        ref="filters"
        v-model:query="draftQuery"
        v-model:sort="sort"
        v-model:selected-categories="selectedCategories"
        :categories="categories"
        @search="search"
      />
    </aside>

    <div class="catalog__main">
      <AppliedFilters
        :query="appliedQuery"
        :sort="sort"
        @remove-query="removeQuery"
        @remove-sort="sort = null"
        @focus-search="filters?.focusSearch()"
      />

      <div v-if="error" class="catalog__empty">
        <h2>خطا در دریافت محصولات</h2>
        <p>ارتباط با سرویس برقرار نشد. دوباره تلاش کنید.</p>
        <button type="button" @click="refresh()">تلاش مجدد</button>
      </div>

      <p v-else-if="status === 'pending' && !products.length" class="catalog__status">
        در حال دریافت محصولات...
      </p>

      <ul v-else-if="visibleProducts.length" class="catalog__grid">
        <li v-for="product in visibleProducts" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>

      <div v-else class="catalog__empty">
        <span class="empty__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="m15.5 15.5 4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            <path d="M8.2 11h5.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </span>
        <h2>محصولی پیدا نشد</h2>
        <p>با فیلترهای انتخاب‌شده محصولی در فهرست نیست. دسته‌بندی یا عبارت جستجو را عوض کنید.</p>
        <button type="button" @click="clearFilters">پاک کردن فیلترها</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.catalog__toggle {
  min-height: 46px;
  border: 0;
  border-radius: 14px;
  background: var(--color-surface);
  color: var(--color-navy);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.catalog__aside {
  display: none;
}

.catalog__aside.is-open {
  display: block;
}

.catalog__main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  width: 100%;
}

.catalog__grid {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.catalog__status,
.catalog__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 48px 24px 44px;
  border-radius: 22px;
  background: var(--color-surface);
  text-align: center;
}

.catalog__status {
  color: #7d879c;
  font-size: 14px;
}

.empty__mark {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 6px;
  border-radius: 50%;
  background: #fde8f2;
  color: var(--color-pink);
}

.empty__mark svg {
  width: 28px;
  height: 28px;
}

.catalog__empty h2 {
  margin: 0;
  color: var(--color-navy);
  font-size: 18px;
  font-weight: 700;
}

.catalog__empty p {
  max-width: 28rem;
  margin: 0 0 8px;
  color: #7d879c;
  font-size: 14px;
  line-height: 1.8;
}

.catalog__empty button {
  min-height: 42px;
  padding: 0 22px;
  border: 0;
  border-radius: 999px;
  background: var(--color-pink);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.catalog__empty button:hover {
  background: var(--color-pink-dark);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (min-width: 768px) {
  .catalog__toggle {
    display: none;
  }

  .catalog__aside {
    display: block;
  }

  .catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
}

@media (min-width: 1100px) {
  .catalog {
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
  }

  .catalog__aside {
    width: 280px;
    flex: none;
  }

  .catalog__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
