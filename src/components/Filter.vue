<template>
  <div
      id="filterContainer"
      class="p-6 bg-mblue-lighten-4 rounded-lg max-w-3xl">
    <p class="mb-2">
      {{ t('filter.pickTopics') }}
    </p>
    <p class="mb-4 text-sm text-mblue-darken-1">
      {{ t('filter.filterInfo') }}
    </p>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
          v-for="option in options"
          :key="option.label"
          :id="option.label"
          @click="option.toggle"
          :class="[
          'relative w-[230px] h-[100px] cursor-pointer rounded-lg p-2 items-start hover:bg-mgreyno-lighten-6 transition',
          option.selected
            ? 'bg-white border-mblue-base border-2':
            'bg-white border-mblue-lighten-3 border  hover:border-mblue-base'
        ]"
      >
        <div class="relative group">
          <div v-if="option.selected" class="absolute top-1 right-1">
            <img
                src="@/assets/icons/selected.svg"
                class="w-5 h-5"
                aria-hidden="true"
            >
          </div>
          <div class="text-2xl">{{ option.icon }}</div>
          <div>
            <div class="font-semibold text-mgrey-darken-4">{{ t(`filter.options.${option.label}`) }}</div>
          </div>
          <div v-if="option.subtext" class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-mgrey-darken-4 text-white text-xs rounded px-2 py-1">
            {{ t(`filter.options.${option.label}Subtext`) }}
          </div>
        </div>
      </div>

      <div
          :class="[
          'relative w-[230px] h-[100px] cursor-pointer rounded-lg p-2 items-start hover:bg-mgreyno-lighten-6 transition',
          'bg-white border-mblue-lighten-3 border'
        ]"
      >
        <div class="text-2xl"> ➕</div>
        <div>
          <div class="font-semibold text-mgrey-darken-4">{{ t(`filter.addKeyword`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const selected = ref([])
import {filter} from '@/storage.js'


const options = computed(() => [
  {
    selected: filter.value.mobility,
    toggle() {
      filter.value.mobility = !filter.value.mobility;
    },
    label: 'limitedMobility',
    icon: '🧑‍🦽'
  },
  {
    selected: filter.value.blind,
    toggle() {
      filter.value.blind = !filter.value.blind;
    },
    label: 'blindLowVision',
    icon: '🧑‍🦯'
  },
  {
    selected: filter.value.deaf,
    toggle() {
      filter.value.deaf = !filter.value.deaf;
    },
    label: 'deafHardHearing',
    icon: '🤟'
  },
  {
    selected: filter.value.cognitive,
    toggle() {
      filter.value.cognitive = !filter.value.cognitive;
    },
    label: 'cognitiveDifferences',
    icon: '🎨',
    subtext: true
  }
]);

function highlightFilter() {
  for(const option of options.value) {
    const filter = document.getElementById(option.label);
    if (filter) {
      console.log(filter);
      filter.classList.remove('bg-white',)
      filter.classList.add('bg-mblue-lighten-2',  'transition-all', 'duration-500');
      setTimeout(() => {
        filter.classList.remove('bg-mblue-lighten-2');
        filter.classList.add('bg-white');
      }, 500);
    }
  }
  const filter = document.getElementById('filterContainer');
  if (filter) {
    console.log(filter);
    filter.classList.remove('bg-mblue-lighten-4',)
    filter.classList.add('bg-mblue-base', 'transition-all', 'duration-500');
    setTimeout(() => {
      filter.classList.remove('bg-mblue-base');
      filter.classList.add('bg-mblue-lighten-4');
    }, 500);
  }
};


function addKeyword() {
  const keyword = prompt(t('filter.enterKeyword'))
  if (keyword) {
    options.push({label: keyword, icon: '➕'})
    selected.value.push(keyword)
  }
}
defineExpose({
  highlightFilter
});

</script>