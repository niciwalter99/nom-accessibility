<template>
  <div v-if="hasActiveFilter">
<!--    <quick-filter
        v-if="showQuickFilter"
        class="fixed top-20  transition-transform duration-300"
        :style="{ zIndex: 10, transform: showQuickFilter ? 'translateY(0)' : 'translateY(-100%)' }"
    ></quick-filter>-->
    <BeforeVisit></BeforeVisit>
    <ReachingTheMuseum></ReachingTheMuseum>
    <MovingAround
    :filter="filter"
    ></MovingAround>
    <experience-the-exhibition
        :filter="filter"
    ></experience-the-exhibition>
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
defineProps({
  showQuickFilter: {
    type: Boolean,
    default: false,
  }
})

import BeforeVisit from "@/components/ContentSections/BeforeVisit.vue";
import {computed} from "vue";
import {scrollToPosition} from "@/utils/scroll.js";


import {filter} from '@/storage.js'
import ReachingTheMuseum from "@/components/ContentSections/ReachingTheMuseum.vue";
import MovingAround from "@/components/ContentSections/MovingAround.vue";
import ExperienceTheExhibition from "@/components/ContentSections/ExperienceTheExhibition.vue";
import FAQ from "@/components/ContentSections/FAQ.vue";
import VisitorStories from "@/components/ContentSections/VisitorStories.vue";
import QuickFilter from "@/components/general/QuickFilter.vue";

const hasActiveFilter = computed(() => {
  return filter.value.blind || filter.value.deaf || filter.value.mobility || filter.value.cognitive || (filter.value.keywords != null  && filter.value.keywords.length > 0);
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