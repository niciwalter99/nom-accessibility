<template>
  <section id="visitor-stories" class="max-w-[650px] p-4">
    <h1>What other visitors say</h1>
    <div class="bg-mbeige-base rounded-md p-4 m-4">
      💡 <b>Note</b>
      We are continuously working to improve the accessibility of our museum for all visitors. If you have any
      questions, feedback, or suggestions for improvement, please don’t hesitate to contact us at
      <a :href="'tel:' + t('beforeVisit.phone')">{{ t('beforeVisit.phone') }}</a>
      {{ t('beforeVisit.or') }}
      <a :href="'mailto:' + t('beforeVisit.email')">{{ t('beforeVisit.email') }}</a>.
      {{ t('beforeVisit.voiceCalls') }}
    </div>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<style scoped>


</style>