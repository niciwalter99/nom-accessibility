<template>
  <section id="faq" class="max-w-[650px]">
    <h1 class="my-4">{{ t('faq.title') }}</h1>
    <div class="flex flex-col gap-4">
      <details>
        <summary><b>{{ t('faq.questions.purchaseTickets') }}</b></summary>
        <p>{{ t('faq.answers.purchaseTickets') }}</p>
      </details>

      <details>
        <summary><b>{{ t('faq.questions.timeLimit') }}</b></summary>
        <p>{{ t('faq.answers.timeLimit') }}</p>
      </details>

      <details>
        <summary><b>{{ t('faq.questions.audioGuide') }}</b></summary>
        <p>{{ t('faq.answers.audioGuide') }}</p>
      </details>

      <details>
        <summary><b>{{ t('faq.questions.cafeteria') }}</b></summary>
        <p>{{ t('faq.answers.cafeteria') }}</p>
        <img src="@/assets/images/Cafeteria.JPG" aria-hidden="true" class="w-full h-auto mb-2">
      </details>

      <details>
        <summary><b>{{ t('faq.questions.restrooms') }}</b></summary>
        <p>{{ t('faq.answers.restrooms') }}</p>
      </details>

      <details>
        <summary><b>{{ t('faq.questions.guidedTours') }}</b></summary>
        <p>{{ t('faq.answers.guidedTours') }}</p>
      </details>

      <details>
        <summary><b>{{ t('faq.questions.photography') }}</b></summary>
        <p>{{ t('faq.answers.photography') }}</p>
      </details>
    </div>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<style scoped>
details summary {
  position: relative;
  cursor: pointer;
  padding-right: 2rem;
  list-style: none;
  appearance: none;
  display: flex;
  align-items: flex-start;
}
details summary::-webkit-details-marker {
  display:none;
}

details summary::after {
  content: url('@/assets/icons/arrow-up.svg');
  position: absolute;
  right: 0;
  transition: transform 0.2s ease;
}

details[open] summary::after {
  transform: rotate(180deg); /* Rotate icon when expanded */
}


</style>