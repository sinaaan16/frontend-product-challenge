<script setup lang="ts">
defineProps<{
  name: "hex" | "trophy" | "doc" | "phone" | "menu" | "close";
}>();
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'hex'">
      <path d="M8 3.8h8l4.2 4.2v8L16 20.2H8L3.8 16V8L8 3.8z" />
      <path d="M12 8.2 14.6 9.7v3L12 14.2 9.4 12.7v-3L12 8.2z" />
    </template>

    <template v-else-if="name === 'trophy'">
      <path d="M8 4h8v5.2a4 4 0 0 1-8 0V4z" />
      <path d="M8 6.2H5.6A2.4 2.4 0 0 0 8 10" />
      <path d="M16 6.2h2.4A2.4 2.4 0 0 1 16 10" />
      <path d="M12 13.2V16" />
      <path d="M9.2 19.5h5.6" />
      <path d="M10 16.2h4l-.4 3.3h-3.2L10 16.2z" />
    </template>

    <template v-else-if="name === 'doc'">
      <path
        d="M7 3.5h6.8L18.5 8.2V19A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z"
      />
      <path d="M13.5 3.8V8.2H18" />
      <path d="M8.5 12h7" />
      <path d="M8.5 15.2h7" />
      <path d="M8.5 18.2h4.5" />
    </template>

    <template v-else-if="name === 'phone'">
      <path
        d="M8.2 4.2h2.1l1.1 2.8-1.5 1a11.2 11.2 0 0 0 5.1 5.1l1-1.5 2.8 1.1v2.1a1.8 1.8 0 0 1-2 1.8A13.6 13.6 0 0 1 6.4 6.2a1.8 1.8 0 0 1 1.8-2z"
      />
    </template>

    <template v-else-if="name === 'menu'">
      <path d="M5.5 7.5h13" />
      <path d="M5.5 12h13" />
      <path d="M5.5 16.5h13" />
    </template>

    <template v-else-if="name === 'close'">
      <path d="M7 7l10 10" />
      <path d="M17 7 7 17" />
    </template>
  </svg>
</template>

<style scoped>
.icon {
  width: 22px;
  height: 22px;
  flex: none;
}
</style>
