<script setup lang="ts">
defineProps<{
  name: "telegram" | "instagram" | "linkedin" | "twitter" | "youtube";
}>();
</script>

<template>
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
    <template v-if="name === 'telegram'">
      <path
        fill="currentColor"
        d="M21.4 4.6 3.7 11.2c-.8.3-.8 1.4.1 1.6l4.5 1.4 1.7 5.3c.3.8 1.3 1 1.8.3l2.5-2.5 4.6 3.4c.7.5 1.6.1 1.8-.7l2.6-12.2c.2-1-.7-1.8-1.6-1.4zM9.2 13.7l8.3-5.2c.2-.1.4.2.2.4l-6.9 6.3-.3 3.2-1.3-4.7z"
      />
    </template>

    <template v-else-if="name === 'instagram'">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="3.4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
      />
      <circle cx="16.6" cy="7.5" r="0.9" fill="currentColor" />
    </template>

    <template v-else-if="name === 'linkedin'">
      <path
        fill="currentColor"
        d="M6.7 9.4H4.2V19h2.5V9.4zM5.4 4.8c-.8 0-1.5.7-1.5 1.5S4.6 7.8 5.4 7.8 6.9 7.1 6.9 6.3 6.2 4.8 5.4 4.8zM19.8 13.3c0-2.6-1.4-3.8-3.2-3.8-1.5 0-2.2.8-2.6 1.4V9.4H11.5c0 1.3 0 9.6 0 9.6h2.5v-5.4c0-.3 0-.6.1-.8.3-.6.9-1.3 1.9-1.3 1.3 0 1.9 1 1.9 2.5V19h2.5v-5.7z"
      />
    </template>

    <template v-else-if="name === 'twitter'">
      <path
        fill="currentColor"
        d="M16.8 4.5h2.4l-5.2 6 6.1 8h-4.8l-3.8-4.9-4.3 4.9H5l5.6-6.4L4.8 4.5h4.9l3.4 4.5 3.7-4.5zm-.8 12.6h1.3L8.1 5.8H6.7l9.3 11.3z"
      />
    </template>

    <template v-else-if="name === 'youtube'">
      <path
        fill="currentColor"
        d="M21.2 8.2a2.5 2.5 0 0 0-1.8-1.8C17.7 6 12 6 12 6s-5.7 0-7.4.4a2.5 2.5 0 0 0-1.8 1.8C2.4 9.9 2.4 12 2.4 12s0 2.1.4 3.8a2.5 2.5 0 0 0 1.8 1.8C6.3 18 12 18 12 18s5.7 0 7.4-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8zM10.2 14.8V9.2L15.2 12l-5 2.8z"
      />
    </template>
  </svg>
</template>

<style scoped>
.icon {
  width: 18px;
  height: 18px;
  display: block;
}
</style>
