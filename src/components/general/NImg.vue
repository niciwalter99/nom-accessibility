<template>
  <div
      ref="imageRef"
      @click="toggleFullscreen"
      class="image-loader flex content-center justify-center w-full h-full">
    <div v-if="isLoading" class="loading-container"
         :style="{ height: placeholderHeight+ 'px' }">
      <div class="spinner"></div>
    </div>
    <img
        v-else
        :src="src"
        :alt="alt"
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

const isFakeFullscreen = ref(false);
const toggleFullscreen = () => {
  const el = imageRef.value;
  if (!el) return;

  const isMobile = window.innerWidth < 1024;
  const hasNativeFS = !!(
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen
  );

  if ((isMobile && !hasNativeFS)) {
    isFakeFullscreen.value = !isFakeFullscreen.value;
    el.classList.toggle('fullscreen-fallback', isFakeFullscreen.value);
  } else {
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {

      const request = el.requestFullscreen ||
          el.webkitRequestFullscreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullscreen;

      request?.call(el);
    } else {
      const exit = document.exitFullscreen ||
          document.webkitExitFullscreen ||
          document.mozCancelFullScreen ||
          document.msExitFullscreen;

      exit?.call(document);
    }
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

.fullscreen-fallback {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* less dark */
  backdrop-filter: blur(4px); /* optional blur */

  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-fallback img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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