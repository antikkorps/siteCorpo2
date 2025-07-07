<template>
  <div class="custom-spinner" :style="spinnerStyle" />
</template>

<script setup>
// Props pour personnaliser le spinner
const props = defineProps({
  size: {
    type: Number,
    default: 92,
  },
  color: {
    type: String,
    default: "#426F83",
  },
  backgroundColor: {
    type: String,
    default: "#f3f4f6",
  },
  strokeWidth: {
    type: Number,
    default: 4,
  },
})

// Style dynamique basé sur les props
const spinnerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  border: `${props.strokeWidth}px solid ${props.backgroundColor}`,
  borderTop: `${props.strokeWidth}px solid ${props.color}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto",
}))
</script>
