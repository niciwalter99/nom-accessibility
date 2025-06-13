<template>
  <div ref="dropdownRef" class="relative text-left leading-none">
    <button
        @click="toggleDropdown"
        class="inline-flex justify-between space-x-2 items-center !text-base hover:underline"
        aria-label="Accessibility Menu: change the visual interface and adapt it to your needs"
    >
      <img :src="icon" class="h-5 w-5" aria-hidden="true" />
      {{ t('navBar.accessibilityMenu') }}
      <svg
          :class="{ 'rotate-180': isOpen }"
          class="ml-2 h-4 w-4 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <Teleport to="body" v-if="isMobile && isOpen">
    <transition name="fade">
      <AccessibilityDropdown
          :isOpen="isOpen"
          :isMobile="isMobile"
          @activate="activate"
          @close="closeDropdown"/>
    </transition>
    </Teleport>
    <template v-else>
      <transition name="fade">
        <AccessibilityDropdown
            :isOpen="isOpen"
            :isMobile="isMobile"
            @activate="activate"
            @close="closeDropdown"/>
      </transition>
    </template>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';
import {useI18n} from "vue-i18n";
import {useThemeDetection} from "@/composables/useThemeDetection.js";
import {settings} from '@/storage.js'
import AccessibilityDropdown from "@/components/general/AccessibilityDropdown.vue";

const {t} = useI18n();

const isOpen = ref(false);
const dropdownRef = ref(null);

const isMobile = computed(() => window.innerWidth < 1024) // Tailwind lg = 1024px

const mobileDropdownClasses = 'fixed inset-0 bg-white z-50 p-4 flex flex-col gap-2 overflow-auto';
const desktopDropdownClasses = 'absolute z-10 mt-2 bg-white border border-mgrey-lighten-2 rounded-md shadow-lg';

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
  window.location.reload()
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  settings.value.highContrast ? document.body.classList.add('high-contrast') :
      document.body.classList.remove('high-contrast');
  settings.value.largeCursor ? document.body.classList.add('cursor-large') :
      document.body.classList.remove('cursor-large');
  settings.value.largeText ? document.documentElement.classList.add('large-text') :
      document.documentElement.classList.remove('large-text');
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
 .fade-enter-active,
 .fade-leave-active {
   transition: opacity 0.2s;
 }
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
