<template>
  <section id="experience-the-exhibition" class="max-w-[650px]">
    <h1>{{ t('experienceTheExhibition.title') }}</h1>
    <p>{{ t('experienceTheExhibition.intro') }}</p>
    <h2>{{ t('experienceTheExhibition.interactingWithContent.title') }}</h2>
    <div v-if="filter.cognitive || filter.blind" class="_topic">
      <h3>{{ t('experienceTheExhibition.learnInDifferentWays.title') }}</h3>
      <p>{{ t('experienceTheExhibition.learnInDifferentWays.description') }}</p>
    </div>
    <div v-if="filter.deaf || filter.blind" class="_topic">
      <h3>{{ t('experienceTheExhibition.alternativeFormats.title') }}</h3>
      <p>{{ t('experienceTheExhibition.alternativeFormats.description') }}</p>
    </div>
    <div v-if="filter.cognitive || filter.blind || filter.hearing" class="_topic">
      <h3>{{ t('experienceTheExhibition.interactiveAndTactileElements.title') }}</h3>
      <p>{{ t('experienceTheExhibition.interactiveAndTactileElements.description') }}</p>
    </div>
    <div v-if="filter.mobility" class="_topic">
      <h3>{{ t('experienceTheExhibition.ergonomicPerceivableInformation.title') }}</h3>
      <p>{{ t('experienceTheExhibition.ergonomicPerceivableInformation.description') }}</p>
    </div>
    <div v-if="filter.cognitive || filter.blind || filter.hearing" class="_topic">
      <h3>{{ t('experienceTheExhibition.qrCodes.title') }}</h3>
      <p>{{ t('experienceTheExhibition.qrCodes.description') }}</p>
    </div>
    <h2>{{ t('experienceTheExhibition.guiding.title') }}</h2>
    <div class="_topic">
      <h3>{{ t('experienceTheExhibition.guiding.inclusiveGuidedTours.title') }}</h3>
      <p>{{ t('experienceTheExhibition.guiding.inclusiveGuidedTours.description') }}</p>
    </div>
    <div class="_topic">
      <h3>{{ t('experienceTheExhibition.guiding.digitalEvents.title') }}</h3>
      <p>{{ t('experienceTheExhibition.guiding.digitalEvents.description') }}</p>
    </div>
    <div class="_topic">
      <h3>{{ t('experienceTheExhibition.guiding.stayUpToDate.title') }}</h3>
      <p>{{ t('experienceTheExhibition.guiding.stayUpToDate.description') }}</p>
      <Newsletter></Newsletter>
    </div>
  </section>
</template>

<script setup>
import Newsletter from "@/components/general/Newsletter.vue";

defineProps({
  filter: {
    type: Object,
    required: true,
  },
});
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
@reference "@/assets/main.css";

._topic {
  @apply my-2;
}
</style>