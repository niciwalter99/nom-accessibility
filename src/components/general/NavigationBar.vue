<template>
  <div
      class="sticky top-0 z-20 h-20 flex justify-between items-center px-6 bg-white border border-white border-b-mgrey-lighten-3 ">
    <div class="flex items-center space-x-2">
      <img
          v-if="theme !== 'high-contrast'"
          src="@/assets/images/logo.png"
          class="h-14 w-auto"
          aria-hidden="true"
      />
      <p v-else aria-hidden="true"> Naturkundemuseum Karlsruhe</p>
      <span class="sr-only">Naturkundemuseum Karlsruhe</span>
    </div>

    <nav class="flex items-center space-x-6 text-base text-mgrey-darken-2">
      <AccessibilityMenu></AccessibilityMenu>

      <button
          class="flex items-center space-x-2 hover:underline"
          aria-label="Read in plain language"
      >
        <img
            :src="plainLanguageIcon"
            alt=""
            class="h-5 w-5"
            aria-hidden="true"
        />
        <span>{{ t('navBar.plainLanguage') }} </span>
      </button>

      <button
          class="flex items-center space-x-2 hover:underline"
          aria-hidden="true"
          @click="changeSL"
      >
        <img
            :src="signLanguage"
            alt=""
            class="h-5 w-5"
            aria-hidden="true"
        />
        <span v-if="settings.signLanguage">{{ t('navBar.backToStart') }} </span>
        <span v-else> {{t('navBar.signLanguage') }} </span>
      </button>

      <button
          class="flex items-center space-x-2 hover:underline"
          aria-label="Change language"
          @click="changeLanguage()"
      >
        <img
            :src="globeIcon"
            alt=""
            class="h-5 w-5"
            aria-hidden="true"
        />
        <span>{{ convertedLanguage }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>

import {useI18n} from "vue-i18n";
import {computed} from "vue";
import AccessibilityMenu from "@/components/general/AccessibilityMenu.vue";
import {useThemeDetection} from "@/composables/useThemeDetection.js";
import {settings} from "@/storage.js";

const {t, locale} = useI18n();
const convertedLanguage = computed(() => locale.value.toUpperCase());

const changeLanguage = () => {
  let newLang = "";
  if (locale.value === "de") {
    newLang = "en";
  } else {
    newLang = "de";
  }
  locale.value = newLang;
};

const changeSL = () => {
  settings.value.signLanguage = !settings.value.signLanguage;
}

const { theme } = useThemeDetection()
const plainLanguageIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/plain-language-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/plain-language.svg', import.meta.url).href
});

const signLanguage = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/signLanguage.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/signLanguage.svg', import.meta.url).href
});

const globeIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/globe-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/globe.svg', import.meta.url).href
});




</script>

<style scoped>


</style>