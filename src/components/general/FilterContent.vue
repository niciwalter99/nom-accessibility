<template>
  <div
      id="filterContainer"
      class="px-4 py-5 sm:p-6 bg-mblue-lighten-4 overflow-x-hidden high-contrast:border rounded-lg max-w-3xl"
  >
    <p class="mb-2 text-base sm:text-lg">{{ t('filter.pickTopics') }}</p>
    <p class="mb-4 text-sm sm:text-base text-mblue-darken-1">{{ t('filter.filterInfo') }}</p>

    <!-- Responsive Grid: no fixed cols on mobile -->
    <div class="grid auto-rows-fr gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
      <div
          v-for="option in options"
          :key="option.label"
          :id="option.label"
          @click="option.toggle"
          :class="[
          'relative w-full cc-pointer rounded-lg p-2 sm:p-3 items-start transition hover:bg-mgreyno-lighten-6',
          'hc-exception high-contrast:bg-black high-contrast:border-yellow-300 high-contrast-hover:bg-yellow-300',
          option.selected
            ? 'bg-white border-mblue-base high-contrast:border-5 border-2'
            : 'bg-white border-mblue-lighten-3 border hover:border-mblue-base'
        ]"
      >
        <div class="relative group">
          <div v-if="option.selected" class="absolute top-1 right-1">
            <img :src="selectedIcon" class="w-5 h-5" aria-hidden="true" />
          </div>
          <span class="text-xl sm:text-2xl hc-exception high-contrast:bg-yellow-300">
            {{ option.icon }}
          </span>
          <div class="label !text-lg font-semibold text-mgrey-darken-4">
            {{ t(`filter.options.${option.label}`) }}
          </div>
        </div>
      </div>

      <!-- Add Keyword Box -->
      <div
          :class="[
          'relative w-full cc-pointer rounded-lg p-2 sm:p-3 items-start transition hover:bg-mgreyno-lighten-6',
          'hc-exception high-contrast:bg-black high-contrast:border-yellow-300 high-contrast-hover:bg-yellow-300',
          KeywordsInFilter === ''
            ? 'bg-white border-mblue-lighten-3 border'
            : 'bg-white border-mblue-base high-contrast:border-5 border-2'
        ]"
          @click="handleKeyWordClick"
          id="addKeyword"
      >
        <span class="text-xl hc-exception high-contrast:bg-yellow-300">➕</span>
        <div>
          <button class="flex flex-col items-start font-semibold text-lg text-mgrey-darken-4">
            {{ t('filter.addKeyword') }}
            <p class="keywords !text-xs text-mgrey-base break-words">
              {{ KeywordsInFilter }}
            </p>
          </button>

          <KeywordModal :show="showModal" :keywords="keywords" @close="handleClose" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeDetection } from '@/composables/useThemeDetection.js'
import KeywordModal from '@/components/general/KeywordModal.vue'
import { filter } from '@/storage.js'
import { scrollToPosition } from '@/utils/scroll.js'

const { t } = useI18n()
const { theme } = useThemeDetection()
const showModal = ref(false)

const keywords = [
  t('filter.keywords.crowd'),
  t('filter.keywords.wayfindingSupport'),
  t('filter.keywords.lighting'),
  t('filter.keywords.accessibleExhibitionContent'),
  t('filter.keywords.interactiveElements'),
  t('filter.keywords.qrCodes'),
  t('filter.keywords.museumLayout'),
  t('filter.keywords.seating'),
  t('filter.keywords.accessibleRestrooms')
]

function handleClose(selected) {
  showModal.value = false
  filter.value.keywords = selected
}

const handleKeyWordClick = () => {
  showModal.value = true
}

const KeywordsInFilter = computed(() => {
  const str = Array.isArray(filter.value.keywords) && filter.value.keywords.length > 0
      ? filter.value.keywords.join(', ')
      : ''
  return str.length > 30 ? str.slice(0, 30) + '...' : str
})

const options = computed(() => [
  {
    selected: filter.value.mobility,
    toggle() {
      filter.value.mobility = !filter.value.mobility
    },
    label: 'limitedMobility',
    icon: '🧑‍🦽'
  },
  {
    selected: filter.value.blind,
    toggle() {
      filter.value.blind = !filter.value.blind
    },
    label: 'blindLowVision',
    icon: '🧑‍🦯'
  },
  {
    selected: filter.value.deaf,
    toggle() {
      filter.value.deaf = !filter.value.deaf
    },
    label: 'deafHardHearing',
    icon: '🤟'
  },
  {
    selected: filter.value.cognitive,
    toggle() {
      filter.value.cognitive = !filter.value.cognitive
    },
    label: 'cognitiveDifferences',
    icon: '🎨'
  }
])

const selectedIcon = computed(() =>
    theme.value === 'high-contrast'
        ? new URL('@/assets/icons/selected-hc.svg', import.meta.url).href
        : new URL('@/assets/icons/selected.svg', import.meta.url).href
)

function highlightFilter() {
  const filterElements = [...options.value, { label: 'addKeyword' }]
  for (const option of filterElements) {
    const el = document.getElementById(option.label)
    if (el) {
      el.classList.remove('bg-white')
      el.classList.add('bg-mblue-lighten-2', 'transition-all', 'duration-500', 'hc-exception')
      setTimeout(() => {
        el.classList.remove('bg-mblue-lighten-2')
        el.classList.add('bg-white')
      }, 500)
    }
  }
  const container = document.getElementById('filterContainer')
  if (container) {
    container.classList.remove('bg-mblue-lighten-4')
    container.classList.add(
        'bg-mblue-base',
        'transition-all',
        'duration-500',
        'hc-exception',
        'high-contrast:border-yellow-300',
        'high-contrast:border-10',
        'high-contrast:bg-yellow-300'
    )
    setTimeout(() => {
      container.classList.remove(
          'bg-mblue-base',
          'hc-exception',
          'high-contrast:border-yellow-300',
          'high-contrast:border-10'
      )
      container.classList.add('bg-mblue-lighten-4')
    }, 500)
  }
}

const scrollToFilter = () => {
  const target = document.getElementById('filterContainer')
  const offset = 80
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
  nextTick(() => scrollToPosition(targetPosition))
}

watch(
    filter,
    (f) => {
      if ([f.blind, f.deaf, f.mobility, f.cognitive].filter(Boolean).length === 1) {
        scrollToFilter()
      }
    },
    { deep: true }
)

defineExpose({ highlightFilter })
</script>

<style scoped>
@reference "@/assets/main.css";


.label {
  @apply lg:text-sm;
}
</style>