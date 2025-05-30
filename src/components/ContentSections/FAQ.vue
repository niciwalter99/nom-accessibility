<template>
  <section id="faq" class="max-w-[650px]">
    <h1 class="my-4">{{ t('faq.title') }}</h1>
    <div class="flex flex-col gap-4">
      <details v-for="item in faqItems" :key="item.q">
        <summary class="cc-pointer flex justify-between items-start pr-6 relative">
          <b>{{ t(item.q) }}</b>
          <img
              class="w-4 h-4 transition-transform duration-200"
              :src="getArrowIcon"
              aria-hidden="true"
          />
        </summary>
        <p>{{ t(item.a) }}</p>
        <img
            v-if="item.img"
            :src="item.img"
            aria-hidden="true"
            class="w-full h-auto mb-2"
        />
      </details>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {useThemeDetection} from "@/composables/useThemeDetection.js";

const { t } = useI18n()

// FAQ item structure
const faqItems = [
  { q: 'faq.questions.purchaseTickets', a: 'faq.answers.purchaseTickets' },
  { q: 'faq.questions.timeLimit', a: 'faq.answers.timeLimit' },
  { q: 'faq.questions.audioGuide', a: 'faq.answers.audioGuide' },
  {
    q: 'faq.questions.cafeteria',
    a: 'faq.answers.cafeteria',
    img: new URL('@/assets/images/Cafeteria.JPG', import.meta.url).href,
  },
  { q: 'faq.questions.restrooms', a: 'faq.answers.restrooms' },
  { q: 'faq.questions.guidedTours', a: 'faq.answers.guidedTours' },
  { q: 'faq.questions.photography', a: 'faq.answers.photography' },
]

const { theme } = useThemeDetection()
const getArrowIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/arrow-up-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/arrow-up.svg', import.meta.url).href
});

</script>

<style scoped>
details summary {
  list-style: none;
}
details summary::-webkit-details-marker {
  display: none;
}

/* Rotate icon on open */
details[open] summary img {
  transform: rotate(180deg);
}


</style>