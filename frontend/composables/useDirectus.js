export const useDirectus = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.directusUrl || "http://localhost:8055"

  // Fonction pour récupérer les articles
  const getArticles = async () => {
    try {
      const response = await $fetch(`${baseURL}/items/articles?fields=*,illustration.*`)
      return response.data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error)
      return []
    }
  }

  // Fonction pour récupérer les pages
  const getPages = async () => {
    try {
      const response = await $fetch(`${baseURL}/items/pages`)
      return response.data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des pages:", error)
      return []
    }
  }

  // Fonction pour récupérer les utilisateurs
  const getUsers = async () => {
    try {
      const response = await $fetch(`${baseURL}/users`)
      return response.data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error)
      return []
    }
  }

  // Fonction pour créer un article
  const createArticle = async (articleData) => {
    try {
      const response = await $fetch(`${baseURL}/items/articles`, {
        method: "POST",
        body: articleData,
      })
      return response
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error)
      throw error
    }
  }

  // Fonction pour créer une page
  const createPage = async (pageData) => {
    try {
      const response = await $fetch(`${baseURL}/items/pages`, {
        method: "POST",
        body: pageData,
      })
      return response
    } catch (error) {
      console.error("Erreur lors de la création de la page:", error)
      throw error
    }
  }

  // Fonction pour créer un utilisateur
  const createUser = async (userData) => {
    try {
      const response = await $fetch(`${baseURL}/users`, {
        method: "POST",
        body: userData,
      })
      return response
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error)
      throw error
    }
  }

  // Fonction pour obtenir l'URL d'une image pour NuxtImage
  const getImageUrl = (imageId) => {
    if (!imageId) return null
    return `${baseURL}/assets/${imageId}`
  }

  return {
    getArticles,
    getPages,
    getUsers,
    createArticle,
    createPage,
    createUser,
    getImageUrl,
  }
}
