<template>
  <div class="page-sections">
    <Section
      v-for="section in sections"
      :key="section.id"
      :section="section"
      :animation="getAnimationForSection(section)"
      :container-classes="getContainerClasses(section)"
      :content-classes="getContentClasses(section)"
    />
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
  defaultAnimation: {
    type: Object,
    default: () => ({
      type: "fadeIn",
      direction: "up",
      duration: 0.8,
      delay: 0.2,
      stagger: 0.1,
    }),
  },
})

// Configuration des animations par type de contenu
const animationConfig = {
  text: {
    type: "fadeIn",
    direction: "up",
    duration: 0.8,
    delay: 0.2,
  },
  image: {
    type: "scaleIn",
    duration: 1,
    delay: 0.3,
  },
  gallery: {
    type: "fadeIn",
    direction: "up",
    duration: 0.8,
    delay: 0.2,
    stagger: 0.15,
  },
  mixed: {
    type: "slideIn",
    direction: "left",
    duration: 1,
    delay: 0.2,
  },
}

// Fonction pour obtenir l'animation selon le type de contenu
const getAnimationForSection = (section) => {
  const contentType = section.content_type || section.type
  const config = animationConfig[contentType] || props.defaultAnimation

  // Permettre la personnalisation via les métadonnées de la section
  return {
    ...config,
    ...(section.animation_settings || {}),
  }
}

// Fonction pour obtenir les classes de conteneur selon le type
const getContainerClasses = (section) => {
  const baseClasses = "py-16 px-6"
  const contentType = section.content_type || section.type

  switch (contentType) {
    case "text":
      return `${baseClasses} bg-white`
    case "image":
      return `${baseClasses} bg-slate-50`
    case "gallery":
      return `${baseClasses} bg-white`
    case "mixed":
      return `${baseClasses} bg-gradient-to-r from-slate-50 to-white`
    case "section":
      return `${baseClasses} bg-white`
    default:
      return baseClasses
  }
}

// Fonction pour obtenir les classes de contenu selon le type
const getContentClasses = (section) => {
  const baseClasses = "container mx-auto"
  const contentType = section.content_type || section.type

  switch (contentType) {
    case "text":
      return `${baseClasses} max-w-4xl`
    case "image":
      return `${baseClasses} max-w-5xl`
    case "gallery":
      return `${baseClasses} max-w-7xl`
    case "mixed":
      return `${baseClasses} max-w-6xl`
    case "section":
      return `${baseClasses} max-w-6xl`
    default:
      return `${baseClasses} max-w-6xl`
  }
}
</script>
