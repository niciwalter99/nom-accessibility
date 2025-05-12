<template>
  <div v-if="hasActiveFilter">
    <BeforeVisit></BeforeVisit>
    <ReachingTheMuseum></ReachingTheMuseum>
    <MovingAround></MovingAround>
    <NavigatingTheMuseum></NavigatingTheMuseum>
    <experience-the-exhibition></experience-the-exhibition>
    <f-a-q></f-a-q>
    <visitor-stories></visitor-stories>
  </div>
  <template v-else>
    <div class="relative bg-mbeige-base rounded-md flex w-full h-full ">
      <div class="my-auto ml-4 text-3xl text-mgrey-darken-2 max-w-[500px]">
        <p>Pick topics to see accessibility information</p>
        <div class="mt-2">
          <button
              class="cursor-pointer bg-mblue-base text-white rounded-md px-2 py-1 text-lg font-bold hover:bg-mblue-darken-1"
              @click="$emit('highlightFilter')"
          >Pick topics
          </button>
          <button
              class="cursor-pointer ml-6 underline text-lg text-mgrey-darken-1 p-2 rounded-md hover:bg-mgrey-lighten-4"
              @click="showAllInformation"
          >Show all information
          </button>
        </div>
      </div>
      <img
          class="h-64 absolute top-10 right-0"
          src="@/assets/icons/ai-technology.svg"
      >
    </div>
  </template>

</template>

<script setup>

import BeforeVisit from "@/components/ContentSections/BeforeVisit.vue";
import {computed} from "vue";
import {scrollToPosition} from "@/utils/scroll.js";


import {filter} from '@/storage.js'
import ReachingTheMuseum from "@/components/ContentSections/ReachingTheMuseum.vue";
import MovingAround from "@/components/ContentSections/MovingAround.vue";
import NavigatingTheMuseum from "@/components/ContentSections/NavigatingTheMuseum.vue";
import ExperienceTheExhibition from "@/components/ContentSections/ExperienceTheExhibition.vue";
import FAQ from "@/components/ContentSections/FAQ.vue";
import VisitorStories from "@/components/ContentSections/VisitorStories.vue";

const hasActiveFilter = computed(() => {
  return filter.value.blind || filter.value.deaf || filter.value.mobility || filter.value.cognitive;
});

const scrollToFilter = () => {
  const filterSection = document.getElementById('filter');
  if (filterSection) {
    scrollToPosition(filterSection);
  }
};

const showAllInformation = () => {
  filter.value.blind = true;
  filter.value.deaf = true;
  filter.value.mobility = true;
  filter.value.cognitive = true;
}

</script>

<style>
@reference "@/assets/main.css";
.content-section {
  @apply max-w-[650px] p-4
}

</style>