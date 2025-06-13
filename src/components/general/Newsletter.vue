<template>
  <div class="flex flex-col lg:flex-row items-center gap-6 my-4">
    <div class="flex items-center border border-mgrey-base rounded-lg px-2 py-2 max-w-screen">
      <img :src="mailIcon" alt="Mail Icon" class="hidden lg:block w-6 h-6 mr-2" />
      <input
          v-model="email"
          aria-label="Email input for newsletter subscription"
          type="email"
          autocomplete="email"
          :placeholder="$t('experienceTheExhibition.newsletter.email')"
          class="text-base focus:outline-none bg-transparent high-contrast:placeholder-yellow-300 placeholder-mgrey-base"
      />

      <n-button
          class="px-2 py-2 rounded-lg"
          variant="primary"
      >
        {{ t('experienceTheExhibition.newsletter.join') }}
      </n-button>
    </div>

    <a
        href="https://www.instagram.com/naturkundemuseumkarlsruhe/"
        class="flex lg:flex-col items-center text-base text-gray-800 underline px-2 py-1 rounded-lg hover:bg-mgrey-lighten-3"
    >
      <img src="@/assets/icons/instagram.svg" alt="Instagram" class="w-6 h-6 mr-2" />
      <span>@nkm.karlsruhe</span>
    </a>
  </div>
</template>


<script setup>
import {computed, ref} from 'vue';
import { useI18n } from 'vue-i18n';
import {useThemeDetection} from "@/composables/useThemeDetection.js";
import NButton from "@/components/general/NButton.vue";

const {t} = useI18n();

const email = ref('');

const { theme } = useThemeDetection()

const mailIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/mail-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/mail.svg', import.meta.url).href
});
</script>


