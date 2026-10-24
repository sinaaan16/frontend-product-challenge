<template>
  <div class="frame">
    <AppHeader />
    <main class="frame__main">
      <div class="shell">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.frame {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.frame__main {
  flex: 1;
  padding-block: 8px 40px;
}

@media (min-width: 768px) {
  .frame__main {
    padding-block: 12px 56px;
  }
}

@media (min-width: 1100px) {
  .frame__main {
    padding-block: 20px 72px;
  }
}
</style>
