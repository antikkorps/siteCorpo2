export const useAuth = () => {
  // État de l'authentification global (partagé entre tous les composants)
  const isAuthenticated = useState("auth:isAuthenticated", () => false)
  const user = useState("auth:user", () => null)
  const isAdmin = useState("auth:isAdmin", () => false)
  const isInitialized = useState("auth:isInitialized", () => false)

  // Vérifier si l'utilisateur est connecté
  const checkAuth = () => {
    // Vérifier si on est en mode développement
    if (import.meta.dev) {
      // En développement, on simule un admin connecté
      // Vous pouvez changer cette valeur pour tester différents états
      const devMode = true // Mettre à false pour simuler un utilisateur non connecté

      if (devMode) {
        isAuthenticated.value = true
        user.value = { id: 1, email: "admin@example.com", role: "admin" }
        isAdmin.value = true
        console.log("🔐 Mode développement : Admin connecté")
      } else {
        isAuthenticated.value = false
        user.value = null
        isAdmin.value = false
        console.log("🔐 Mode développement : Utilisateur non connecté")
      }
    } else {
      // En production, on vérifierait les cookies/session
      // TODO: Implémenter la vraie vérification d'authentification
      console.log("🔐 Mode production : Vérification d'authentification")
    }

    isInitialized.value = true
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

  // Fonctions pour le développement
  const login = () => {
    if (import.meta.dev) {
      isAuthenticated.value = true
      user.value = { id: 1, email: "admin@example.com", role: "admin" }
      isAdmin.value = true
      console.log("🔐 Connexion simulée")
    }
  }

  const logout = () => {
    if (import.meta.dev) {
      isAuthenticated.value = false
      user.value = null
      isAdmin.value = false
      console.log("🔐 Déconnexion simulée")
    }
  }

  return {
    isAuthenticated,
    user,
    isAdmin,
    isInitialized,
    checkAuth,
    canViewArticle,
    canEditArticle,
    login,
    logout,
  }
}
