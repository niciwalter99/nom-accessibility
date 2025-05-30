<template>
  <div class="video-container">
    {{loading}}
    <div v-if="loading" class="video-loading">
      Loading video...
    </div>
    <video
        v-show="!loading"
        ref="videoRef"
        autoplay
        loop
        muted
        playsinline
        @canplay="onVideoLoaded"
    >
      <source :src="resolvedSrc" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const loading = ref(true)
const videoRef = ref(null)

function onVideoLoaded() {
  console.log('video is loaded');
  loading.value = false
}

const resolvedSrc = new URL(props.src, import.meta.url).href

onMounted(() => {
  const video = videoRef.value
  if (video?.readyState >= 3) {
    loading.value = false
  }
})
</script>

<style scoped>
.video-container {
  position: relative;
  display: inline-block;
}

.video-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00000020;
  color: #333;
  font-size: 14px;
  z-index: 1;
}
</style>