<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <ProgressSpinner />
        <p class="mt-4 text-slate-600">Chargement de l'article...</p>
      </div>
    </div>

    <!-- Article Content -->
    <div v-else-if="article" class="py-12 px-6">
      <div class="container mx-auto max-w-4xl">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-slate-500">
            <li>
              <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
                >Accueil</NuxtLink
              >
            </li>
            <li><i class="pi pi-chevron-right" /></li>
            <li>
              <NuxtLink to="/articles" class="hover:text-blue-600 transition-colors"
                >Articles</NuxtLink
              >
            </li>
            <li><i class="pi pi-chevron-right" /></li>
            <li class="text-slate-700 font-medium">{{ article.title }}</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <!-- Illustration -->
          <div v-if="article.illustration" class="w-full h-64 md:h-96 relative">
            <img
              :src="getImageUrl(article.illustration.id || article.illustration)"
              :alt="article.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div class="p-8">
            <div class="flex items-center gap-4 mb-6">
              <Tag
                :value="article.status === 'published' ? 'Publié' : 'Brouillon'"
                :severity="article.status === 'published' ? 'success' : 'warning'"
              />
              <Tag
                v-if="article.category"
                :value="getCategoryLabel(article.category)"
                severity="info"
              />
            </div>

            <h1 class="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              {{ article.title }}
            </h1>

            <div
              v-if="article.excerpt"
              class="text-xl text-slate-600 mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
            >
              {{ article.excerpt }}
            </div>

            <div
              class="flex items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-6"
            >
              <div class="flex items-center space-x-4">
                <span>
                  <i class="pi pi-calendar mr-1" />
                  Créé le {{ formatDate(article.date_created) }}
                </span>
                <span
                  v-if="
                    article.date_updated && article.date_updated !== article.date_created
                  "
                >
                  <i class="pi pi-clock mr-1" />
                  Modifié le {{ formatDate(article.date_updated) }}
                </span>
              </div>
              <Button
                label="Modifier"
                icon="pi pi-pencil"
                severity="secondary"
                size="small"
                @click="editArticle"
              />
            </div>
          </div>
        </div>

        <!-- Article Content -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div
            v-if="article.content"
            class="article-content"
            v-html="sanitizeHtml(article.content)"
          />
          <div v-else class="text-center py-12 text-slate-500">
            <i class="pi pi-file-edit text-4xl mb-4" />
            <p>Aucun contenu disponible pour cet article.</p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between items-center mt-8">
          <Button
            label="← Retour aux articles"
            icon="pi pi-arrow-left"
            severity="secondary"
            @click="$router.push('/articles')"
          />
          <Button
            label="Modifier dans l'admin"
            icon="pi pi-external-link"
            @click="editArticle"
          />
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <i class="pi pi-exclamation-triangle text-6xl text-slate-300 mb-4" />
        <h2 class="text-2xl font-semibold text-slate-600 mb-2">Article non trouvé</h2>
        <p class="text-slate-500 mb-6">
          L'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button
          label="Retour aux articles"
          icon="pi pi-arrow-left"
          @click="$router.push('/articles')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DOMPurify from "dompurify"

// Métadonnées de la page
definePageMeta({
  validate: async (route) => {
    return typeof route.params.id === "string" && route.params.id.length > 0
  },
})

// Route params
const route = useRoute()
const articleId = route.params.id

// Variables réactives
const loading = ref(false)
const article = ref(null)

// Catégories
const categories = {
  news: "Actualités",
  tutorials: "Tutoriels",
  events: "Événements",
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

const sanitizeHtml = (html) => DOMPurify.sanitize(html)

const editArticle = () => {
  if (article.value) {
    window.open(
      `http://localhost:8055/admin/content/articles/${article.value.id}`,
      "_blank"
    )
  }
}

// Composables
const { getArticles, getImageUrl } = useDirectus()

// Charger l'article
const loadArticle = async () => {
  try {
    loading.value = true
    const { canViewArticle, checkAuth } = useAuth()

    // Initialiser l'authentification
    checkAuth()

    const articles = await getArticles()
    const foundArticle = articles.find(
      (a) => a.id == parseInt(articleId) || a.id == articleId
    )

    if (foundArticle) {
      // Vérifier les permissions
      if (!canViewArticle(foundArticle)) {
        if (foundArticle.status === "draft") {
          // Rediriger vers la page articles avec un message
          await navigateTo("/articles?error=draft_access_denied")
          return
        }
      }
      article.value = foundArticle
    } else {
      article.value = null
    }
  } catch (error) {
    console.error("Erreur lors du chargement de l'article:", error)
    article.value = null
  } finally {
    loading.value = false
  }
}

// Charger les données au montage
onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-content {
  line-height: 1.7;
  font-size: 1.1rem;
}

.article-content h1,
.article-content h2,
.article-content h3 {
  color: #1e293b;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.article-content h1 {
  font-size: 2rem;
}

.article-content h2 {
  font-size: 1.5rem;
}

.article-content h3 {
  font-size: 1.25rem;
}

.article-content p {
  margin-bottom: 1em;
  color: #475569;
}

.article-content ul,
.article-content ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
  color: #475569;
}

.article-content blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
  color: #64748b;
  background-color: #f8fafc;
  padding: 1em;
  border-radius: 0.375rem;
}

.article-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1em 0;
}

.article-content a {
  color: #3b82f6;
  text-decoration: underline;
}

.article-content a:hover {
  color: #2563eb;
}
</style>
