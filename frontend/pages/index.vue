<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <CustomSpinner />
    </div>

    <!-- Page content -->
    <div v-else-if="page">
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
      <section v-else-if="page.content" class="py-16 px-6">
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

// Variables réactives
const loading = ref(true)
const page = ref(null)

// Charger la page d'accueil
const loadHomePage = async () => {
  try {
    loading.value = true
    page.value = await getPageBySlugWithSections("home")
  } catch (error) {
    console.error("Erreur lors du chargement de la page d'accueil:", error)
  } finally {
    loading.value = false
  }
}

// Charger au montage
onMounted(() => {
  loadHomePage()
})

// Meta tags
useHead(() => ({
  title: page.value?.title || "Accueil",
  meta: [
    {
      name: "description",
      content: page.value?.meta_description || "Page d'accueil de MyTests",
    },
  ],
}))
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
