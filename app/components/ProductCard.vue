<script setup lang="ts">
import type { Product } from "~/data/products";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <article class="card">
    <img class="card__image" :src="product.image" :alt="product.title" loading="lazy" />
    <h2 class="card__title">{{ product.title }}</h2>
    <NuxtLink class="card__action" :to="`/products/${product.id}`">
      <span>مشاهده جزئیات</span>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M10 3.5 5.5 8 10 12.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </NuxtLink>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  height: 100%;
  padding: 12px 12px 16px;
  border-radius: 22px;
  background: var(--color-surface);
}

.card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 14px;
  object-fit: contain;
  border-radius: 16px;
  background: #f6f8fd;
}

.card__title {
  display: -webkit-box;
  min-height: 2.9em;
  margin: 0;
  overflow: hidden;
  color: var(--color-navy);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.7;
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card__action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  min-height: 42px;
  margin-top: auto;
  border: 1.5px solid #f3b4cc;
  border-radius: 999px;
  color: var(--color-pink);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.card__action svg {
  width: 16px;
  height: 16px;
}

.card__action:hover {
  border-color: var(--color-pink);
  background: #fff5f9;
}

.card__action:focus-visible {
  outline: 2px solid var(--color-pink);
  outline-offset: 3px;
}
</style>
