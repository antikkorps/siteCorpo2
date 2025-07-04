<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold text-slate-800 mb-6">Test Route Dynamique</h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Page de test - Route dynamique</h2>
        <p><strong>Article ID:</strong> {{ articleId }}</p>
        <p><strong>Route params:</strong> {{ JSON.stringify($route.params) }}</p>
        <p>Cette page fonctionne ! La route dynamique `/articles/test-id` fonctionne.</p>
      </div>

      <div class="flex gap-4">
        <Button label="Retour aux articles" @click="$router.push('/articles')" />
        <Button label="Test article 1" @click="$router.push('/articles/1')" />
        <Button label="Test article 2" @click="$router.push('/articles/2')" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Récupérer l'ID depuis l'URL
const route = useRoute()
const articleId = route.params.id || "aucun"

console.log("Page test-id.vue chargée")
console.log("Route params:", route.params)
console.log("Article ID:", articleId)
</script>
