<template>
  <Icon :name="name" :class="iconClass" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
  },
  class: {
    type: String,
    default: "",
  },
})

// Classes CSS pour la taille
const sizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
  "3xl": "w-12 h-12",
  "4xl": "w-16 h-16",
  "6xl": "w-24 h-24",
}

const iconClass = computed(() => {
  return `${sizeClasses[props.size] || sizeClasses.md} ${props.class}`
})
</script>
