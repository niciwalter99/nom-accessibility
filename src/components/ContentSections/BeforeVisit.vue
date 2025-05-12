<template>
  <section id="before-visit" class="max-w-[650px] p-4">
    <h1>{{ t('beforeVisit.title') }}</h1>
    <div class="bg-mbeige-base rounded-md p-4 m-4">
      💡 <b>{{ t('beforeVisit.note') }}</b>
      {{ t('beforeVisit.description') }}
      <a :href="'tel:' + t('beforeVisit.phone')">{{ t('beforeVisit.phone') }}</a>
      {{ t('beforeVisit.or') }}
      <a :href="'mailto:' + t('beforeVisit.email')">{{ t('beforeVisit.email') }}</a>.
      {{ t('beforeVisit.voiceCalls') }}
    </div>
    <h2 class="m-2">{{ t('beforeVisit.generalInfo.title') }}</h2>
    <p>{{ t('beforeVisit.generalInfo.description') }}</p>
    <ul>
      <li>
        <h3>{{ t('beforeVisit.admission.title') }}</h3>
        <p>{{ t('beforeVisit.admission.description') }}</p>
      </li>
      <li>
        <h3>{{ t('beforeVisit.support.title') }}</h3>
        <p>{{ t('beforeVisit.support.description') }}</p>
      </li>
      <li>
        <h3>{{ t('beforeVisit.assistance.title') }}</h3>
        <p>{{ t('beforeVisit.assistance.description') }}</p>
      </li>
      <li>
        <h3>{{ t('beforeVisit.visitorVolume.title') }}</h3>
        <p>
          {{ t('beforeVisit.visitorVolume.description') }}
          <a>{{ t('beforeVisit.visitorVolume.link') }}</a>
        </p>
        <activity-chart></activity-chart>
      </li>
    </ul>
    <h2 class="m-4">{{ t('beforeVisit.specialServices.title') }}</h2>
    <ul>
      <li>
        <h3>{{ t('beforeVisit.specialServices.silentHours.title') }}</h3>
        <p>
          {{ t('beforeVisit.specialServices.silentHours.description') }}
          <a>{{ t('beforeVisit.specialServices.silentHours.link') }}</a>
        </p>
      </li>
      <li>
        <h3>{{ t('beforeVisit.specialServices.guidedTours.title') }}</h3>
        <p>
          {{ t('beforeVisit.specialServices.guidedTours.description') }}
          <a>{{ t('beforeVisit.specialServices.guidedTours.link') }}</a>
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>

import ActivityChart from "@/components/ContentSections/ActivityChart.vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n();
</script>


<style scoped>

</style>