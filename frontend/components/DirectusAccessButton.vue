<template>
  <div class="fixed bottom-6 right-6 z-50">
    <Button
      v-tooltip.top="'Accéder à Directus Admin'"
      icon="pi pi-external-link"
      severity="secondary"
      size="large"
      class="shadow-lg hover:shadow-xl transition-all duration-300"
      @click="goToDirectus"
    />
  </div>
</template>

<script setup>
const goToDirectus = () => {
  window.open("http://localhost:8055/admin", "_blank")
}
</script>
