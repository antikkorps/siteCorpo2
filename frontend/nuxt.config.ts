// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
  ],

  icon: {
    size: "24px", // default <Icon> size applied
    class: "icon", // default <Icon> class applied
    aliases: {
      nuxt: "logos:nuxt-icon",
    },
  },

  primevue: {
    importTheme: { from: "@/themes/mytheme.js" },
  },

  runtimeConfig: {
    public: {
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
    },
  },

  image: {
    domains: ["localhost", "localhost:8055"],
    format: ["webp", "avif", "jpeg", "jpg", "png"],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    provider: "ipx",
  },
})
