<template>
  <div ref="dropdownRef" class="relative inline-block text-left">

    <button
        @click="toggleDropdown"
        class="inline-flex justify-between  space-x-2 items-center text-base px-4 py-2 hover:underline"
    >
      <img
          :src="icon"
          class="h-5 w-5 text-mred-base"
          aria-hidden="true"
      />
      {{ t('navBar.accessibilityMenu') }}
      <svg
          :class="{ 'rotate-180': isOpen }"
          class="ml-2 h-4 w-4 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <ul
        v-if="isOpen"
        class="absolute z-10 mt-2 bg-white border border-mgrey-lighten-2 rounded-md shadow-lg focus:outline-none"
    >
      <li @click="activate('textSize')"
          class="block px-4 py-2 text-sm rounded-md hover:bg-mgrey-lighten-4 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img :src="fontIcon" class="w-3"/>
            <button class="text-sm">Increase Text Size</button>
          </div>
          <img v-if="settings.largeText" :src="doneIcon" class="w-3 ml-4"/>
        </div>
      </li>

      <!--      <li @click="activate('colorBlind')"
                class="block px-4 py-2 text-sm rounded-md hover:bg-mgrey-lighten-4 ">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img :src="eyeIcon" class="w-3" />
                  <span class="text-sm">Color Blind Mode</span>
                </div>
                <img v-if="activeOption === 'colorBlind'"  :src="doneIcon"class="w-3 ml-4" />
              </div>
            </li>-->

      <li @click="activate('highContrast')"
          class="block px-4 py-2 text-sm rounded-md hover:bg-mgrey-lighten-4 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img :src="contrastIcon" class="w-3"/>
            <button class="text-sm">High Contrast</button>
          </div>
          <img v-if="settings.highContrast" :src="doneIcon" class="w-3 ml-4"/>
        </div>
      </li>

      <li @click="activate('largeCursor')"
          class="block px-4 py-2 text-sm rounded-md hover:bg-mgrey-lighten-4 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img :src="cursorIcon" class="w-3"/>
            <button class="text-sm">Large Cursor</button>
          </div>
          <img v-if="settings.largeCursor" :src="doneIcon" class="w-3 ml-4"/>
        </div>
      </li>

    </ul>
  </div>
</template>


<script setup>
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';
import {useI18n} from "vue-i18n";
import {useThemeDetection} from "@/composables/useThemeDetection.js";
import {settings} from '@/storage.js'

const {t} = useI18n();

const isOpen = ref(false);
const dropdownRef = ref(null);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

const activeOption = ref(null)

const {theme} = useThemeDetection()
const icon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/accessibility-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/accessibility.svg', import.meta.url).href
});
const fontIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/font-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/font.svg', import.meta.url).href
});
const contrastIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/contrast-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/contrast.svg', import.meta.url).href
});
const doneIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/done-hc.svg', import.meta.url).href
  }
  return new URL('@/assets/icons/done.svg', import.meta.url).href
});
const cursorIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/cursor-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/cursor.svg', import.meta.url).href
});
const eyeIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/eye-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/eye.svg', import.meta.url).href
});

function activate(option) {
  activeOption.value = option

  if (option === 'highContrast') {
    settings.value.highContrast = !settings.value.highContrast;
    settings.value.highContrast ? document.body.classList.add('high-contrast') :
        document.body.classList.remove('high-contrast')

  } else if (option === 'largeCursor') {
    settings.value.largeCursor = !settings.value.largeCursor;
    settings.value.largeCursor ? document.body.classList.add('cursor-large') :
        document.body.classList.remove('cursor-large')
  } else if (option === 'textSize') {
    settings.value.largeText = !settings.value.largeText;
    settings.value.largeText ? document.documentElement.classList.add('large-text') :
        document.documentElement.classList.remove('large-text');
  }
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0.5rem;
}
</style>
