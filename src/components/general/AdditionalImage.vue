<template>
  <button aria-hidden="true" class="relative group" ref="tooltipContainer">
    <img class="additional-img" :src="icon" alt="Additional Info"/>
    <div
        ref="tooltip"
        :class="[
        'absolute left-1/2 z-100 transform -translate-x-1/2 w-2xl mb-2 hidden group-hover:block bg-mgrey-darken-4 text-white text-xs rounded px-2 py-1',
        tooltipPosition === 'top' ? 'bottom-full' : 'top-full mt-2'
      ]"
    >
      <div v-if="false" class="flex justify-center items-center w-full h-full">
        <div class="loader"/>
      </div>
      <img
          v-else
          :key="props.imgSrc"
      :src="props.imgSrc"
      @load="handleLoad"
      @error="handleError"
      class="max-w-full"
      alt="Tooltip"
      />
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useThemeDetection } from "@/composables/useThemeDetection.js";

const tooltip = ref(null);
const tooltipContainer = ref(null);
const tooltipPosition = ref('top');
const loading = ref(true);

const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
  }
});

const handleLoad = () => {
  console.log('loaded');
  loading.value = false;
};

const handleError = () => {
  console.log('error');
  loading.value = false; // optional: show fallback state
};

onMounted(() => {
  const adjustTooltipPosition = () => {
    if (tooltipContainer.value && tooltip.value) {
      const containerRect = tooltipContainer.value.getBoundingClientRect();
      const tooltipHeight = tooltip.value.offsetHeight;

      const spaceAbove = containerRect.top;
      const spaceBelow = window.innerHeight - containerRect.bottom;

      tooltipPosition.value = spaceAbove > spaceBelow && spaceAbove > tooltipHeight ? 'top' : 'bottom';
    }
  };

  adjustTooltipPosition();
  window.addEventListener('scroll', adjustTooltipPosition);
});

const { theme } = useThemeDetection();

const icon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL(`@/assets/icons/images-hc.svg`, import.meta.url).href;
  }
  if (theme.value === 'color-blind') {
    return new URL(`@/assets/icons/images-cb.svg`, import.meta.url).href;
  }
  return new URL(`@/assets/icons/images.svg`, import.meta.url).href;
});
</script>

<style scoped>

.loader {
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>