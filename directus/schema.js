export default {
  collections: [
    {
      collection: "articles",
      meta: {
        icon: "article",
        note: "Articles du blog",
        display_template: "{{title}}",
        sort: 1,
        translations: [
          {
            language: "fr-FR",
            translation: "Articles",
            singular: "Article",
          },
        ],
      },
      schema: {
        name: "articles",
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
          field: "title",
          type: "string",
          meta: {
            interface: "input",
            required: true,
            translations: [
              {
                language: "fr-FR",
                translation: "Titre",
              },
            ],
          },
          schema: {
            is_nullable: false,
          },
        },
        {
          field: "excerpt",
          type: "text",
          meta: {
            interface: "input-multiline",
            translations: [
              {
                language: "fr-FR",
                translation: "Extrait",
              },
            ],
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
          field: "category",
          type: "string",
          meta: {
            interface: "select-dropdown",
            options: {
              choices: [
                { text: "Actualités", value: "news" },
                { text: "Tutoriels", value: "tutorials" },
                { text: "Événements", value: "events" },
              ],
            },
            translations: [
              {
                language: "fr-FR",
                translation: "Catégorie",
              },
            ],
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
    },
    {
      collection: "pages",
      meta: {
        icon: "description",
        note: "Pages statiques",
        display_template: "{{title}}",
        sort: 2,
        translations: [
          {
            language: "fr-FR",
            translation: "Pages",
            singular: "Page",
          },
        ],
      },
      schema: {
        name: "pages",
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
          field: "title",
          type: "string",
          meta: {
            interface: "input",
            required: true,
            translations: [
              {
                language: "fr-FR",
                translation: "Titre",
              },
            ],
          },
          schema: {
            is_nullable: false,
          },
        },
        {
          field: "slug",
          type: "string",
          meta: {
            interface: "input",
            required: true,
            translations: [
              {
                language: "fr-FR",
                translation: "Slug",
              },
            ],
          },
          schema: {
            is_nullable: false,
          },
        },
        {
          field: "meta_description",
          type: "text",
          meta: {
            interface: "input-multiline",
            translations: [
              {
                language: "fr-FR",
                translation: "Description meta",
              },
            ],
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
          field: "is_published",
          type: "boolean",
          meta: {
            interface: "boolean",
            translations: [
              {
                language: "fr-FR",
                translation: "Publié",
              },
            ],
          },
          schema: {
            default_value: false,
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
    },
  ],
}
