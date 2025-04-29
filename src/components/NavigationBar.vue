<template>
  <nav class="w-full flex justify-between items-center px-6 py-4 bg-white">
    <!-- Left Logo -->
    <div class="flex items-center space-x-2">
      <img
          src="@/assets/logo.png"
          alt="Naturkundemuseum Karlsruhe Logo"
          class="h-14 w-auto"
      />
      <span class="sr-only">Naturkundemuseum Karlsruhe</span>
    </div>

    <div class="flex items-center space-x-6 text-base">
      <button class="flex items-center space-x-1 hover:underline" aria-label="Open accessibility options">
        <span class="text-xl">🧑‍🦽</span>
        <span>Accessibility Menu</span>
      </button>

      <button class="flex items-center space-x-1 hover:underline" aria-label="Read in plain language">
        <span class="text-xl">📖</span>
        <span>Plain language</span>
      </button>

      <button class="flex items-center space-x-1 hover:underline" aria-label="Change language">
        <span class="text-xl">🌐</span>
        <span>{{ $t('changeLanguage') }}</span>
      </button>
    </div>
  </nav>

</template>

<script setup>

</script>


<style scoped>

</style>