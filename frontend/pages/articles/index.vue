<template>
  <div>
    <!-- Page Header -->
    <section class="py-16 px-6 bg-white">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-800 mb-4">📰 Articles</h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto">
          Découvrez tous nos articles créés avec Directus
        </p>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="py-8 px-6 bg-slate-50 border-b border-slate-200">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-slate-700">Catégorie:</label>
              <Dropdown
                v-model="selectedCategory"
                :options="categoryOptions"
                option-label="label"
                option-value="value"
                placeholder="Toutes les catégories"
                class="w-48"
              />
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-slate-700">Statut:</label>
              <Dropdown
                v-model="selectedStatus"
                :options="statusOptions"
                option-label="label"
                option-value="value"
                placeholder="Tous les statuts"
                class="w-40"
              />
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="pi pi-search" />
            <InputText
              v-model="searchQuery"
              placeholder="Rechercher un article..."
              class="w-64"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="py-12 px-6">
      <div class="container mx-auto">
        <!-- Indicateur de chargement -->
        <div v-if="loading" class="flex justify-center py-12">
          <ProgressSpinner />
        </div>

        <!-- Articles -->
        <div
          v-else-if="filteredArticles.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <Card
            v-for="article in filteredArticles"
            :key="article.id"
            class="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <template #header>
              <div class="relative">
                <div
                  v-if="article.illustration"
                  class="w-full h-48 rounded-t-lg overflow-hidden"
                >
                  <img
                    :src="getImageUrl(article.illustration)"
                    :alt="article.title"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div
                  v-else
                  class="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center"
                >
                  <i class="pi pi-file-edit text-4xl text-blue-600" />
                </div>
                <Tag
                  :value="article.status === 'published' ? 'Publié' : 'Brouillon'"
                  :severity="article.status === 'published' ? 'success' : 'warning'"
                  class="absolute top-4 right-4"
                />
                <div class="absolute bottom-4 left-4">
                  <Tag
                    v-if="article.category"
                    :value="getCategoryLabel(article.category)"
                    severity="info"
                  />
                </div>
              </div>
            </template>
            <template #content>
              <h3
                class="text-xl font-semibold text-slate-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                @click="viewArticle(article)"
              >
                {{ article.title }}
              </h3>
              <p class="text-slate-600 mb-4 line-clamp-3">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between text-sm text-slate-500">
                <span>
                  <i class="pi pi-calendar mr-1" />
                  {{ formatDate(article.date_created) }}
                </span>
                <span
                  v-if="
                    article.date_updated && article.date_updated !== article.date_created
                  "
                >
                  <i class="pi pi-clock mr-1" />
                  Modifié {{ formatDate(article.date_updated) }}
                </span>
              </div>
            </template>
            <template #footer>
              <div class="flex gap-2">
                <Button
                  :label="article.status === 'draft' ? 'Aperçu' : 'Lire'"
                  :icon="article.status === 'draft' ? 'pi pi-eye-slash' : 'pi pi-eye'"
                  :severity="article.status === 'draft' ? 'warning' : 'primary'"
                  size="small"
                  class="flex-1"
                  @click="viewArticle(article)"
                />
                <Button
                  label="Modifier"
                  icon="pi pi-pencil"
                  severity="secondary"
                  size="small"
                  @click="editArticle(article)"
                />
              </div>
            </template>
          </Card>
        </div>

        <!-- Message si aucun article -->
        <div v-else class="text-center py-16">
          <div class="max-w-md mx-auto">
            <i class="pi pi-file-edit text-6xl text-slate-300 mb-6" />
            <h3 class="text-2xl font-semibold text-slate-600 mb-4">
              Aucun article trouvé
            </h3>
            <p class="text-slate-500 mb-6">
              {{
                searchQuery || selectedCategory || selectedStatus
                  ? "Aucun article ne correspond à vos critères."
                  : "Créez votre premier article depuis l'interface d'administration Directus."
              }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                label="Accéder à l'admin"
                icon="pi pi-external-link"
                @click="goToAdmin"
              />
              <Button
                v-if="searchQuery || selectedCategory || selectedStatus"
                label="Effacer les filtres"
                icon="pi pi-times"
                severity="secondary"
                @click="clearFilters"
              />
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredArticles.length > 0" class="flex justify-center mt-12">
          <Paginator
            v-model:first="first"
            :rows="rows"
            :total-records="filteredArticles.length"
            :rows-per-page-options="[6, 12, 24]"
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          />
        </div>
      </div>
    </section>

    <!-- Error Dialog -->
    <Dialog
      v-model:visible="showErrorDialog"
      header="Accès refusé"
      modal
      class="w-full max-w-md"
    >
      <div class="flex items-center space-x-3">
        <i class="pi pi-exclamation-triangle text-2xl text-red-500" />
        <p class="text-slate-700">{{ errorMessage }}</p>
      </div>
      <template #footer>
        <Button label="Fermer" @click="showErrorDialog = false" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
// Composables
const { getArticles, getImageUrl } = useDirectus()
const { canEditArticle } = useAuth()

// Variables réactives
const loading = ref(false)
const articles = ref([])
const searchQuery = ref("")
const selectedCategory = ref(null)
const selectedStatus = ref(null)
const first = ref(0)
const rows = ref(12)
const showErrorDialog = ref(false)
const errorMessage = ref("")

// Catégories
const categories = {
  news: "Actualités",
  tutorials: "Tutoriels",
  events: "Événements",
}

// Options pour les filtres
const categoryOptions = [
  { label: "Toutes les catégories", value: null },
  { label: "Actualités", value: "news" },
  { label: "Tutoriels", value: "tutorials" },
  { label: "Événements", value: "events" },
]

const statusOptions = [
  { label: "Tous les statuts", value: null },
  { label: "Publié", value: "published" },
  { label: "Brouillon", value: "draft" },
]

// Computed properties
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (article) =>
        article.title?.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query)
    )
  }

  // Filtre par catégorie
  if (selectedCategory.value) {
    filtered = filtered.filter((article) => article.category === selectedCategory.value)
  }

  // Filtre par statut
  if (selectedStatus.value) {
    filtered = filtered.filter((article) => article.status === selectedStatus.value)
  }

  return filtered
})

