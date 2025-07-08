<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <CustomSpinner />
    </div>

    <!-- Page content -->
    <div v-else-if="page">
      <!-- Hero section -->
      <section class="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ page.title }}</h1>
          <p v-if="page.meta_description" class="text-xl text-blue-100 max-w-2xl mx-auto">
            {{ page.meta_description }}
          </p>
        </div>
      </section>

      <!-- Page sections -->
      <PageSections
        v-if="page.sections && page.sections.length > 0"
        :sections="page.sections"
        :default-animation="{
          type: 'fadeIn',
          direction: 'up',
          duration: 0.8,
          delay: 0.2,
        }"
      />

      <!-- Fallback content -->
      <section v-else class="py-16 px-6">
        <div class="container mx-auto max-w-4xl">
          <div class="prose prose-lg max-w-none" v-html="page.content" />
        </div>
      </section>
    </div>

    <!-- Error -->
    <div v-else class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-slate-800 mb-4">Page non trouvée</h1>
        <p class="text-slate-600 mb-6">La page que vous recherchez n'existe pas.</p>
        <Button label="Retour à l'accueil" @click="navigateTo('/')" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { getPageBySlugWithSections } = useDirectus()

// Route
const route = useRoute()
const slug = route.params.slug

// Variables réactives
const loading = ref(true)
const page = ref(null)

// Charger la page
const loadPage = async () => {
  try {
    loading.value = true
    page.value = await getPageBySlugWithSections(slug)
  } catch (error) {
    console.error("Erreur lors du chargement de la page:", error)
  } finally {
    loading.value = false
  }
}

// Charger au montage
onMounted(() => {
  loadPage()
})

// Meta tags
useHead(() => ({
  title: page.value?.title || "Page",
  meta: [
    {
      name: "description",
      content: page.value?.meta_description || "",
    },
  ],
}))
</script>
