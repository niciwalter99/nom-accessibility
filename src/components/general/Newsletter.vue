<template>
  <div class="subscribe-container">
    <div class="subscribe-box">
      <img :src="mailIcon">
      <input
          v-model="email"
          type="email"
          :placeholder="$t('experienceTheExhibition.newsletter.email')"
          class="email-input"
      />
      <button class="join-button hc-exception high-contrast:bg-black high-contrast:text-yellow-300 high-contrast:border high-contrast-hover:bg-yellow" >{{ t('experienceTheExhibition.newsletter.join') }}</button>
    </div>
    <a href=" https://www.instagram.com/naturkundemuseumkarlsruhe/" class="social-link">
      <img src="@/assets/icons/instagram.svg" alt="Instagram" class="instagram-icon" />
      <span>@nkm.karlsruhe</span>
    </a>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useI18n } from 'vue-i18n';
import {useThemeDetection} from "@/composables/useThemeDetection.js";

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

<style scoped>
@reference "@/assets/main.css";

.subscribe-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-family: sans-serif;
  margin: 1rem 0;
}

.subscribe-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.5rem;
}

.email-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
  color: #666;
}

.email-input {
  border: none;
  outline: none;
  font-size: 1rem;
  flex: 1;
  margin-left: 0.6rem;
  min-width: 200px;
}

.join-button {
  @apply bg-mblue-base high-contrast:bg-black high-contrast:text-yellow-300 high-contrast:border high-contrast-hover:bg-yellow-300 high-contrast-hover:text-black;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-size: 16px;
  margin-left: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #333;
  text-decoration: underline;
  padding: 0.4rem;
}

.social-link:hover {
  @apply bg-mgrey-lighten-3;
  border-radius: 8px;
}

.instagram-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
}
</style>
