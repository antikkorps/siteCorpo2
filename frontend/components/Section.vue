<template>
  <section
    :id="sectionId"
    ref="sectionRef"
    class="py-16 px-6 bg-white section-container"
    :class="section.css_class"
  >
    <div class="section-content" :class="contentClasses">
      <!-- Titre de la section -->
      <div v-if="section.title" ref="titleRef" class="section-title mb-6">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-800">
          {{ section.title }}
        </h2>
      </div>

      <!-- Contenu selon le type -->
      <div ref="contentRef" class="section-body">
        <!-- Type: Text -->
        <div
          v-if="
            (section.content_type === 'text' || section.type === 'text') &&
            section.content
          "
          class="prose prose-lg max-w-none"
        >
          <div v-html="section.content" />
        </div>

        <!-- Type: Image -->
        <div
          v-else-if="section.content_type === 'image' || section.type === 'image'"
          class="section-image"
        >
          <img
            v-if="section.image"
            :src="getImageUrl(section.image.id || section.image)"
            :alt="section.title || 'Image de section'"
            class="w-full h-auto rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>

        <!-- Type: Gallery -->
        <div
          v-else-if="section.content_type === 'gallery' || section.type === 'gallery'"
          class="section-gallery"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(image, index) in section.images"
              :key="index"
              ref="galleryItemRefs"
              class="gallery-item"
            >
              <img
                :src="getImageUrl(image.id || image)"
                :alt="`Image ${index + 1}`"
                class="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Type: Mixed (Text + Image) -->
        <div
          v-else-if="section.content_type === 'mixed' || section.type === 'mixed'"
          class="section-mixed"
        >
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="prose prose-lg">
              <div v-html="section.content" />
            </div>
            <div v-if="section.image" class="section-image">
              <img
                :src="getImageUrl(section.image.id || section.image)"
                :alt="section.title || 'Image de section'"
                class="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Type: Section générique (fallback) -->
        <div v-else-if="section.type === 'section'" class="section-generic">
          <div class="prose prose-lg max-w-none">
            <div v-if="section.content" v-html="section.content" />
            <div v-else class="text-center py-8">
              <p class="text-slate-500">
                Section "{{ section.title }}" - Contenu à configurer
              </p>
            </div>
          </div>
        </div>

        <!-- Type: Custom (pour extensions futures) -->
        <div v-else class="section-custom">
          <slot name="custom-content" :section="section">
            <div class="prose prose-lg max-w-none">
              <div v-if="section.content" v-html="section.content" />
              <div v-else class="text-center py-8">
                <p class="text-slate-500">
                  Section "{{ section.title }}" - Type non reconnu
                </p>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Définir le nom du composant pour éviter l'erreur TypeScript
defineOptions({
  name: "PageSection",
})

// Enregistrer ScrollTrigger
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// Props
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  animation: {
    type: Object,
    default: () => ({
      type: "fadeIn",
      direction: "up",
      duration: 0.8,
      delay: 0.2,
      stagger: 0.1,
    }),
  },
  containerClasses: {
    type: String,
    default: "py-16 px-6",
  },
  contentClasses: {
    type: String,
    default: "container mx-auto max-w-6xl",
  },
})

// Composables
const { getImageUrl } = useDirectus()

// Refs
const sectionRef = ref(null)
const titleRef = ref(null)
const contentRef = ref(null)
const galleryItemRefs = ref([])

// Computed
const sectionId = computed(
  () => `section-${props.section.id || Math.random().toString(36).substr(2, 9)}`
)

// Fonction d'animation principale
const animateSection = (direction = "in") => {
  if (!import.meta.client || !sectionRef.value) return

  const { duration = 0.8, delay = 0.2, stagger = 0.1 } = props.animation

  console.log(`🎬 Animation ${direction} pour la section ${props.section.title}`)

  if (direction === "in") {
    // Animation d'entrée
    if (titleRef.value) {
      gsap.to(titleRef.value, {
        opacity: 1,
        y: 0,
        duration: duration * 0.8,
        delay,
        ease: "power2.out",
      })
    }

    if (contentRef.value) {
      const contentDelay = delay + 0.2
      gsap.to(contentRef.value, {
        opacity: 1,
        y: 0,
        duration: duration * 0.8,
        delay: contentDelay,
        ease: "power2.out",
      })

      if (galleryItemRefs.value.length > 0) {
        gsap.to(galleryItemRefs.value, {
          opacity: 1,
          y: 0,
          duration: duration * 0.8,
          delay: contentDelay,
          stagger,
          ease: "power2.out",
        })
      }
    }
  } else {
    // Animation de sortie
    if (titleRef.value) {
      gsap.to(titleRef.value, {
        opacity: 0.3,
        y: -20,
        duration: duration * 0.6,
        ease: "power2.in",
      })
    }

    if (contentRef.value) {
      gsap.to(contentRef.value, {
        opacity: 0.3,
        y: -20,
        duration: duration * 0.6,
        ease: "power2.in",
      })

      if (galleryItemRefs.value.length > 0) {
        gsap.to(galleryItemRefs.value, {
          opacity: 0.3,
          y: -20,
          duration: duration * 0.6,
          stagger,
          ease: "power2.in",
        })
      }
    }
  }
}

// Lifecycle
onMounted(() => {
  if (import.meta.client) {
    // Attendre que le DOM soit prêt
    nextTick(() => {
      // Initialiser les éléments en position cachée
      if (titleRef.value) {
        gsap.set(titleRef.value, { opacity: 0, y: 30 })
      }
      if (contentRef.value) {
        gsap.set(contentRef.value, { opacity: 0, y: 30 })
      }
      if (galleryItemRefs.value.length > 0) {
        gsap.set(galleryItemRefs.value, { opacity: 0, y: 30 })
      }

      // Créer le ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.value,
        start: "top 80%",
        onEnter: () => animateSection("in"),
        onLeave: () => animateSection("out"),
        onEnterBack: () => animateSection("in"),
        onLeaveBack: () => animateSection("out"),
      })
    })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    // Nettoyer les ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === sectionRef.value) {
        trigger.kill()
      }
    })
  }
})
</script>

<style scoped>
/* Les sections sont visibles par défaut, les animations se déclenchent au scroll */

/* Styles pour les différents types de contenu */
.section-image img {
  transition: transform 0.3s ease;
}

.section-image img:hover {
  transform: scale(1.02);
}

.gallery-item {
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

/* Responsive */
@media (max-width: 768px) {
  .section-mixed {
    grid-template-columns: 1fr;
  }
}
</style>
