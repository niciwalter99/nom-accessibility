<template>
  <div class="sticky top-0 z-20 h-20 flex justify-between items-center px-6 bg-white ">
        <div class="flex items-center space-x-2">
          <img
              src="@/assets/images/logo.png"
              class="h-14 w-auto"
              aria-hidden="true"
          />
          <span class="sr-only">Naturkundemuseum Karlsruhe</span>
        </div>

        <nav class="flex items-center space-x-6 text-base text-mgrey-darken-2">
          <button
              class="flex items-center space-x-2 hover:underline"
              aria-label="Open accessibility options"
          >
            <img
                src="@/assets/icons/accessibility.svg"
                class="h-5 w-5 text-mred-base"
                aria-hidden="true"
            />
            <span> {{ t('navBar.accessibilityMenu') }}</span>
          </button>

          <button
              class="flex items-center space-x-2 hover:underline"
              aria-label="Read in plain language"
          >
            <img
                src="@/assets/icons/plainLanguage.svg"
                alt=""
                class="h-5 w-5"
                aria-hidden="true"
            />
            <span>{{ t('navBar.plainLanguage') }} </span>
          </button>

          <button
              class="flex items-center space-x-2 hover:underline"
              aria-label="Change language"
              @click="changeLanguage()"
          >
            <img
                src="@/assets/icons/globe.svg"
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


</script>

<style scoped>



</style>