<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-6">
      <div class="container mx-auto text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            <span
              class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              CMS Moderne
            </span>
            <br />
            <span class="text-slate-700">avec Directus</span>
          </h1>
          <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Une solution complète et moderne pour gérer votre contenu. Interface élégante,
            API puissante, base de données SQLite.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="Voir les articles"
              icon="pi pi-file-edit"
              size="large"
              class="text-lg px-8 py-3"
              @click="goToArticles"
            />
            <Button
              label="Accéder au CMS"
              icon="pi pi-cog"
              severity="secondary"
              size="large"
              class="text-lg px-8 py-3"
              @click="goToAdmin"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-6 bg-white">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-slate-800 mb-4">
            Pourquoi choisir cette solution ?
          </h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto">
            Une architecture moderne qui combine le meilleur des deux mondes
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <Card
            class="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <template #header>
              <div
                class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <i class="pi pi-bolt text-white text-2xl" />
              </div>
            </template>
            <template #content>
              <h3 class="text-xl font-semibold text-slate-800 mb-3">Performance</h3>
              <p class="text-slate-600">
                SQLite intégré, aucune installation de base de données requise. Démarrage
                rapide et développement fluide.
              </p>
            </template>
          </Card>

          <Card
            class="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <template #header>
              <div
                class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <i class="pi pi-palette text-white text-2xl" />
              </div>
            </template>
            <template #content>
              <h3 class="text-xl font-semibold text-slate-800 mb-3">Interface Moderne</h3>
              <p class="text-slate-600">
                PrimeVue + Tailwind CSS pour une interface élégante et responsive.
                Composants réactifs et animations fluides.
              </p>
            </template>
          </Card>

          <Card
            class="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <template #header>
              <div
                class="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <i class="pi pi-code text-white text-2xl" />
              </div>
            </template>
            <template #content>
              <h3 class="text-xl font-semibold text-slate-800 mb-3">API Simple</h3>
              <p class="text-slate-600">
                Directus fournit une API REST/GraphQL complète. Intégration facile avec
                Nuxt 3 et tous vos projets.
              </p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="text-white">
            <div class="text-4xl font-bold mb-2">{{ stats.articles }}</div>
            <div class="text-blue-100">Articles</div>
          </div>
          <div class="text-white">
            <div class="text-4xl font-bold mb-2">{{ stats.pages }}</div>
            <div class="text-blue-100">Pages</div>
          </div>
          <div class="text-white">
            <div class="text-4xl font-bold mb-2">{{ stats.users }}</div>
            <div class="text-blue-100">Utilisateurs</div>
          </div>
          <div class="text-white">
            <div class="text-4xl font-bold mb-2">{{ stats.uptime }}</div>
            <div class="text-blue-100">% Uptime</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Articles Section -->
    <section class="py-20 px-6 bg-slate-50">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-slate-800 mb-4">Articles récents</h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez nos derniers articles créés avec Directus
          </p>
        </div>

        <div v-if="loading" class="flex justify-center">
          <ProgressSpinner />
        </div>

        <div
          v-else-if="recentArticles.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <Card
            v-for="article in recentArticles"
            :key="article.id"
            class="h-full hover:shadow-lg transition-shadow"
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
              </div>
            </template>
            <template #content>
              <h3 class="text-xl font-semibold text-slate-800 mb-3 line-clamp-2">
                {{ article.title }}
              </h3>
              <p class="text-slate-600 mb-4 line-clamp-3">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between">
                <Tag
                  v-if="article.category"
                  :value="getCategoryLabel(article.category)"
                  severity="info"
                />
                <span class="text-sm text-slate-500">
                  {{ formatDate(article.date_created) }}
                </span>
              </div>
            </template>
            <template #footer>
              <Button
                label="Lire l'article"
                icon="pi pi-eye"
                text
                class="w-full"
                @click="viewArticle(article)"
              />
            </template>
          </Card>
        </div>

        <div v-else class="text-center py-12">
          <i class="pi pi-file-edit text-6xl text-slate-300 mb-4" />
          <h3 class="text-xl font-semibold text-slate-600 mb-2">
            Aucun article pour le moment
          </h3>
          <p class="text-slate-500 mb-4">
            Créez votre premier article depuis l'interface d'administration Directus.
          </p>
          <Button
            label="Accéder à l'admin"
            icon="pi pi-external-link"
            @click="goToAdmin"
          />
        </div>

        <div v-if="recentArticles.length > 0" class="text-center mt-12">
          <Button
            label="Voir tous les articles"
            icon="pi pi-arrow-right"
            severity="secondary"
            class="text-lg px-8 py-3"
            @click="goToArticles"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-800 text-white py-12 px-6">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <i class="pi pi-code text-white" />
              </div>
              <h3 class="text-xl font-bold">MyTests</h3>
            </div>
            <p class="text-slate-300">
              Une solution CMS moderne avec Directus et Nuxt 3.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Navigation</h4>
            <ul class="space-y-2 text-slate-300">
              <li>
                <NuxtLink to="/" class="hover:text-white transition-colors"
                  >Accueil</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/articles" class="hover:text-white transition-colors"
                  >Articles</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Technologies</h4>
            <ul class="space-y-2 text-slate-300">
              <li>Directus CMS</li>
              <li>Nuxt 3</li>
              <li>PrimeVue</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Admin</h4>
            <Button
              label="Accéder à Directus"
              icon="pi pi-external-link"
              severity="secondary"
              size="small"
              @click="goToAdmin"
            />
          </div>
        </div>
        <div class="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 MyTests. Construit avec Directus et Nuxt 3.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Composables
const { getArticles, getImageUrl } = useDirectus()

// Variables réactives
const loading = ref(false)
const recentArticles = ref([])

// Stats simulées
const stats = ref({
  articles: 12,
  pages: 5,
  users: 3,
  uptime: 99.9,
})

// Catégories
const categories = {
  news: "Actualités",
  tutorials: "Tutoriels",
  events: "Événements",
}

// Navigation
const router = useRouter()

const goToArticles = () => {
  router.push("/articles")
}

const goToAdmin = () => {
  window.open("http://localhost:8055/admin", "_blank")
}

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
  navigateTo(`/articles/${article.id}`)
}

// Charger les articles récents
const loadRecentArticles = async () => {
  try {
    loading.value = true
    const data = await getArticles()
    recentArticles.value = data.slice(0, 6) // Limiter à 6 articles
  } catch (error) {
    console.error("Erreur lors du chargement des articles:", error)
  } finally {
    loading.value = false
  }
}

// Charger les données au montage
onMounted(() => {
  loadRecentArticles()
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
