<template>
  <section id="reaching-the-museum" class="max-w-[650px]">
    <h1>{{ t('reachingTheMuseum.title') }}</h1>
    <h2>{{ t('reachingTheMuseum.gettingToMuseum.title') }}</h2>
    <p v-if="!settings.signLanguage">{{ t('reachingTheMuseum.gettingToMuseum.description') }}</p>
    <!--
        // TODO change video
-->
    <video v-if="settings.signLanguage" autoplay loop muted playsinline>
      <source src="@/assets/SL/reachingMuseum.webm" type="video/webm">
    </video>
    <h3>{{ t('reachingTheMuseum.byTrain.title') }}</h3>
    <p>{{ t('reachingTheMuseum.byTrain.description') }}</p>
    <ul>
      <li>{{ t('reachingTheMuseum.byTrain.stations.marktplatz') }}</li>
      <li>{{ t('reachingTheMuseum.byTrain.stations.ettlingerTor') }}</li>
    </ul>
    <p>{{ t('reachingTheMuseum.byTrain.walkDescription') }}</p>
    <h3>{{ t('reachingTheMuseum.byCar.title') }}</h3>
    <p>{{ t('reachingTheMuseum.byCar.description') }}</p>
    <ul>
      <li>{{ t('reachingTheMuseum.byCar.parking.friedrichsplatz') }}</li>
      <li>{{ t('reachingTheMuseum.byCar.parking.landesbibliothek') }}</li>
      <li>{{ t('reachingTheMuseum.byCar.parking.ihk') }}</li>
      <li>{{ t('reachingTheMuseum.byCar.parking.ece') }}</li>
    </ul>

    <h2 class="my-4">{{ t('reachingTheMuseum.detailedDescription.title') }}</h2>
    <div class="w-full flex gap-8 mb-4">
      <DetailedDescription
          :title="t('reachingTheMuseum.detailedDescription.byCar.title')"
          :description="t('reachingTheMuseum.detailedDescription.byCar.description')"
          :icon="carTravel"
          @click="isCarTravelOpen = true"
      />
      <Dialog v-model:modelValue="isCarTravelOpen"
              class="_dialog">
        <SocialStory :forkedSteps="carSteps" start-path="start"/>

      </Dialog>
      <Dialog v-model:modelValue="isTrainTravelOpen"
              class="_dialog">
        <SocialStory :forkedSteps="trainSteps"/>
      </Dialog>
      <DetailedDescription
          :title="t('reachingTheMuseum.detailedDescription.byTrain.title')"
          :description="t('reachingTheMuseum.detailedDescription.byTrain.description')"
          :icon="train"
          @click="isTrainTravelOpen = true"
      />
    </div>
    <div class="my-4">
      <div class="flex">
        <h3>{{ t('reachingTheMuseum.lockers.title') }}</h3>
        <AdditionalImage
        :img-src="Locker"
        ></AdditionalImage>
      </div>
      <p v-if="!settings.signLanguage">{{ t('reachingTheMuseum.lockers.description') }}</p>
      <video v-else autoplay loop muted playsinline>
        <source src="@/assets/SL/Locker.webm" type="video/webm">
      </video>
    </div>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import DetailedDescription from "@/components/general/DetailedDescription.vue";
import Dialog from "@/components/general/Dialog.vue";
import carTravel from "@/assets/icons/carTravel.png";
import train from "@/assets/icons/train.png";
import {ref} from "vue";

import MS from "@/assets/images/SocialStory/ms.png";
import M3 from "@/assets/images/SocialStory/M3.png";
import M4 from "@/assets/images/SocialStory/M4.png";
import M1 from "@/assets/images/SocialStory/M1.png";
import M5 from "@/assets/images/SocialStory/M5.png";
import M2 from "@/assets/images/SocialStory/M2.png";
import M6 from "@/assets/images/SocialStory/M6.png";
import ET1 from "@/assets/images/SocialStory/ET1.png";
import ET2 from "@/assets/images/SocialStory/ET2.png";
import ET3 from "@/assets/images/SocialStory/ET3.png";
import ET4 from "@/assets/images/SocialStory/ET4.png";
import ET5 from "@/assets/images/SocialStory/ET5.png";
import ET6 from "@/assets/images/SocialStory/ET6.png";
import ETS from "@/assets/images/SocialStory/ETS.png";
import map1 from "@/assets/images/SocialStory/map1.svg";
import map4 from "@/assets/images/SocialStory/map4.svg";
import map5 from "@/assets/images/SocialStory/map5.svg";
import map6 from "@/assets/images/SocialStory/map6.svg";
import map7 from "@/assets/images/SocialStory/map7.svg";
import map8 from "@/assets/images/SocialStory/map8.svg";
import map9 from "@/assets/images/SocialStory/map9.svg";
import map10 from "@/assets/images/SocialStory/map10.svg";
import map11 from "@/assets/images/SocialStory/map11.svg";
import C1 from "@/assets/images/SocialStory/C1.png";
import C2 from "@/assets/images/SocialStory/C2.png";
import C3 from "@/assets/images/SocialStory/C3.png";
import C4 from "@/assets/images/SocialStory/C4.png";
import C5 from "@/assets/images/SocialStory/C5.png";
import C6 from "@/assets/images/SocialStory/C6.png";
import C7 from "@/assets/images/SocialStory/C7.png";
import TE1 from "@/assets/images/SocialStory/TE1.png";
import TE2 from "@/assets/images/SocialStory/TE2.png";
import TE3 from "@/assets/images/SocialStory/TE3.png";
import TE4 from "@/assets/images/SocialStory/TE4.png";
import TE5 from "@/assets/images/SocialStory/TE5.png";
import TE6 from "@/assets/images/SocialStory/TE6.png";
import ME3 from "@/assets/images/SocialStory/ME3.svg";
import ME4 from "@/assets/images/SocialStory/ME4.svg";
import ME5 from "@/assets/images/SocialStory/ME5.svg";
import ME6 from "@/assets/images/SocialStory/ME6.svg";
import Locker from "@/assets/images/Locker.png"


