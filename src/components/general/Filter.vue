<template>
  <section role="region" aria-label="Filter">
    <template class="block md:hidden mx-4 border border-mblue-lighten-3 bg-mblue-lighten-4 p-4 rounded-lg">
      <p class="mb-2" id="filter-region">{{ t('filter.pickTopics') }}  </p>
      <button
          class="block md:hidden p-3 flex items-center bg-mblue-base rounded-full high-contrast:border text-lg text-white -4 mb-2"
          @click="openFilterModal"
      >
        <img src="@/assets/icons/filter.svg" alt="Filter Icon: Currently selected filter." class="w-5 h-5 mr-2">
        <span v-if="activeFilterLabels.length || filter.keywords.length" :aria-label="getFilterSummary(filter.keywords, activeFilterLabels)">
        {{ getTruncatedFilterSummary(filter.keywords, activeFilterLabels) }}    </span>
        <span v-else>
        Select filter
      </span>
      </button>
    </template>

    <div
        v-if="showFilterOverlay"
        role="dialog" aria-modal="true"
        class="fixed inset-0 z-50 bg-white p-4 overflow-auto md:hidden"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-base font-semibold" id="filter-header">Filter</h2>
        <button
            class="text-sm"
            @click="closeModal"
        >
          ✕ Close
        </button>
      </div>

      <FilterContent
          @close="closeModal"/>
    </div>

    <div class="hidden md:block">
      <FilterContent
          ref="filterContent"
      />
    </div>
  </section>
</template>

<script setup>
import {ref, computed, nextTick} from 'vue'
import {useI18n} from 'vue-i18n'
import FilterContent from './FilterContent.vue'
import {filter} from '@/storage.js'

const {t} = useI18n()
const showFilterOverlay = ref(false)
const filterContent = ref(null);

function highlightFilter() {
  filterContent.value.highlightFilter();
}

const activeFilterLabels = computed(() => {
  const labels = []
  if (filter.value.mobility) labels.push(t('filter.options.limitedMobility'))
  if (filter.value.blind) labels.push(t('filter.options.blindLowVision'))
  if (filter.value.deaf) labels.push(t('filter.options.deafHardHearing'))
  if (filter.value.cognitive) labels.push(t('filter.options.cognitiveDifferences'))
  return labels
})

const getFilterSummary = (keywords, activeLabels) => {
  const keywordStr = Array.isArray(keywords) && keywords.length > 0 ? keywords.join(', ') : ''
  const labelStr = Array.isArray(activeLabels) && activeLabels.length > 0 ? activeLabels.join(', ') : ''

  let combined = ''

  if (keywordStr && labelStr) {
    combined = `${keywordStr}, ${labelStr}`
  } else {
    combined = keywordStr || labelStr
  }
  return combined
}

function getTruncatedFilterSummary(keywords = [], activeLabels = [], maxLength = 30) {
 const combined = getFilterSummary(keywords, activeLabels);

  return combined.length > maxLength ? combined.slice(0, maxLength) + '...' : combined
}

const openFilterModal = () => {
  showFilterOverlay.value = true
  nextTick(() => {
    const filterRegion = document.getElementById('filter-header');
    if (filterRegion) {
      filterRegion.setAttribute('tabindex', '0');
      filterRegion.focus();
    }
  });
}

const closeModal = () => {
  showFilterOverlay.value = false
  document.getElementById('filter-region').setAttribute('tabindex', '-1');
 document.getElementById('filter-region').focus();
}

function truncate(text, maxLength = 25) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
defineExpose({ highlightFilter, openFilterModal })

</script>