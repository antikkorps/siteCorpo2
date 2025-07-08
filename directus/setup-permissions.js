import { createDirectus, rest } from "@directus/sdk"

const client = createDirectus("http://localhost:8055")

async function setupPermissions() {
  try {
    console.log("🔐 Configuration des permissions Directus...")

    // Attendre que Directus soit prêt
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 1. Créer un rôle public s'il n'existe pas
    console.log("📋 Création du rôle public...")
    try {
      await client.request(
        rest.createRole({
          name: "Public",
          description: "Rôle pour l'accès public en lecture seule",
          icon: "public",
          enforce_tfa: false,
          admin_access: false,
          app_access: false,
        })
      )
      console.log("✅ Rôle public créé")
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log("ℹ️ Rôle public existe déjà")
      } else {
        console.error("❌ Erreur création rôle public:", error.message)
      }
    }

    // 2. Récupérer l'ID du rôle public
    const roles = await client.request(
      rest.readRoles({
        filter: { name: { _eq: "Public" } },
      })
    )

    if (!roles.data?.[0]) {
      console.error("❌ Rôle public non trouvé")
      return
    }

    const publicRoleId = roles.data[0].id
    console.log(`📋 ID du rôle public: ${publicRoleId}`)

    // 3. Permissions pour la collection 'pages'
    console.log("📄 Configuration des permissions pour 'pages'...")
    try {
      await client.request(
        rest.createPermission({
          collection: "pages",
          action: "read",
          role: publicRoleId,
          permissions: {
            _and: [
              {
                _or: [{ is_published: { _eq: true } }, { status: { _eq: "published" } }],
              },
            ],
          },
          validation: {},
          presets: {},
          fields: ["*"],
        })
      )
      console.log("✅ Permission READ pour 'pages' créée")
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log("ℹ️ Permission READ pour 'pages' existe déjà")
      } else {
        console.error("❌ Erreur permission pages:", error.message)
      }
    }

    // 4. Permissions pour la collection 'page_sections'
    console.log("📋 Configuration des permissions pour 'page_sections'...")
    try {
      await client.request(
        rest.createPermission({
          collection: "page_sections",
          action: "read",
          role: publicRoleId,
          permissions: {
            _and: [
              {
                _or: [{ status: { _eq: "published" } }],
              },
            ],
          },
          validation: {},
          presets: {},
          fields: ["*"],
        })
      )
      console.log("✅ Permission READ pour 'page_sections' créée")
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log("ℹ️ Permission READ pour 'page_sections' existe déjà")
      } else {
        console.error("❌ Erreur permission page_sections:", error.message)
      }
    }

    // 5. Permissions pour les fichiers (assets)
    console.log("🖼️ Configuration des permissions pour les fichiers...")
    try {
      await client.request(
        rest.createPermission({
          collection: "directus_files",
          action: "read",
          role: publicRoleId,
          permissions: {},
          validation: {},
          presets: {},
          fields: ["*"],
        })
      )
      console.log("✅ Permission READ pour les fichiers créée")
    } catch (error) {
      if (error.message.includes("already exists")) {
        console.log("ℹ️ Permission READ pour les fichiers existe déjà")
      } else {
        console.error("❌ Erreur permission fichiers:", error.message)
      }
    }

    console.log("🎉 Configuration des permissions terminée !")
    console.log("📝 Vous pouvez maintenant :")
    console.log("   - Accéder aux pages publiques depuis le frontend")
    console.log("   - Voir les sections des pages")
    console.log("   - Charger les images associées")
  } catch (error) {
    console.error("❌ Erreur lors de la configuration des permissions :", error)
  }
}

setupPermissions()
