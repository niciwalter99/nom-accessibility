<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
    <button
      class="flex items-center space-x-2 hover:underline"
      aria-labelledby="plain-language"
      @click="changeToPlain"
    >
      <img
        v-if="!settings.plainLanguage"
        :src="plainLanguageIcon"
        alt=""
        class="h-5 w-5"
        aria-hidden="true"
      />
      <span id="plain-language" class="!text-base" v-if="settings.plainLanguage">{{ t('navBar.backToStart') }}</span>
      <span class="!text-base" v-else>{{ t('navBar.plainLanguage') }}</span>
    </button>
    <span class="sr-only" aria-live="polite" role="status">{{ languageChangeMessage }}</span>

    <button
      class="flex items-center space-x-2 hover:underline"
      aria-hidden="true"
      @click="changeSL"
    >
      <img
        v-if="!settings.signLanguage"
        :src="signLanguage"
        alt=""
        class="h-5 w-5"
        aria-hidden="true"
      />
      <span class="!text-base" v-if="settings.signLanguage">{{ t('navBar.backToStart') }}</span>
      <span class="!text-base" v-else>{{ t('navBar.signLanguage') }}</span>
    </button>

    <button
      class="flex items-center space-x-2 hover:underline"
      aria-label="Change language"
      @click="changeLanguage"
    >
      <img :src="globeIcon" alt="" class="h-5 w-5" aria-hidden="true" />
      <span class="!text-base">{{ convertedLanguage }}</span>
    </button>
  </div>
  <div id="screenreader-status" aria-live="polite" aria-atomic="true" class="sr-only"></div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import { settings } from '@/storage.js'
import { scrollToPosition } from '@/utils/scroll.js'
import {useThemeDetection} from "@/composables/useThemeDetection.js";
import { SRMessage} from "@/composables/ScreenReaderStatus.js";

const { t, locale } = useI18n()
const convertedLanguage = computed(() => settings.value.language.toUpperCase())
const languageChangeMessage = ref('');


const changeLanguage = () => {
  if (settings.value.language === "de") {
    settings.value.language = 'en'
    SRMessage('Website language is now in english');

  } else {
    settings.value.language = 'de'
    SRMessage('This prototype currently supports only english language');
    const target = document.getElementById('filterContainer')
    const offset = 80
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
    scrollToPosition(targetPosition)
  }
}

onMounted(() => {
  if (settings.value.plainLanguage) {
    locale.value = "enPlain"
  }
})

const changeToPlain = () => {
  settings.value.plainLanguage = !settings.value.plainLanguage
  SRMessage('Website is now in plain english');
  locale.value = settings.value.plainLanguage ? "enPlain" : "en"
  if (settings.value.plainLanguage) {
    settings.value.signLanguage = false
  } else {
    SRMessage('Website is now in standard english');
  }
}

const changeSL = () => {
  settings.value.signLanguage = !settings.value.signLanguage
  if (settings.value.signLanguage) {
    settings.value.plainLanguage = false
    locale.value = 'en'
  }
}

const {theme} = useThemeDetection()

const plainLanguageIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/plain-language-hc.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/plain-language.svg', import.meta.url).href
});

const signLanguage = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/signLanguage-hc.svg', import.meta.url).href
  }
  return new URL('@/assets/icons/signLanguage.svg', import.meta.url).href
});

const globeIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/globe-hc.svg', import.meta.url).href
  }
  return new URL('@/assets/icons/globe.svg', import.meta.url).href
})
</script>