export const useAuth = () => {
  // État de l'authentification
  const isAuthenticated = ref(false)
  const user = ref(null)
  const isAdmin = ref(false)

  // Vérifier si l'utilisateur est connecté (simulation pour l'instant)
  const checkAuth = () => {
    // Pour l'instant, on simule un admin connecté
    // En production, on vérifierait les cookies/session
    isAuthenticated.value = true
    user.value = { id: 1, email: "admin@example.com", role: "admin" }
    isAdmin.value = true
  }

  // Vérifier les permissions pour un article
  const canViewArticle = (article) => {
    console.log("Vérification des permissions pour l'article:", article.title)
    console.log("Statut de l'article:", article.status)
    console.log("isAdmin.value:", isAdmin.value)

    // Si l'article est publié, tout le monde peut le voir
    if (article.status === "published") {
      console.log("Article publié - accès autorisé")
      return true
    }

    // Si l'article est en brouillon, seul l'admin peut le voir
    if (article.status === "draft") {
      console.log("Article en brouillon - vérification admin:", isAdmin.value)
      return isAdmin.value
    }

    console.log("Statut inconnu - accès refusé")
    return false
  }

  // Vérifier si l'utilisateur peut modifier un article
  const canEditArticle = () => {
    return isAdmin.value
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    isAdmin: computed(() => isAdmin.value),
    checkAuth,
    canViewArticle,
    canEditArticle,
  }
}
