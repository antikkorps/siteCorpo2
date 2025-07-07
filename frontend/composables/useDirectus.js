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

  // Récupérer un article par son slug
  const getArticleBySlug = async (slug) => {
    try {
      const response = await $fetch(
        `${baseURL}/items/articles?filter[slug][_eq]=${slug}&fields=*,illustration.*,category.*`
      )
      return response.data?.[0] || null
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article par slug:", error)
      return null
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

  // Récupérer une page par son slug
  const getPageBySlugWithSections = async (slug) => {
    try {
      // Récupérer la page par slug
      const page = await $fetch(
        `${baseURL}/items/pages?filter[slug][_eq]=${slug}&filter[status][_eq]=published&filter[is_published][_eq]=true&fields=*,illustration.*`
      )

      if (!page.data?.[0]) return null

      const pageData = page.data[0]

      // Récupérer les sections de cette page (Many-to-One)
      const sections = await $fetch(
        `${baseURL}/items/page_sections?filter[page][_eq]=${pageData.id}&filter[status][_eq]=published&sort=order&fields=*,image.*,images.*`
      )

      return {
        ...pageData,
        sections: sections.data || [],
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la page par slug:", error)
      return null
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

  // Recherche d'articles
  const searchArticles = async (query) => {
    try {
      const response = await $fetch(
        `${baseURL}/items/articles?search=${encodeURIComponent(
          query
        )}&fields=*,illustration.*,category.*`
      )
      return response.data || []
    } catch (error) {
      console.error("Erreur lors de la recherche d'articles:", error)
      return []
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

  const getMenuWithCategoryPages = async (menuId) => {
    try {
      const menu = await $fetch(`${baseURL}/items/menus/${menuId}?fields=*,items.*`)

      if (!menu.data || !menu.data.items) {
        console.warn("Menu ou items non trouvés")
        return null
      }

      const enrichedItems = await Promise.all(
        menu.data.items.map(async (item) => {
          try {
            if (!item.type) return item

            switch (item.type) {
              case "category": {
                if (!item.category_id) return item
                const pages = await $fetch(
                  `${baseURL}/items/pages?filter[category][_eq]=${item.category_id}&filter[status][_eq]=published&filter[is_published][_eq]=true&fields=*,illustration.*&sort=sort`
                )
                return { ...item, categoryPages: pages.data || [] }
              }

              case "page": {
                if (!item.page_id) return item
                const page = await $fetch(
                  `${baseURL}/items/pages/${item.page_id}?fields=*,illustration.*`
                )
                // Vérifier que la page est publiée
                if (
                  page.data &&
                  page.data.status === "published" &&
                  page.data.is_published === true
                ) {
                  return { ...item, pageDetails: page.data }
                }
                return null
              } // Ne pas inclure les pages non publiées

              case "external":
                return item

              default:
                return item
            }
          } catch (itemError) {
            console.error(`Erreur pour l'item ${item.id}:`, itemError)
            return item
          }
        })
      )

      // Filtrer les items null (pages non publiées)
      const filteredItems = enrichedItems.filter((item) => item !== null)

      return { ...menu.data, items: filteredItems }
    } catch (error) {
      console.error("Erreur lors de la récupération du menu:", error)
      return null
    }
  }

  // Récupérer toutes les catégories
  const getCategories = async () => {
    try {
      const response = await $fetch(`${baseURL}/items/categories?fields=*,illustration.*`)
      return response.data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error)
      return []
    }
  }

  // Récupérer tous les menus
  const getMenus = async () => {
    try {
      const response = await $fetch(
        `${baseURL}/items/menus?fields=*,items.*,items.page.*`
      )
      return response.data || []
    } catch (error) {
      console.error("Erreur lors de la récupération des menus:", error)
      return []
    }
  }

  // Récupérer les paramètres du site (logo, réseaux sociaux, etc.)
  const getSettings = async () => {
    try {
      const response = await $fetch(
        `${baseURL}/items/settings?fields=*,logo.*,favicon.*,socials.*`
      )
      return response.data?.[0] || null
    } catch (error) {
      console.error("Erreur lors de la récupération des paramètres du site:", error)
      return null
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
    getArticleBySlug,
    getPages,
    getPageBySlugWithSections,
    getUsers,
    createArticle,
    createPage,
    createUser,
    getImageUrl,
    getCategories,
    getMenus,
    getSettings,
    searchArticles,
    getMenuWithCategoryPages,
  }
}
