<template>

  <div v-if="hasActiveFilter">
    <BeforeVisit
        ref="beforeVisit"
    ></BeforeVisit>
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
    <div
        class="relative bg-mbeige-base rounded-md flex flex-col content-start items-start w-full min-h-screen min-h-full high-contrast:border">
      <div class="mt-10 z-10 ml-4 text-3xl text-mgrey-darken-2 max-w-[500px]">
        <p class="">Pick topics to see accessibility information</p>
        <div class="mt-2">
          <button
              class="hidden md:block bg-mblue-base text-white rounded-md px-2 py-1 text-lg font-bold mr-6 hover:bg-mblue-darken-1 high-contrast:border"
              @click="$emit('highlightFilter')"
          >Pick topics
          </button>
          <button
              class="block md:hidden bg-mblue-base text-white rounded-md px-2 py-1 text-lg font-bold mr-6 hover:bg-mblue-darken-1 high-contrast:border"
              @click="openFilterModal"
          >Pick topics
          </button>
          <button
              class="underline text-lg text-mgrey-darken-1 mt-2 rounded-md hover:bg-mgrey-lighten-4"
              @click="showAllInformation"
          >Show all information
          </button>
        </div>
      </div>
      <img
          class="h-64 absolute top-10 right-0 z-0"
          :src="icon"
      >
    </div>
  </template>

</template>

<script setup>
import {useThemeDetection} from "@/composables/useThemeDetection.js";

defineProps({
  showQuickFilter: {
    type: Boolean,
    default: false,
  }
})

import BeforeVisit from "@/components/ContentSections/BeforeVisit.vue";
import {computed, nextTick, ref} from "vue";
import {scrollToPosition} from "@/utils/scroll.js";

import {filter} from '@/storage.js'
import ReachingTheMuseum from "@/components/ContentSections/ReachingTheMuseum.vue";
import MovingAround from "@/components/ContentSections/MovingAround.vue";
import ExperienceTheExhibition from "@/components/ContentSections/ExperienceTheExhibition.vue";
import FAQ from "@/components/ContentSections/FAQ.vue";
import VisitorStories from "@/components/ContentSections/VisitorStories.vue";
import {useI18n} from "vue-i18n";

const beforeVisit = ref(null);

const hasActiveFilter = computed(() => {
  return filter.value.blind || filter.value.deaf || filter.value.mobility || filter.value.cognitive || (filter.value.keywords != null && filter.value.keywords.length > 0);
});

const emit = defineEmits(['open-filter-modal']);

const openFilterModal = () => {
  emit('open-filter-modal');
}

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

  nextTick(() => {
    const beforeVisit = document.getElementById('before-visit');
    beforeVisit.setAttribute('tabindex', '-1');
    beforeVisit.focus();
  });
}

const {theme} = useThemeDetection()
const icon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/ai-technology-hc.svg', import.meta.url).href
  }


  return new URL('@/assets/icons/ai-technology.svg', import.meta.url).href
});


</script>

<style>
@reference "@/assets/main.css";
.content-section {
  @apply max-w-[650px] p-4
}

</style>