import SocialStory from "@/components/general/SocialStory.vue";
import AdditionalImage from "@/components/general/AdditionalImage.vue";

const {t} = useI18n();
const isTrainTravelOpen = ref(false);
const isCarTravelOpen = ref(false);
import {settings} from "@/storage.js";


const insideMusemSteps = [
  {
    image: M1,
    caption: t('insideMuseumSteps.step1.caption'),
    map: map7,
  },
  {
    image: M2,
    caption: t('insideMuseumSteps.step2.caption'),
    map: map8,
  },
  {
    image: M3,
    caption: t('insideMuseumSteps.step3.caption'),
    map: map9,
  },
  {
    image: M4,
    caption: t('insideMuseumSteps.step4.caption'),
    map: map9,
  },
  {
    image: M5,
    caption: t('insideMuseumSteps.step5.caption'),
    map: map10,
  },
  {
    image: M6,
    caption: t('insideMuseumSteps.step6.caption'),
    map: map11,
  }
];

const carSteps = {
  start: [
    {
      image: C1,
      caption: t('carSteps.start.step1.caption'),
    },
    {
      image: C2,
      caption: t('carSteps.start.step2.caption'),
    },
    {
      image: C3,
      caption: t('carSteps.start.step3.caption'),
    },
    {
      image: C4,
      caption: t('carSteps.start.step4.caption'),
    },
    {
      image: C5,
      caption: t('carSteps.start.step5.caption'),
    },
    {
      image: C6,
      caption: t('carSteps.start.step6.caption'),
    },
    {
      image: C7,
      caption: t('carSteps.start.step7.caption'),
    },
    ...insideMusemSteps,
  ]
};

const trainSteps = {
  fork: [
    {
      options: [
        {
          image: MS,
          caption: t('trainSteps.fork.option1.caption'),
          pathKey: 'pathA',
        },
        {
          image: ETS,
          caption: t('trainSteps.fork.option2.caption'),
          pathKey: 'pathB',
        }
      ]
    }
  ],
  pathA: [
    {
      image: ET1,
      caption: t('trainSteps.pathA.step1.caption'),
    },
    {
      image: ET2,
      caption: t('trainSteps.pathA.step2.caption'),
    },
    {
      image: ET3,
      caption: t('trainSteps.pathA.step3.caption'),
      map: map1,
    },
    {
      image: ET4,
      caption: t('trainSteps.pathA.step4.caption'),
      map: map4,
    },
    {
      image: ET5,
      caption: t('trainSteps.pathA.step5.caption'),
      map: map5,
    },
    {
      image: ET6,
      caption: t('trainSteps.pathA.step6.caption'),
      map: map6,
    },
    ...insideMusemSteps,
  ],
  pathB: [
    {
      image: TE1,
      caption: t('trainSteps.pathB.step1.caption'),
    },
    {
      image: TE2,
      map: ME3,
      caption: t('trainSteps.pathB.step2.caption'),
    },
    {
      image: TE3,
      map: ME3,
      caption: t('trainSteps.pathB.step3.caption'),
    },
    {
      image: TE4,
      map: ME4,
      caption: t('trainSteps.pathB.step4.caption'),
    },
    {
      image: TE5,
      map: ME5,
      caption: t('trainSteps.pathB.step5.caption'),
    },
    {
      image: TE6,
      map: ME6,
      caption: t('trainSteps.pathB.step6.caption'),
    },
    ...insideMusemSteps,
  ]
};


</script>


<style scoped>
@reference "@/assets/main.css";


.title {
  @apply text-2xl;
}

.h1, h2, h3 {
  @apply my-2;
}
</style>