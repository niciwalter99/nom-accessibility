<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
    <button
      class="flex items-center space-x-2 hover:underline"
      aria-label="Read in plain language"
      @click="changeToPlain"
    >
      <img
        v-if="!settings.plainLanguage"
        :src="plainLanguageIcon"
        alt=""
        class="h-5 w-5"
        aria-hidden="true"
      />
      <span class="!text-base" v-if="settings.plainLanguage">{{ t('navBar.backToStart') }}</span>
      <span class="!text-base" v-else>{{ t('navBar.plainLanguage') }}</span>
    </button>

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
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { settings } from '@/storage.js'
import { scrollToPosition } from '@/utils/scroll.js'
import {useThemeDetection} from "@/composables/useThemeDetection.js";

const { t, locale } = useI18n()
const convertedLanguage = computed(() => settings.value.language.toUpperCase())

const changeLanguage = () => {
  if (settings.value.language === "de") {
    settings.value.language = 'en'
  } else {
    settings.value.language = 'de'
    const target = document.getElementById('filterContainer')
    const offset = 80
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset
    scrollToPosition(targetPosition)
  }
}

const changeToPlain = () => {
  settings.value.plainLanguage = !settings.value.plainLanguage
  locale.value = settings.value.plainLanguage ? "enPlain" : "en"
  if (settings.value.plainLanguage) {
    settings.value.signLanguage = false
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