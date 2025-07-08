import { createDirectus, rest } from "@directus/sdk"

const client = createDirectus("http://localhost:8055")

const pageSectionsCollection = {
  collection: "page_sections",
  meta: {
    icon: "view_column",
    note: "Sections de page avec animations GSAP",
    display_template: "{{title}}",
    sort: 3,
    translations: [
      {
        language: "fr-FR",
        translation: "Sections de page",
        singular: "Section de page",
      },
    ],
  },
  schema: {
    name: "page_sections",
  },
  fields: [
    {
      field: "id",
      type: "integer",
      meta: {
        hidden: true,
        interface: "input",
        readonly: true,
      },
      schema: {
        is_primary_key: true,
        has_auto_increment: true,
      },
    },
    {
      field: "page",
      type: "integer",
      meta: {
        interface: "select-dropdown-m2o",
        special: ["m2o"],
        translations: [
          {
            language: "fr-FR",
            translation: "Page",
          },
        ],
      },
      schema: {
        is_nullable: false,
        foreign_key_table: "pages",
      },
    },
    {
      field: "order",
      type: "integer",
      meta: {
        interface: "input",
        required: true,
        translations: [
          {
            language: "fr-FR",
            translation: "Ordre",
          },
        ],
      },
      schema: {
        default_value: 1,
        is_nullable: false,
      },
    },
    {
      field: "title",
      type: "string",
      meta: {
        interface: "input",
        translations: [
          {
            language: "fr-FR",
            translation: "Titre",
          },
        ],
      },
    },
    {
      field: "content_type",
      type: "string",
      meta: {
        interface: "select-dropdown",
        required: true,
        options: {
          choices: [
            { text: "Texte", value: "text" },
            { text: "Image", value: "image" },
            { text: "Galerie", value: "gallery" },
            { text: "Mixte (Texte + Image)", value: "mixed" },
          ],
        },
        translations: [
          {
            language: "fr-FR",
            translation: "Type de contenu",
          },
        ],
      },
      schema: {
        default_value: "text",
        is_nullable: false,
      },
    },
    {
      field: "content",
      type: "text",
      meta: {
        interface: "input-rich-text-html",
        translations: [
          {
            language: "fr-FR",
            translation: "Contenu",
          },
        ],
      },
    },
    {
      field: "image",
      type: "uuid",
      meta: {
        interface: "file",
        special: ["file"],
        translations: [
          {
            language: "fr-FR",
            translation: "Image",
          },
        ],
      },
    },
    {
      field: "images",
      type: "json",
      meta: {
        interface: "list-o2m",
        special: ["o2m"],
        translations: [
          {
            language: "fr-FR",
            translation: "Images (Galerie)",
          },
        ],
      },
    },
    {
      field: "animation_settings",
      type: "json",
      meta: {
        interface: "input-code",
        options: {
          language: "json",
        },
        translations: [
          {
            language: "fr-FR",
            translation: "Paramètres d'animation",
          },
        ],
      },
    },
    {
      field: "status",
      type: "string",
      meta: {
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "Brouillon", value: "draft" },
            { text: "Publié", value: "published" },
          ],
        },
        translations: [
          {
            language: "fr-FR",
            translation: "Statut",
          },
        ],
      },
      schema: {
        default_value: "draft",
      },
    },
    {
      field: "date_created",
      type: "timestamp",
      meta: {
        interface: "datetime",
        readonly: true,
        translations: [
          {
            language: "fr-FR",
            translation: "Date de création",
          },
        ],
      },
      schema: {
        default_value: { $now: true },
      },
    },
    {
      field: "date_updated",
      type: "timestamp",
      meta: {
        interface: "datetime",
        readonly: true,
        translations: [
          {
            language: "fr-FR",
            translation: "Date de modification",
          },
        ],
      },
      schema: {
        default_value: { $now: true },
      },
    },
  ],
}

async function addPageSections() {
  try {
    console.log("🚀 Ajout de la collection page_sections...")

    // Attendre que Directus soit prêt
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Créer la collection
    const response = await client.request(rest.createCollection(pageSectionsCollection))
    console.log("✅ Collection page_sections créée avec succès !")

    console.log("📝 Prochaines étapes :")
    console.log("   1. Redémarrez Directus : npm run dev:directus")
    console.log("   2. Accédez à l'admin : http://localhost:8055/admin")
    console.log("   3. Créez une page 'home' avec le slug 'home'")
    console.log("   4. Ajoutez des sections à cette page")
  } catch (error) {
    console.error("❌ Erreur lors de la création de la collection :", error)
  }
}

addPageSections()
