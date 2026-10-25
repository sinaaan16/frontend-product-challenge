<script setup lang="ts">
import { findProduct } from '~/data/products'

const route = useRoute()

const productId = computed(() => {
  const value = route.params.id
  return Array.isArray(value) ? value[0] : value
})

const product = computed(() => productId.value ? findProduct(productId.value) : undefined)

useHead({
  title: computed(() => product.value?.title ?? 'محصول پیدا نشد'),
})
</script>

<template>
  <article v-if="product" class="detail">
    <NuxtLink class="detail__back" to="/">بازگشت به لیست محصولات</NuxtLink>
    <h1 class="detail__title">{{ product.title }}</h1>
    <p class="detail__text">{{ product.description }}</p>
  </article>

  <section v-else class="detail">
    <h1 class="detail__title">محصول پیدا نشد</h1>
    <p class="detail__text">این شناسه در فهرست محصولات نیست.</p>
    <NuxtLink class="detail__back" to="/">بازگشت به لیست محصولات</NuxtLink>
  </section>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.detail__back {
  color: var(--color-pink);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.detail__back:hover {
  color: var(--color-pink-dark);
}

.detail__back:focus-visible {
  outline: 2px solid var(--color-pink);
  outline-offset: 3px;
}

.detail__title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
}

.detail__text {
  margin: 0;
  max-width: 42rem;
  font-size: 15px;
  line-height: 1.9;
}

@media (min-width: 768px) {
  .detail {
    gap: 16px;
    padding: 28px;
  }

  .detail__title {
    font-size: 28px;
  }
}

@media (min-width: 1100px) {
  .detail {
    max-width: 760px;
    gap: 18px;
    padding: 36px;
  }

  .detail__title {
    font-size: 32px;
  }
}
</style>
