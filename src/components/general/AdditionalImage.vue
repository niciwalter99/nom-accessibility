<template>
  <div class="_wrapper">

    <n-img
        :key="props.imgSrc"
        :src="props.imgSrc"
        ref="imageRef"
        class="max-w-full rounded-lg shadow-lg"
    />
  </div>
</template>

<script setup>
import NImg from "@/components/general/NImg.vue";
const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
  }
});


</script>

<style scoped>

._wrapper {
  margin: 5px 10px;
  border-radius: 40px;
}

.loader {
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 0.8s linear infinite;
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