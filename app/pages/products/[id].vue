<script setup lang="ts">
import { PRODUCTS_API_URL, normalizeProduct, type ApiProduct } from '~/data/products'

const route = useRoute()
const zoomOpen = ref(false)

const productId = computed(() => {
  const value = route.params.id
  return Array.isArray(value) ? value[0] : value
})

const { data: rawProduct, status, error, refresh } = await useFetch<ApiProduct | null>(
  () => `${PRODUCTS_API_URL}/${productId.value}`,
  { server: false, default: () => null },
)

const product = computed(() => rawProduct.value ? normalizeProduct(rawProduct.value) : null)

const faNumber = new Intl.NumberFormat('fa-IR')

const formattedPrice = computed(() => {
  if (!product.value) return ''
  return `${faNumber.format(product.value.price)} تومان`
})

const descriptionPoints = computed(() => {
  const text = product.value?.description.trim() ?? ''
  if (!text) return []

  const parts = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map(item => item.trim())
    .filter(Boolean)

  return parts.length ? parts : [text]
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') zoomOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

useHead({
  title: computed(() => product.value?.title ?? 'جزئیات محصول'),
})
</script>

<template>
  <div class="detail-page">
    <nav class="crumbs" aria-label="مسیر صفحه">
      <NuxtLink to="/" class="crumbs__home" aria-label="خانه">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M3.5 9.2 10 3.8l6.5 5.4v6.5a1.3 1.3 0 0 1-1.3 1.3h-3.3v-4.5H8.1V17H4.8a1.3 1.3 0 0 1-1.3-1.3Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
      <svg class="crumbs__sep" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <NuxtLink to="/" class="crumbs__link">لیست محصولات ها</NuxtLink>
      <template v-if="product">
        <svg class="crumbs__sep" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="crumbs__current">{{ product.title }}</span>
      </template>
    </nav>

    <div v-if="error" class="state-card">
      <h1>خطا در دریافت اطلاعات محصول</h1>
      <p>ارتباط با سرویس برقرار نشد. دوباره تلاش کنید.</p>
      <button type="button" @click="refresh()">تلاش مجدد</button>
    </div>

    <div v-else-if="status === 'pending' && !product" class="state-card">
      <p>در حال دریافت اطلاعات محصول...</p>
    </div>

    <template v-else-if="product">
      <article class="panel hero">
        <h1 class="hero__title">{{ product.title }}</h1>

        <div class="hero__media">
          <img :src="product.image" :alt="product.title">
          <button
            type="button"
            class="hero__zoom"
            aria-label="بزرگ‌نمایی تصویر"
            @click="zoomOpen = true"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.8" />
              <path d="M11 8.5v5M8.5 11h5m2 4.5 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </article>

      <section class="panel specs" aria-labelledby="specs-title">
        <h2 id="specs-title" class="specs__title">مشخصات فنی</h2>

        <dl class="specs__list">
          <div class="specs__row">
            <dt class="specs__key">قیمت</dt>
            <dd class="specs__val">{{ formattedPrice }}</dd>
          </div>

          <div class="specs__row">
            <dt class="specs__key">توضیحات</dt>
            <dd class="specs__val">
              <ul class="specs__bullets">
                <li v-for="(line, index) in descriptionPoints" :key="index">
                  {{ line }}
                </li>
              </ul>
            </dd>
          </div>

          <div class="specs__row">
            <dt class="specs__key">دسته بندی</dt>
            <dd class="specs__val">{{ product.categoryLabel }}</dd>
          </div>

          <div class="specs__row">
            <dt class="specs__key">رتبه</dt>
            <dd class="specs__val">{{ faNumber.format(product.rating) }}</dd>
          </div>

          <div class="specs__row">
            <dt class="specs__key">تعداد</dt>
            <dd class="specs__val">{{ faNumber.format(product.count) }}</dd>
          </div>
        </dl>
      </section>

      <div
        v-if="zoomOpen"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="product.title"
        @click.self="zoomOpen = false"
      >
        <button type="button" class="lightbox__close" aria-label="بستن تصویر" @click="zoomOpen = false">
          ×
        </button>
        <img :src="product.image" :alt="product.title">
      </div>
    </template>

    <section v-else class="state-card">
      <h1>محصول پیدا نشد</h1>
      <p>این شناسه در فهرست محصولات وجود ندارد.</p>
      <NuxtLink class="state-card__link" to="/">بازگشت به لیست محصولات</NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  color: #6b7897;
  font-size: 13px;
}

.crumbs__home,
.crumbs__link {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
}

.crumbs__home:hover,
.crumbs__link:hover {
  color: var(--color-navy);
}

.crumbs__home svg {
  width: 18px;
  height: 18px;
}

.crumbs__sep {
  width: 14px;
  height: 14px;
  flex: none;
  color: #8c97b2;
}

.crumbs__current {
  max-width: 24ch;
  overflow: hidden;
  color: #6b7897;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.panel {
  padding: 18px 16px;
  border-radius: 22px;
  background: var(--color-surface);
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero__title {
  margin: 0;
  color: var(--color-navy);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
}

.hero__media {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 240px;
  padding: 20px;
  border-radius: 16px;
  background: #f5f7fb;
  overflow: hidden;
}

.hero__media img {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
}

.hero__zoom {
  position: absolute;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: rgba(58, 64, 77, 0.72);
  color: #fff;
  cursor: pointer;
}

.hero__zoom svg {
  width: 20px;
  height: 20px;
}

.specs__title {
  margin: 0 0 14px;
  color: var(--color-navy);
  font-size: 17px;
  font-weight: 700;
}

.specs__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
}

.specs__row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.specs__key,
.specs__val {
  margin: 0;
  padding: 14px 18px;
  border-radius: 14px;
  background: #f5f7fb;
  font-size: 14px;
  line-height: 1.8;
}

.specs__key {
  color: #7b859c;
  font-weight: 500;
}

.specs__val {
  color: #2f3850;
  font-weight: 600;
}

.specs__bullets {
  margin: 0;
  padding-inline-start: 18px;
  font-weight: 500;
}

.specs__bullets li + li {
  margin-top: 4px;
}

.state-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 44px 24px;
  border-radius: 22px;
  background: var(--color-surface);
  text-align: center;
}

.state-card h1 {
  margin: 0;
  color: var(--color-navy);
  font-size: 18px;
}

.state-card p {
  margin: 0;
  color: #7d879c;
  font-size: 14px;
}

.state-card button,
.state-card__link {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: 999px;
  background: var(--color-pink);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(18, 25, 56, 0.72);
}

.lightbox img {
  max-width: min(760px, 100%);
  max-height: 82vh;
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  object-fit: contain;
}

.lightbox__close {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: var(--color-navy);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

@media (min-width: 768px) {
  .detail-page {
    gap: 18px;
  }

  .panel {
    padding: 22px 24px;
  }

  .hero__title {
    font-size: 20px;
  }

  .hero__media {
    min-height: 320px;
    padding: 28px;
  }

  .hero__media img {
    max-height: 300px;
  }

  .specs__row {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    gap: 12px;
  }

  .specs__key {
    display: flex;
    align-items: center;
  }
}

@media (min-width: 1100px) {
  .specs__row {
    grid-template-columns: 180px minmax(0, 1fr);
  }
}
</style>
