<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <header
      class="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50"
    >
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <AppIcon name="pi-code" size="lg" class="text-white" />
            </div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              MyTests
            </h1>
          </div>
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-slate-600 hover:text-blue-600 transition-colors"
              >Accueil</NuxtLink
            >
            <NuxtLink to="/articles" class="text-blue-600 font-semibold"
              >Articles</NuxtLink
            >
            <Button label="Admin" severity="secondary" size="small" @click="goToAdmin">
              <template #icon>
                <AppIcon name="pi-cog" size="sm" />
              </template>
            </Button>
          </nav>
          <Button
            severity="secondary"
            text
            class="md:hidden"
            @click="showMobileMenu = !showMobileMenu"
          >
            <template #icon>
              <AppIcon name="pi-bars" size="lg" />
            </template>
          </Button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="md:hidden bg-white border-b border-slate-200">
      <div class="container mx-auto px-6 py-4 space-y-3">
        <NuxtLink
          to="/"
          class="block text-slate-600 hover:text-blue-600 transition-colors"
          >Accueil</NuxtLink
        >
        <NuxtLink to="/articles" class="block text-blue-600 font-semibold"
          >Articles</NuxtLink
        >
        <Button
          label="Admin Directus"
          severity="secondary"
          size="small"
          @click="goToAdmin"
        >
          <template #icon>
            <AppIcon name="pi-cog" size="sm" />
          </template>
        </Button>
      </div>
    </div>

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
          <AppIcon name="pi-cog" size="xl" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
// Variables réactives
const showMobileMenu = ref(false)

// Fonctions
const goToAdmin = () => {
  window.open("http://localhost:8055/admin", "_blank")
}
</script>
