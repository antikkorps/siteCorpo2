import { createDirectus, rest } from "@directus/sdk"
import schema from "./schema.js"

const client = createDirectus("http://localhost:8055")

async function applySchema() {
  try {
    console.log("🚀 Application du schéma Directus...")

    // Attendre que Directus soit prêt
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Appliquer le schéma
    const response = await client.request(rest.createCollection(schema.collections[0]))
    console.log("✅ Collection articles créée avec succès !")

    console.log("📝 Prochaines étapes :")
    console.log("   1. Redémarrez Directus : npm run dev:directus")
    console.log("   2. Accédez à l'admin : http://localhost:8055/admin")
    console.log("   3. Ajoutez des illustrations à vos articles")
  } catch (error) {
    console.error("❌ Erreur lors de l'application du schéma :", error)
  }
}

applySchema()
