<template>
  <section id="before-visit" class="max-w-[650px]">
    <h1>{{ t('beforeVisit.title') }}</h1>
    <div class="bg-mbeige-base rounded-md p-4">
      💡 <b>{{ t('beforeVisit.note') }}</b>
      {{ t('beforeVisit.description') }}
      <a :href="'tel:' + t('beforeVisit.phone')">{{ t('beforeVisit.phone') }}</a>
      {{ t('beforeVisit.or') }}
      <a :href="'mailto: nkm@karlsruhe.de' ">nkm@karlsruhe.de</a>.
      {{ t('beforeVisit.voiceCalls') }}
    </div>
    <div class="my-2">
      <h2 class="my-2">{{ t('beforeVisit.generalInfo.title') }}</h2>
      <p>{{ t('beforeVisit.generalInfo.description') }}</p>
    </div>
    <div class="my-2">
      <h3>{{ t('beforeVisit.admission.title') }}</h3>
      <p>{{ t('beforeVisit.admission.description') }}</p>
    </div>
    <div class="my-2">
      <h3>{{ t('beforeVisit.support.title') }}</h3>
      <p>{{ t('beforeVisit.support.description') }}</p>
    </div>
    <div class="my-2">
      <h3>{{ t('beforeVisit.assistance.title') }}</h3>
      <p>{{ t('beforeVisit.assistance.description') }}</p>
    </div>
    <div class="my-2">
      <h3>{{ t('beforeVisit.visitorVolume.title') }}</h3>
      <p>
        {{ t('beforeVisit.visitorVolume.description') }}
        <a>{{ t('beforeVisit.visitorVolume.link') }}</a>
      </p>
    </div>
    <activity-chart></activity-chart>
    <div class="my-2">
      <h3>{{ t('beforeVisit.specialServices.silentHours.title') }}</h3>
      <p>
        {{ t('beforeVisit.specialServices.silentHours.description') }}
        <a>{{ t('beforeVisit.specialServices.silentHours.link') }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>

defineProps({
  filter: {
    type: Array,
    default: [],
  },
});

import ActivityChart from "@/components/ContentSections/ActivityChart.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>


<style scoped>
@import "@/assets/main.css";
@reference "@/assets/main.css";


</style>