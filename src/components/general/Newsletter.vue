<template>
  <div class="subscribe-container">
    <div class="subscribe-box">
      <img src="@/assets/icons/mail.svg">
      <input
          v-model="email"
          type="email"
          :placeholder="$t('experienceTheExhibition.newsletter.email')"
          class="email-input"
      />
      <button class="join-button">{{ t('experienceTheExhibition.newsletter.join') }}</button>
    </div>
    <a href=" https://www.instagram.com/naturkundemuseumkarlsruhe/" class="social-link">
      <img src="@/assets/icons/instagram.svg" alt="Instagram" class="instagram-icon" />
      <span>@nkm.karlsruhe</span>
    </a>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const {t} = useI18n();

const email = ref('');
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
  @apply bg-mblue-base;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
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
