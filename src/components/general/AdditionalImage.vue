<template>
  <div aria-hidden="true" class="relative group" ref="tooltipContainer">
    <img class="additional-img" src="@/assets/icons/images.svg" alt="Additional Info">
    <div
        ref="tooltip"
        :class="[
        'absolute left-1/2 z-100 transform -translate-x-1/2 w-2xl mb-2 hidden group-hover:block bg-mgrey-darken-4 text-white text-xs rounded px-2 py-1',
        tooltipPosition === 'top' ? 'bottom-full' : 'top-full mt-2'
      ]"
    >
      <img :src="imgSrc">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tooltip = ref(null);
const tooltipContainer = ref(null);
const tooltipPosition = ref('top');

defineProps({
  imgSrc: {
    type: String,
   required: true,
  }
})

onMounted(() => {
  const adjustTooltipPosition = () => {
    if (tooltipContainer.value) {
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
</script>