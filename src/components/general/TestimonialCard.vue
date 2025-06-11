<template>
  <div class="flex max-w-md items-start rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <img src="@/assets/icons/quotes.svg" class="w-10 h-10 mr-5 p-2 border-mgrey-lighten-5 border rounded-full ">
    <div>
      <p class="text-sm font-semibold text-gray-900 mb-2 ">
        {{ text }}
      </p>
      <p class="text-sm text-gray-500">{{ name }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
</script>


<style scoped>


</style>