// Fonctions
const getCategoryLabel = (category) => {
  return categories[category] || category
}

const formatDate = (dateString) => {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const viewArticle = (article) => {
  console.log("Tentative de lecture de l'article:", article)
  console.log("Statut de l'article:", article.status)

  // Test direct de navigation sans vérification de permissions
  console.log("Navigation directe vers:", `/articles/${article.id}`)

  // Test avec window.location pour voir si le problème vient de navigateTo
  window.location.href = `/articles/${article.id}`
}

const editArticle = (article) => {
  // Vérifier les permissions
  if (!canEditArticle()) {
    errorMessage.value = "Seuls les administrateurs peuvent modifier les articles."
    showErrorDialog.value = true
    return
  }

  window.open(`http://localhost:8055/admin/content/articles/${article.id}`, "_blank")
}

const goToAdmin = () => {
  window.open("http://localhost:8055/admin", "_blank")
}

const clearFilters = () => {
  searchQuery.value = ""
  selectedCategory.value = null
  selectedStatus.value = null
}

// Charger les articles
const loadArticles = async () => {
  try {
    loading.value = true
    const data = await getArticles()
    articles.value = data
  } catch (error) {
    console.error("Erreur lors du chargement des articles:", error)
  } finally {
    loading.value = false
  }
}

// Charger les données au montage
onMounted(() => {
  loadArticles()

  // Vérifier s'il y a un message d'erreur dans l'URL
  const route = useRoute()
  if (route.query.error === "draft_access_denied") {
    showErrorDialog.value = true
    errorMessage.value =
      "Accès refusé : Cet article est en brouillon. Seuls les administrateurs peuvent le consulter."
    // Nettoyer l'URL
    navigateTo("/articles", { replace: true })
  }
})
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
