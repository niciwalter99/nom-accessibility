<template>
  <div class="image-loader flex content-center justify-center w-full h-full">
    <div v-if="isLoading" class="loading-container"
         :style="{ height: placeholderHeight+ 'px' }">
      <div class="spinner"></div>
    </div>

    <img
        ref="imageRef"
        v-else
        :src="src"
        :alt="alt"
        @click="toggleFullscreen"
        v-bind="$attrs"
        :class="[imageClass, {'cursor-zoom-out': isFullscreen}, {'cursor-zoom-in': !isFullscreen}]"
    />
  </div>
</template>

<script setup>
import {useImage} from '@vueuse/core'
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  },
  placeholderHeight: {
    type: Number,
    default: 100
  }

})

let isLoading = useImage({src: props.src}).isLoading;

watch(() => props.src, () => {
  isLoading = useImage({src: props.src}).isLoading;
})


const isFullscreen = ref(false);
const imageRef = ref(null);

const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    enterFullscreen(imageRef.value);
  } else {
    exitFullscreen();
  }
};

const enterFullscreen = (el) => {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<style scoped>
.image-loader {
  display: inline-block;
  position: relative;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px; /* Adjust based on your needs */
  min-width: 100px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #38363099;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>