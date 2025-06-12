<template>
  <div
      ref="container"
      class="bg-mbeige-base border border-mgrey-lighten-3 rounded-lg shadow-md p-[16px] w-full relative flex flex-col content-center content-between justify-between"
      :style="containerStyle">
    <div></div>
    <template v-if="!currentStepData.options">
      <div v-if="currentStepData.image"
           ref="image"
           class="relative lg:h-[400px] w-full overflow-hidden">
        <n-img :src="currentStepData.image" :alt="'Step ' + (stepIndex + 1)"
               image-class="w-full h-full rounded-lg object-cover object-center"
               :placeholder-height="imageHeight"
        />
      </div>
      <div v-if="currentStepData.map"
           @click="showMap(currentStepData.map)"
           class="hc-exception absolute top-2 right-2 transition-transform duration-300 ease-in-out hover:scale-[2] z-20 cursor-pointer">
        <img :src="currentStepData.map" class="hc-exception h-[80px] lg:h-[130px] " alt="Map"/>
      </div>
      <p v-html="currentStepData.caption" class="h-[8rem] lg:h-[5rem] my-4 text-center"
         :class="[currentStepData.jumpToPathKey != null ? '!text-3xl' : '!text-xl']"
      ></p>
    </template>

    <template v-else>
      <div class="flex justify-around gap-4 w-full">
<!--
           :style="{ height: optionHeight + 'px' }">
-->
        <button
            v-for="(option, i) in currentStepData.options"
            :key="i"
            @click="selectPath(option.pathKey)"
            class="hc-exception bg-white hover:bg-mgrey-lighten-5 high-contrast:border high-contrast:bg-black high-contrast:border-yellow-300 high-contrast-hover:bg-yellow-300 high-contrast-hover:text-black flex-1 p-4 rounded-lg border-2 border-mgrey-lighten-2 text-center transition-colors duration-300 flex flex-col overflow-hidden"
        >
          <div class="flex-[2] flex items-center justify-center  mb-2">
            <n-img :src="option.image" alt="option image" class="w-full rounded-lg"/>
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <p v-html="option.caption" class="text-sm my-2 overflow-hidden line-clamp-3"></p>
            <span class="block mt-auto font-bold p-1 rounded transition-colors duration-300 hover:bg-mgrey-lighten-4">Next →</span>
          </div>
        </button>
      </div>
    </template>

    <div class="h-[6rem] items-center">
      <div
          v-if="currentStepData.jumpToPathKey != null"
          class="flex items-center">
        <NButton
            @click="selectPath(currentStepData.jumpToPathKey)"
            variant="primary"
            class="hc-exception nav-button mx-auto w-64">
          Show next picture →
        </NButton>
      </div>
      <div v-else class="flex justify-between items-center py-2">
        <NButton
            @click="prevStep" class="hc-exception nav-button">
          ← Before
        </NButton>
        <NButton
            @click="nextStep"
            :disabled="currentStepData.jumpToPathKey == null && stepIndex === currentPath.length - 1"
            :style="{ visibility: currentStepData.options ? 'hidden' : 'visible' }"
        >
          Next →
        </NButton>
      </div>

      <div class="flex items-center justify-center min-h-[2em]">
        <p :style="{ opacity: currentStepData.options || currentStepData.jumpToPathKey != null ? 0 : 1 }"
           class="text-sm text-gray-600 m-0">
          Step {{ stepIndex + 1 }} of {{ currentPath.length }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {useImage} from '@vueuse/core'
import NButton from "@/components/general/NButton.vue"
import NImg from "@/components/general/NImg.vue";


const props = defineProps({
  forkedSteps: {
    type: Object,
    required: true
  },
  startPath: {
    type: String,
    default: 'fork'
  }
})

const currentPathKey = ref(props.startPath)
const stepIndex = ref(0)
const container = ref(null);

const currentPath = computed(() => props.forkedSteps[currentPathKey.value])
const currentStepData = computed(() => currentPath.value[stepIndex.value])
const imageUrl = computed(() => currentStepData.value.image)
const image = ref(null);
let containerHeight = ref(0);

const containerStyle = computed(() => {
  console.log(containerHeight.value);
  if (containerHeight.value !== 0) {
    return { height: containerHeight.value + 'px' }
  }
  return {}
})


const imageHeight = computed(() => {
  if (image.value) {
    console.log('image Height', image.value.offsetWidth / 1.5);
    return image.value.offsetWidth / 1.5;
  }
  return 0;
})

onMounted(() => {
  setTimeout(() => {
    containerHeight.value = container.value.offsetHeight;
    console.log('Updated container height:', containerHeight.value);
  }, 500);
  console.log('Container height:', containerHeight.value);
})

const selectPath = (pathKey) => {
  currentPathKey.value = pathKey
  stepIndex.value = 0
}

const nextStep = () => {
  if (currentPathKey.value === '/') {
    currentPathKey.value = props.startPath
  } else if (stepIndex.value < currentPath.value.length - 1) {
    stepIndex.value++
  }
}

const prevStep = () => {
  if (currentStepData.value.backwardPathKey) {
    currentPathKey.value = currentStepData.value.backwardPathKey
    stepIndex.value = 0
  } else if (stepIndex.value > 0) {
    stepIndex.value--
  } else {
    currentPathKey.value = props.startPath
  }
}

const optionHeight = computed(() => {
  const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  console.log(400 + 7 * rootFontSize);
  return 400 + 7 * rootFontSize;
});

</script>