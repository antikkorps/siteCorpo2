<template>
  <header
    class="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50"
  >
    <div class="container mx-auto">
      <div class="flex items-center justify-between py-3">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <div v-if="config?.logo" class="flex items-center">
              <img
                :src="getImageUrl(config.logo)"
                :alt="config.site_title || 'Logo'"
                class="h-20 w-auto"
                loading="eager"
              />
            </div>
            <div
              v-else
              class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <AppIcon name="heroicons:code-bracket" size="lg" class="text-white" />
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink
            to="/"
            class="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            :class="{ 'text-blue-600 font-semibold': $route.path === '/' }"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
            to="/articles"
            class="text-slate-600 hover:text-blue-600 transition-colors font-medium"
            :class="{
              'text-blue-600 font-semibold': $route.path.startsWith('/articles'),
            }"
          >
            Articles
          </NuxtLink>
          <Button
            v-if="isInitialized && isAuthenticated"
            label="Admin"
            severity="secondary"
            size="small"
            @click="goToAdmin"
          >
            <template #icon>
              <AppIcon name="heroicons:cog-6-tooth" size="sm" />
            </template>
          </Button>
        </nav>

        <!-- Menu Mobile Button -->
        <button
          class="md:hidden relative z-[10000] p-2 pr-4 rounded-lg hover:bg-slate-100 transition-colors"
          :class="{ 'bg-slate-100': showMobileMenu }"
          @click="showMobileMenu = !showMobileMenu"
        >
          <div class="w-6 h-6 flex flex-col justify-center items-center">
            <span
              class="block w-5 h-0.5 bg-slate-600 transition-all duration-300"
              :class="{ 'rotate-45 translate-y-1': showMobileMenu }"
            />
            <span
              class="block w-5 h-0.5 bg-slate-600 transition-all duration-300 mt-1"
              :class="{ 'opacity-0': showMobileMenu }"
            />
            <span
              class="block w-5 h-0.5 bg-slate-600 transition-all duration-300 mt-1"
              :class="{ '-rotate-45 -translate-y-1': showMobileMenu }"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
        @click="showMobileMenu = false"
      />
    </Transition>

    <!-- Mobile Menu Content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="showMobileMenu"
        class="fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl z-[9999] md:hidden"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="p-8 border-b border-slate-200">
            <div class="flex items-center space-x-3">
              <div v-if="config?.logo" class="flex items-center">
                <img
                  :src="getImageUrl(config.logo)"
                  :alt="config.site_title || 'Logo'"
                  class="h-15 w-auto"
                  loading="eager"
                />
              </div>
              <div
                v-else
                class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <AppIcon name="heroicons:code-bracket" size="sm" class="text-white" />
              </div>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="flex-1 p-6 space-y-6">
            <NuxtLink
              to="/"
              class="flex items-center space-x-3 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
              :class="{ 'bg-blue-50 text-blue-600': $route.path === '/' }"
              @click="showMobileMenu = false"
            >
              <AppIcon
                name="heroicons:home"
                size="lg"
                class="text-slate-400 group-hover:text-blue-600 transition-colors"
                :class="{ 'text-blue-600': $route.path === '/' }"
              />
              <span class="text-lg font-medium">Accueil</span>
            </NuxtLink>

            <NuxtLink
              to="/articles"
              class="flex items-center space-x-3 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
              :class="{ 'bg-blue-50 text-blue-600': $route.path.startsWith('/articles') }"
              @click="showMobileMenu = false"
            >
              <AppIcon
                name="heroicons:newspaper"
                size="lg"
                class="text-slate-400 group-hover:text-blue-600 transition-colors"
                :class="{ 'text-blue-600': $route.path.startsWith('/articles') }"
              />
              <span class="text-lg font-medium">Articles</span>
            </NuxtLink>
          </nav>

          <!-- Footer -->
          <div
            v-if="isInitialized && isAuthenticated"
            class="p-6 border-t border-slate-200"
          >
            <Button
              label="Admin Directus"
              severity="secondary"
              class="w-full"
              @click="goToAdmin"
            >
              <template #icon>
                <AppIcon name="heroicons:cog-6-tooth" size="sm" />
              </template>
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Loading Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loading"
      class="fixed inset-0 bg-white z-[99999] flex items-center justify-center"
    >
      <div class="text-center">
        <CustomSpinner />
        <p class="mt-4 text-slate-600 font-medium">Chargement...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
// Composables
const { getSettings, getImageUrl } = useDirectus()
const { isAuthenticated, isInitialized, checkAuth } = useAuth()

// Variables réactives
const showMobileMenu = ref(false)
const config = ref(null)
const loading = ref(true)

// Initialiser l'authentification
onMounted(() => {
  checkAuth()
})

// Gestion du scroll quand le menu mobile est ouvert
watch(showMobileMenu, (isOpen) => {
  if (isOpen) {
    // Sauvegarder la position actuelle du scroll
    const scrollY = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"
    document.body.style.overflow = "hidden"
  } else {
    // Restaurer la position du scroll
    const scrollY = document.body.style.top
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""
    document.body.style.overflow = ""
    window.scrollTo(0, parseInt(scrollY || "0") * -1)
  }
})

// Fonctions
const goToAdmin = () => {
  window.open("http://localhost:8055/admin", "_blank")
}

// Charger la configuration du site
const loadConfig = async () => {
  try {
    loading.value = true
    config.value = await getSettings()
    console.log("✅ Configuration chargée:", config.value)
  } catch (error) {
    console.warn("⚠️ Erreur lors du chargement de la configuration:", error)
    // Fallback pour éviter que le composant ne s'affiche pas
    config.value = {
      site_title: "Mon Institution",
      logo: null,
    }
  } finally {
    loading.value = false
  }
}

// Charger au montage
onMounted(() => {
  loadConfig()
})

// Gestion de la touche Escape pour fermer le menu
onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === "Escape" && showMobileMenu.value) {
      showMobileMenu.value = false
    }
  }

  document.addEventListener("keydown", handleEscape)

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape)
  })
})
</script>
