<template>
  <section id="moving-around" class="max-w-[650px]">
    <h1>{{ t('movingAround.title') }}</h1>
    <h2 v-if="filter.mobility || filter.cognitive">{{ t('movingAround.environmentalConditions.title') }}</h2>
    <div v-if="filter.cognitive" class="_topic">
      <h3>{{ t('movingAround.environmentalConditions.lightingAndSensoryComfort.title') }}</h3>
      <p>{{ t('movingAround.environmentalConditions.lightingAndSensoryComfort.description') }}</p>
      <MuseumMap
          :infoTypes="infoTypes"
          :floors="floors"
          :images="images"
          :showLegend="true"
          :alt-text="lightingMapAlt"
      />
    </div>
    <div v-if="filter.mobility">
      <h3 class="_topic">{{ t('movingAround.environmentalConditions.spaciousLayout.title') }}</h3>
      <p>{{ t('movingAround.environmentalConditions.spaciousLayout.description') }}</p>
    </div>
    <div v-if="filter.mobility || filter.cognitive" class="_topic">
      <h3>{{ t('movingAround.environmentalConditions.accessibleSeating.title') }}</h3>
      <p>{{ t('movingAround.environmentalConditions.accessibleSeating.description') }}</p>
    </div>
    <div  v-if="filter.mobility || filter.cognitive" class="_topic">
      <h3>{{ t('movingAround.environmentalConditions.accessibleRestrooms.title') }}</h3>
      <p>{{ t('movingAround.environmentalConditions.accessibleRestrooms.description') }}</p>
    </div>
    <h2>{{ t('movingAround.navigatingTheMuseum.title') }}</h2>
    <div class="_topic">
      <h3>{{ t('movingAround.navigatingTheMuseum.museumLayout.title') }}</h3>
      <p>{{ t('movingAround.navigatingTheMuseum.museumLayout.description') }}</p>
    </div>
    <MuseumMap
        :infoTypes="mapTypes"
        :floors="floors"
        :images="standardMapImages"
        :showLegend="false"
        :alt-text="museumMapAlt"
    />
    <div  v-if="filter.mobility"  class="_topic">
      <h3>{{ t('movingAround.navigatingTheMuseum.mobilityFriendlyAccess.title') }}</h3>
      <p>{{ t('movingAround.navigatingTheMuseum.mobilityFriendlyAccess.description') }}</p>
    </div>
    <div v-if="filter.blind" class="_topic">
      <h3>{{ t('movingAround.navigatingTheMuseum.supportForBlindOrLowVisionVisitors.title') }}</h3>
      <p>{{ t('movingAround.navigatingTheMuseum.supportForBlindOrLowVisionVisitors.description') }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  filter: {
    type: Object,
    required: true,
  },
});

import {useI18n} from "vue-i18n";
import MuseumMap from "@/components/ContentSections/MuseumMap.vue";

import lightingFirst from '@/assets/images/lightingFirst.png';
import lightingSec from '@/assets/images/lightingSec.png';
import noisesFirst from '@/assets/images/noisesFirst.png';
import noisesSec from '@/assets/images/noisesSec.png';
import museumMapFirst from '@/assets/images/museumMapFirst.png';
import museumMapSec from '@/assets/images/museumMapSec.png';

const infoTypes = ['Noises', 'Lighting'];
const floors = ['1st floor', '2nd floor'];

const mapTypes = ['default'];
const standardMapImages = {
  default: {
    '1st floor': museumMapFirst,
    '2nd floor': museumMapSec,
  },
};

const images = {
  Noises: {
    '1st floor': noisesFirst,
    '2nd floor': noisesSec
  },
  Lighting: {
    '1st floor': lightingFirst,
    '2nd floor': lightingSec
  }
};
const {t} = useI18n();

