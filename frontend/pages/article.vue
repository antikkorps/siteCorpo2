<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold text-slate-800 mb-6">Article</h1>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Article ID: {{ articleId }}</h2>
        <p>Cette page fonctionne !</p>

        <div class="mt-6">
          <Button label="Retour aux articles" @click="$router.push('/articles')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Récupérer l'ID depuis l'URL
const route = useRoute()
const articleId = route.query.id || "aucun"

console.log("Page article chargée avec ID:", articleId)
</script>
