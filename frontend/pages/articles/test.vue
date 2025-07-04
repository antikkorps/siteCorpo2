<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-3xl font-bold text-slate-800 mb-6">Test Article</h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Informations de test</h2>
        <p><strong>Route:</strong> {{ $route.path }}</p>
        <p><strong>Paramètres:</strong> {{ $route.params }}</p>
        <p><strong>Article ID:</strong> {{ articleId }}</p>
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
const route = useRoute()
const articleId = route.params.id || "aucun"
</script>
