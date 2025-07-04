<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Page de test</h1>
    <p class="mb-4">Cette page permet de tester la navigation.</p>

    <div class="space-y-4">
      <Button label="Retour aux articles" @click="$router.push('/articles')" />
      <Button label="Test article ID 1" @click="$router.push('/articles/1')" />
      <Button label="Test article ID 2" @click="$router.push('/articles/2')" />
    </div>
  </div>
</template>

<script setup>
// Page de test simple
</script>
