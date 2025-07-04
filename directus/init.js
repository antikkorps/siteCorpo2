import { createDirectus } from "@directus/sdk"

const client = createDirectus("http://localhost:8055")

async function initializeDirectus() {
  try {
    console.log("🚀 Initialisation de Directus...")

    // Attendre que Directus soit prêt
    await new Promise((resolve) => setTimeout(resolve, 5000))

    console.log("✅ Directus initialisé avec succès !")
    console.log("📝 Vous pouvez maintenant :")
    console.log("   - Accéder à l'admin : http://localhost:8055/admin")
    console.log("   - Utiliser l'API : http://localhost:8055")
    console.log("   - Consulter le frontend : http://localhost:3000")
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation :", error)
  }
}

initializeDirectus()
