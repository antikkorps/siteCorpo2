<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Navigation -->
    <NavbarMain />

    <!-- Page Content -->
    <main>
      <slot />
    </main>

    <!-- Floating Admin Button (only on home page) -->
    <div v-if="$route.path === '/'" class="fixed bottom-6 right-6 z-50">
      <Button
        v-tooltip.top="'Accéder à l\'admin Directus'"
        severity="secondary"
        size="large"
        rounded
        class="shadow-lg hover:shadow-xl transition-all duration-300"
        @click="goToAdmin"
      >
        <template #icon>
          <AppIcon name="heroicons:cog-6-tooth" size="xl" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
// Fonctions
const goToAdmin = () => {
  window.open("http://localhost:8055/admin", "_blank")
}
</script>
