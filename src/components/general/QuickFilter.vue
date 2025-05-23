<template>
  <div
      id="filterContainer"
      class="p-6 bg-mblue-lighten-4 rounded-b-lg max-w-3xl">

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
          v-for="option in selectedOptions"
          :key="option.label"
          :id="option.label"
          @click="option.toggle"
      >
        <div class="_element relative group flex rounded-2xl bg-mblue-lighten-3 p-2">
          <div class="text-2xl mr-2">{{ option.icon }}</div>
          <div>
            <div class="text-mgrey-darken-4 _label">{{ t(`filter.options.${option.label}`) }}</div>
          </div>
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
  }
]);

const selectedOptions = computed(() => {
  return options.value.filter(option => option.selected);
});

function highlightFilter() {
  for (const option of options.value) {
    const filter = document.getElementById(option.label);
    if (filter) {
      console.log(filter);
      filter.classList.remove('bg-white',)
      filter.classList.add('bg-mblue-lighten-2', 'transition-all', 'duration-500');
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

<style scoped>

._element {
  align-items: center;
}
._label {
  font-size: 14px;
}

</style>