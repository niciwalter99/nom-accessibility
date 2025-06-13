<template>


  <section id="before-visit" class="max-w-[650px]" role="region" aria-label="Before Visit">
    <h1>{{ t('beforeVisit.title') }}</h1>
    <div class="bg-mbeige-base high-contrast:border rounded-md p-4">
      💡 <b>{{ t('beforeVisit.note') }}</b>
      <p v-html=" t('beforeVisit.description')"></p>
      <a :href="'tel:' + t('beforeVisit.phone')">{{ t('beforeVisit.phone') }}</a>
      {{ t('beforeVisit.or') }}
      <a :href="'mailto: nkm@karlsruhe.de' ">nkm@karlsruhe.de</a>.
      {{ t('beforeVisit.voiceCalls') }}
<!--
      <p v-html=" t('beforeVisit.descriptionAppendix')"></p>
-->
    </div>
    <div class="my-4">
      <h2 class="my-2">{{ t('beforeVisit.generalInfo.title') }}</h2>
      <p>{{ t('beforeVisit.generalInfo.description') }}</p>
    </div>
    <div class="my-4">
      <h3>{{ t('beforeVisit.admission.title') }}</h3>
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="videoSrc"
          :autoplay="true"
          :controls="true"
      />
      <p v-if="!settings.signLanguage" v-html="t('beforeVisit.admission.description') "></p>
      <AdditionalImage
          :img-src="EntryDesk"
      ></AdditionalImage>
    </div>
    <div v-if="!settings.signLanguage" class="my-4">
      <h3>{{ t('beforeVisit.support.title') }}</h3>
      <p v-html=" t('beforeVisit.support.description')"></p>
    </div>
    <div v-if="!settings.signLanguage" class="my-4">
      <h3>{{ t('beforeVisit.assistance.title') }}</h3>
      <p v-html="t('beforeVisit.assistance.description') "></p>
    </div>
    <div class="my-4">
      <h3>{{ t('beforeVisit.visitorVolume.title') }}</h3>
      <p v-if="!settings.signLanguage" v-html="
        t('beforeVisit.visitorVolume.description') "></p>
    </div>
    <activity-chart></activity-chart>
    <div class="my-4">
      <h3>{{ t('beforeVisit.specialServices.silentHours.title') }}</h3>
      <p v-if="!settings.signLanguage" v-html="t('beforeVisit.specialServices.silentHours.description')"></p>
      <p v-else>
        <vue3-video-player
            v-if="settings.signLanguage"
            :src="silentHoursSrc"
            :autoplay="false"
            :controls="true"
        />
        <a href="https://www.smnk.de/information/veranstaltungskalender/?tx_psbeventmanager_em%5Baction%5D=list&tx_psbeventmanager_em%5Bcontroller%5D=Event&cHash=04b9d8618dac37baf78e42f6fdbd28d9">{{ t('beforeVisit.specialServices.silentHours.slText') }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>

import AdditionalImage from "@/components/general/AdditionalImage.vue";
import {settings} from "@/storage.js";
import videoSrc from '@/assets/SL/BeforeVisit.webm';
import silentHoursSrc from '@/assets/SL/silentHours.webm';


defineProps({
  filter: {
    type: Array,
    default: [],
  },
});

import ActivityChart from "@/components/ContentSections/ActivityChart.vue";
import EntryDesk from "@/assets/images/EntryDesk.jpg"
import {useI18n} from "vue-i18n";
import NVideo from "@/components/general/NVideo.vue";

const {t} = useI18n();
</script>


<style scoped>
@import "@/assets/main.css";

@reference "@/assets/main.css";


</style>