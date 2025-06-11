<!-- File: Filter.vue -->
<template>
  <div>
    <!-- Mobile: Active Filters Summary Button -->
    <template class="block md:hidden mx-4 border border-mblue-lighten-3 bg-mblue-lighten-4 p-4 rounded-lg">
      <p class="mb-2"> {{ t('filter.pickTopics') }} </p>
      <button
          class="block md:hidden p-3 flex items-center bg-mblue-base rounded-full high-contrast:border text-lg text-white -4 mb-2"
          @click="showFilterOverlay = true"
      >
        <img src="@/assets/icons/filter.svg" alt="Filter Icon" class="w-5 h-5 mr-2">
        <span v-if="activeFilterLabels.length || filter.keywords.length">
        {{ getTruncatedFilterSummary(filter.keywords, activeFilterLabels) }}    </span>
        <span v-else>
        Select filter
      </span>
      </button>
    </template>

    <!-- Mobile: Fullscreen Filter Overlay -->
    <div
        v-if="showFilterOverlay"
        class="fixed inset-0 z-50 bg-white p-4 overflow-auto md:hidden"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold">Filter</h2>
        <button
            class="text-sm"
            @click="showFilterOverlay = false"
        >
          ✕ Close
        </button>
      </div>

      <FilterContent @close="showFilterOverlay = false"/>
    </div>

    <div class="hidden md:block">
      <FilterContent/>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import FilterContent from './FilterContent.vue'
import {filter} from '@/storage.js'

const {t} = useI18n()
const showFilterOverlay = ref(false)

const activeFilterLabels = computed(() => {
  const labels = []
  if (filter.value.mobility) labels.push(t('filter.options.limitedMobility'))
  if (filter.value.blind) labels.push(t('filter.options.blindLowVision'))
  if (filter.value.deaf) labels.push(t('filter.options.deafHardHearing'))
  if (filter.value.cognitive) labels.push(t('filter.options.cognitiveDifferences'))
  return labels
})

function getTruncatedFilterSummary(keywords = [], activeLabels = [], maxLength = 30) {
  const keywordStr = Array.isArray(keywords) && keywords.length > 0 ? keywords.join(', ') : ''
  const labelStr = Array.isArray(activeLabels) && activeLabels.length > 0 ? activeLabels.join(', ') : ''

  let combined = ''

  if (keywordStr && labelStr) {
    combined = `${keywordStr}, ${labelStr}`
  } else {
    combined = keywordStr || labelStr
  }

  return combined.length > maxLength ? combined.slice(0, maxLength) + '...' : combined
}

function truncate(text, maxLength = 25) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
</script>