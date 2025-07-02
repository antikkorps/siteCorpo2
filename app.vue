<script setup lang="ts">
import "primeicons/primeicons.css"
import Button from "primevue/button"
import "primevue/resources/themes/aura-light-green/theme.css"
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <Button label="PrimeVue fonctionne !" icon="pi pi-check" />
  </div>
</template>
