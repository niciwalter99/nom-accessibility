<template>
  <ul
      v-if="isOpen"
      :class="[
      'focus:outline-none',
      isMobile
        ? 'fixed inset-0 bg-white z-50 p-4 flex flex-col gap-2 overflow-auto w-screen h-screen'
        : 'absolute z-10 mt-2 bg-white border border-mgrey-lighten-2 rounded-md shadow-lg w-full lg:w-64'
    ]"
  >
    <li class="block lg:hidden text-right px-4 py-2 border-b border-gray-200">
      <button class="text-sm text-mgrey-darken-2" @click="emit('close')">✕ Close</button>
    </li>

    <li @click="emit('activate', 'textSize')" class="block px-4 py-2 hover:bg-mgrey-lighten-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img :src="fontIcon" class="w-3" />
          <span class="!text-base">Increase Text Size</span>
        </div>
        <img v-if="settings.largeText" :src="doneIcon" class="w-3 ml-4" />
      </div>
    </li>

    <li @click="emit('activate', 'highContrast')" class="block px-4 py-2 text-sm hover:bg-mgrey-lighten-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img :src="contrastIcon" class="w-3" />
          <span class="!text-base">High Contrast</span>
        </div>
        <img v-if="settings.highContrast" :src="doneIcon" class="w-3 ml-4" />
      </div>
    </li>

    <li @click="emit('activate', 'largeCursor')" class="block px-4 py-2 text-sm hover:bg-mgrey-lighten-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img :src="cursorIcon" class="w-3" />
          <span class="!text-base">Large Cursor</span>
        </div>
        <img v-if="settings.largeCursor" :src="doneIcon" class="w-3 ml-4" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeDetection } from '@/composables/useThemeDetection.js';
import {settings} from '@/storage.js'


const props = defineProps({
  isOpen: Boolean,
  isMobile: Boolean,
});

const emit = defineEmits(['activate', 'close']);

const { theme } = useThemeDetection();

const fontIcon = computed(() =>
    theme.value === 'high-contrast'
        ? new URL('@/assets/icons/font-hc.svg', import.meta.url).href
        : new URL('@/assets/icons/font.svg', import.meta.url).href
);

const contrastIcon = computed(() =>
    theme.value === 'high-contrast'
        ? new URL('@/assets/icons/contrast-hc.svg', import.meta.url).href
        : new URL('@/assets/icons/contrast.svg', import.meta.url).href
);

const cursorIcon = computed(() =>
    theme.value === 'high-contrast'
        ? new URL('@/assets/icons/cursor-hc.svg', import.meta.url).href
        : new URL('@/assets/icons/cursor.svg', import.meta.url).href
);

const doneIcon = computed(() =>
    theme.value === 'high-contrast'
        ? new URL('@/assets/icons/done-hc.svg', import.meta.url).href
        : new URL('@/assets/icons/done.svg', import.meta.url).href
);
</script>