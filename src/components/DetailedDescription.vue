<template>
  <div class="w-full border-1 border-mgrey-lighten-3 rounded-lg cursor-pointer hover:bg-mgrey-lighten-4"
       @mouseenter="isHovered = true"
       @mouseleave="isHovered = false"
  >
    <div class="bg-mbeige-base h-[240px] rounded-t-lg"
         :class="[isHovered ? 'bg-mgrey-lighten-8' : 'bg-mbeige-base']"
    >
      <img
          class="m-auto p-4 h-full object-contain"
          :src="icon"
          alt="Car travel icon"
      >
    </div>
    <div class="rounded-b-lg p-4 flex flex-col justify-center"
         :class="[isHovered ? 'bg-mgreyno-lighten-6' : 'bg-white']"
    >
      <h3 class="title mb-2">{{ title }}</h3>
      <p class="text-sm mb-2">{{ description }}</p>
      <button class="font-bold flex items-center hover:bg-mgrey-lighten-4 rounded-lg p-2">
        <p class="underline">See more</p>
        <img
            class="h-4 w-4 ml-2"
            src="@/assets/icons/arrowRight.svg"
            alt="Arrow right"
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, computed} from 'vue';

const isHovered = ref(false);

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
});

</script>

<style scoped>
@reference "@/assets/main.css";

.title {
  @apply text-2xl;
}
</style>