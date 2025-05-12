<template>
  <div class="flex gap-2 mb-2 mt-4">
    <button
        class="underline hover:bg-mgrey-lighten-4 rounded-xl p-2"
        @click="selectNoisesTab()"
    >Noises/crowds
    </button>
    <button class="underline hover:bg-mgrey-lighten-4 rounded-xl p-2"
            @click="selectLightingTab()"
    >Lighting
    </button>
  </div>
  <div class="w-full flex gap-8 p-4 bg-mbeige-base rounded-xl"
  >
    <div class="w-full">
      <img
          :src="lightingTab? lightingEg : noiseEg"
          alt="Museum Map">
    </div>
    <div class="w-full">
      <img
          :src="lightingTab? lightingOg : noiseOg"
          alt="Museum Map">


    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import noiseEg from "@/assets/images/sensory-noise-eg.png";
import noiseOg from "@/assets/images/sensory-noise-og.png";
import lightingEg from "@/assets/images/sensory-lighting-eg.png";
import lightingOg from "@/assets/images/sensory-lighting-og.png";

const lightingTab = ref(false)

const selectLightingTab = () => {
  console.log('lightingTab');
  lightingTab.value = true;
}

const selectNoisesTab = () => {
  lightingTab.value = false;
}


</script>

<style scoped>

</style>