const museumMapAlt = `
<h1>${t('museumsplan.title')}</h1>
<details>
  <summary>${t('museumsplan.basement.title')}</summary>
  <h3>${t('museumsplan.basement.sections.entrance.title')}</h3>
  <p>${t('museumsplan.basement.sections.entrance.description')}</p>

  <h3>${t('museumsplan.basement.sections.rightWing.title')}</h3>
  <p>${t('museumsplan.basement.sections.rightWing.description')}</p>
  <p>${t('museumsplan.basement.sections.rightWing.highlight')}</p>

  <h3>${t('museumsplan.basement.sections.leftWing.title')}</h3>
  <p>${t('museumsplan.basement.sections.leftWing.description')}</p>
  <ul>
    <li>${t('museumsplan.basement.sections.leftWing.highlight1')}</li>
    <li>${t('museumsplan.basement.sections.leftWing.highlight2')}</li>
  </ul>

  <h3>${t('museumsplan.basement.sections.farLeft.title')}</h3>
  <p>${t('museumsplan.basement.sections.farLeft.description')}</p>
  <ul>
    <li>${t('museumsplan.basement.sections.farLeft.highlight1')}</li>
    <li>${t('museumsplan.basement.sections.farLeft.highlight2')}</li>
    <li>${t('museumsplan.basement.sections.farLeft.highlight3')}</li>
  </ul>
</details>

<details>
  <summary>${t('museumsplan.upperFloor.title')}</summary>
  <h3>${t('museumsplan.upperFloor.sections.leftWing.title')}</h3>
  <ul>
    <li>${t('museumsplan.upperFloor.sections.leftWing.highlight1')}</li>
    <li>${t('museumsplan.upperFloor.sections.leftWing.highlight2')}</li>
    <li>${t('museumsplan.upperFloor.sections.leftWing.highlight3')}</li>
  </ul>

  <h3>${t('museumsplan.upperFloor.sections.rightWing.title')}</h3>
  <p>${t('museumsplan.upperFloor.sections.rightWing.description')}</p>
  <p>${t('museumsplan.upperFloor.sections.rightWing.additional')}</p>

  <h3>${t('museumsplan.upperFloor.sections.centralArea.title')}</h3>
  <p>${t('museumsplan.upperFloor.sections.centralArea.description')}</p>
</details>
`;

const lightingMapAlt = `
  <h1>${t('sensoryPlan.title')}</h1>
  <details>
    <summary>${t('sensoryPlan.basement.title')}</summary>
    <h3>${t('sensoryPlan.lighting')}</h3>
    <ul>
      <li><strong>Left Wing:</strong> ${t('sensoryPlan.basement.lighting.leftWing')}</li>
      <li><strong>Center:</strong> ${t('sensoryPlan.basement.lighting.center')}</li>
      <li><strong>Right Wing:</strong> ${t('sensoryPlan.basement.lighting.rightWing')}</li>
    </ul>

    <h3>${t('sensoryPlan.noises')}</h3>
    <ul>
      <li><strong>Left Wing:</strong> ${t('sensoryPlan.basement.noise.leftWing')}</li>
      <li><strong>Center:</strong> ${t('sensoryPlan.basement.noise.center')}</li>
      <li><strong>Right Wing:</strong> ${t('sensoryPlan.basement.noise.rightWing')}</li>
    </ul>
  </details>

  <details>
    <summary>${t('sensoryPlan.upperFloor.title')}</summary>
    <h3>${t('sensoryPlan.lighting')}</h3>
    <ul>
      <li><strong>Left Wing:</strong> ${t('sensoryPlan.upperFloor.lighting.leftWing')}</li>
      <li><strong>Center:</strong> ${t('sensoryPlan.upperFloor.lighting.center')}</li>
      <li><strong>Right Wing:</strong> ${t('sensoryPlan.upperFloor.lighting.rightWing')}</li>
    </ul>

    <h3>${t('sensoryPlan.noises')}</h3>
    <ul>
      <li><strong>Center:</strong> ${t('sensoryPlan.upperFloor.noise.center')}</li>
      <li><strong>Other Areas:</strong> ${t('sensoryPlan.upperFloor.noise.otherAreas')}</li>
    </ul>
  </details>
`;

</script>

<style scoped>
@reference "@/assets/main.css";

._topic {
  @apply my-2;
}
</style>