<template>
  <section id="experience-the-exhibition" class="max-w-[650px]">
    <h1>{{ t('experienceTheExhibition.title') }}</h1>
    <p>{{ t('experienceTheExhibition.intro') }}</p>
    <h2>{{ t('experienceTheExhibition.interactingWithContent.title') }}</h2>
    <div v-if="filter.cognitive || filter.blind" class="_topic">
      <h3>{{ t('experienceTheExhibition.learnInDifferentWays.title') }}</h3>
      <p v-if="!settings.signLanguage" v-html=" t('experienceTheExhibition.learnInDifferentWays.description')"></p>
      <!--
      TODo change
-->
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="lockerVideo"
          :autoplay="true"
          :controls="true"
      />
    </div>
    <div v-if="filter.deaf || filter.blind || filter.keywords?.includes($t('filter.keywords.accessibleExhibitionContent'))" class="_topic">
        <h3>{{ t('experienceTheExhibition.alternativeFormats.title') }}</h3>
      <additional-image :img-src="tactile"></additional-image>
      <p v-if="!settings.signLanguage" v-html=" t('experienceTheExhibition.alternativeFormats.description')"></p>
      <!--
      TODo change
-->
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="lockerVideo"
          :autoplay="true"
          :controls="true"
      />
    </div>
    <div v-if="filter.cognitive || filter.blind || filter.hearing  || filter.keywords?.includes($t('filter.keywords.accessibleExhibitionContent'))" class="_topic">
        <h3>{{ t('experienceTheExhibition.interactiveAndTactileElements.title') }}</h3>
      <additional-image :img-src="earthquake"></additional-image>
      <p v-if="!settings.signLanguage" v-html=" t('experienceTheExhibition.interactiveAndTactileElements.description')"></p>
      <!--
      TODo change
-->
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="lockerVideo"
          :autoplay="true"
          :controls="true"
      />
    </div>
    <div v-if="filter.mobility  || filter.keywords?.includes($t('filter.keywords.accessibleExhibitionContent'))" class="_topic">
      <h3>{{ t('experienceTheExhibition.ergonomicPerceivableInformation.title') }}</h3>
      <p v-if="!settings.signLanguage" v-html=" t('experienceTheExhibition.ergonomicPerceivableInformation.description')"></p>
      <!--
      TODo change
-->
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="lockerVideo"
          :autoplay="true"
          :controls="true"
      />
    </div>
    <div v-if="filter.cognitive || filter.blind || filter.hearing  || filter.keywords?.includes($t('filter.keywords.qrCodes'))" class="_topic">
      <h3>{{ t('experienceTheExhibition.qrCodes.title') }}</h3>
      <p v-if="!settings.signLanguage" v-html=" t('experienceTheExhibition.qrCodes.description')"></p>
      <!--
      TODo change
-->
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="lockerVideo"
          :autoplay="true"
          :controls="true"
      />
    </div>
    <h2>{{ t('experienceTheExhibition.guiding.title') }}</h2>
    <div class="_topic">
      <h3>{{ t('experienceTheExhibition.guiding.inclusiveGuidedTours.title') }}</h3>
      <p v-if="!settings.signLanguage" v-html="t('experienceTheExhibition.guiding.inclusiveGuidedTours.description')"></p>
      <!--
      TODo change
-->
      <vue3-video-player
          v-if="settings.signLanguage"
          :src="lockerVideo"
          :autoplay="true"
          :controls="true"
      />
    </div>
    <div class="_topic">
      <h3>{{ t('experienceTheExhibition.guiding.digitalEvents.title') }}</h3>
      <p v-html=" t('experienceTheExhibition.guiding.digitalEvents.description')"></p>
    </div>
    <div class="_topic">
      <h3>{{ t('experienceTheExhibition.guiding.stayUpToDate.title') }}</h3>
      <p v-html="t('experienceTheExhibition.guiding.stayUpToDate.description')"></p>
      <Newsletter></Newsletter>
    </div>
  </section>
</template>

<script setup>
import Newsletter from "@/components/general/Newsletter.vue";
import tactile from "@/assets/images/Tactile.png";
import earthquake from "@/assets/images/earthquake.png";
import {settings} from "@/storage.js";

defineProps({
  filter: {
    type: Object,
    required: true,
  },
});
import { useI18n } from "vue-i18n";
import AdditionalImage from "@/components/general/AdditionalImage.vue";
import lockerVideo from "@/assets/SL/Locker.webm";

const { t } = useI18n();
</script>

<style scoped>
@reference "@/assets/main.css";

._topic {
  @apply my-2;
}
</style>