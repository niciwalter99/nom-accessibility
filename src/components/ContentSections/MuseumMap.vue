<template>
  <!--
    Alternative format for screenreader
  -->
  <div class="sr-only">
    <div v-html="altText"></div>
  </div>


  <div class="map-viewer high-contrast:border" ref="mapContainer" aria-hidden="true">
    <div class="_inner ">
      <button class="fullscreen-btn" @click="toggleFullscreen">
        <img class="icon" :src="fullScreenIcon">
      </button>
      <div class="controls">
        <div v-if="showLegend" class="_legend">
          <div
              v-for="(item, index) in legendLabels"
              :key="index"
              class="_legend-item hc-exception"
          >
            <img class="w-4 h-4 my-2 bg-white rounded-sm hc-exception"
            :src="item.color"
            />
            <p class="_label">{{ item.label }}</p>
          </div>
        </div>
        <template v-if="lg || settings.largeText">
          <div class="lg-controls">
            <select
                v-if="infoTypes.length > 1"
                class="_select"
                v-model="selectedInfo">
              <option v-for="type in infoTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <select class="_select" v-model="selectedFloor">
              <option v-for="floor in floors" :key="floor" :value="floor">
                {{ floor }}
              </option>
            </select>
          </div>
        </template>
        <template v-else>
          <div
              v-if="infoTypes.length > 1"
              class="info-buttons">
            <button
                v-for="type in infoTypes"
                :key="type"
                :class="selectedInfo === type? 'active high-contrast:border-5' : ''"
                @click="selectedInfo = type"
            >
              {{ type }}
            </button>
          </div>
          <div class="floor-buttons">
            <button
                v-for="floor in floors"
                :key="floor"
                :class="{ active: selectedFloor === floor }"
                @click="changeFloor(floor)"
            >
              {{ floor }}
            </button>
          </div>
        </template>
      </div>
      <div class="map-image high-contrast:rounded-lg">
        <img
            class="hc-exception bg-white high-contrast:p-4 high-contrast:rounded-lg"
            :src="currentImage" :alt="`Map showing ${selectedInfo} on ${selectedFloor}`"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useScreenSize} from '@/composables/screenSize.js';
import {info} from "autoprefixer";
import {useThemeDetection} from "@/composables/useThemeDetection.js";

// Props
const props = defineProps({
  infoTypes: {
    type: Array,
    default: () => [],
  },
  floors: {
    type: Array,
    default: () => ['1st floor', '2nd floor']
  },
  images: {
    type: Object,
    required: true
    /*
      Format example:
      {
        Noises: {
          '1st floor': 'path/to/noise1.png',
          '2nd floor': 'path/to/noise2.png'
        },
        Lighting: {
          '1st floor': 'path/to/light1.png',
          '2nd floor': 'path/to/light2.png'
        }
      }
    */
  },
  showLegend: {
    type: Boolean,
    default: true
  },
  altText: {
    type: String,
    default: ''
  }
});

const {lg} = useScreenSize();

const selectedInfo = ref(props.infoTypes[0]);
const selectedFloor = ref(props.floors[0]);

const currentImage = computed(() => {
  return props.images?.[selectedInfo.value]?.[selectedFloor.value] || '';
});

import blue from '@/assets/images/blue.svg';
import dots from '@/assets/images/dots.svg';
import lines from '@/assets/images/lines.png';
import red from '@/assets/images/red.svg';
import {settings} from "@/storage.js";

const legendLabels = computed(() => {
  if (selectedInfo.value === 'Noises') {
    return [
      {color: red, label: 'Crowded'},
      {color: lines, label: 'Less crowded'},
      {color: dots, label: 'Least crowded'}
    ];
  } else if (selectedInfo.value === 'Lighting') {
    return [
      {color: blue, label: 'Natural light'},
      {color: dots, label: 'Natural & Artificial light'},
      {color: lines, label: 'Artificial Light'}
    ];
  }
  return [];
});

const changeFloor = (floor) => {
  selectedFloor.value = floor;
};

const mapContainer = ref(null);

const toggleFullscreen = () => {
  const el = mapContainer.value;
  if (!el) return;

  if (!document.fullscreenElement) {
    el.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
};

const { theme } = useThemeDetection()

const fullScreenIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/full-screen-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/full-screen.svg', import.meta.url).href
});

</script>

<style scoped>
@reference "@/assets/main.css";



.p {
  font-size: 0.875rem;
}

.fullscreen-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  box-sizing: border-box;
  width: auto;

  .icon {
    width: 20px;
    height: 20px;
  }
}

.fullscreen-btn .icon {
  width: 20px;
  height: 20px;
}

.fullscreen-btn:hover {
  @apply rounded-sm bg-mgrey-lighten-3;
}

._legend-item {
  @apply my-1;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  .color {
    @apply w-4 h-4 rounded-sm;
    background: #F4F4A6;
  }

  ._label {
    font-size: 0.875rem;
  }
}

._select {
  @apply border border-mgrey-lighten-3 rounded-sm text-sm;
}

.map-viewer {
  @apply bg-mbeige-base p-4 rounded-xl;
  display: flex;
  justify-content: center;

  ._inner {
    @apply rounded-xl;
    padding: 2rem 1rem;
    display: flex;
    position: relative;
    align-items: center;
    background: white;
    width: 100%;
  }
}

.controls {
  display: block;
  width: 10rem;
  flex-shrink: 0;
  margin-right: 1rem;
}

.map-image img {
  flex: 1 1 0%; /* take up remaining space */
  min-width: 0;  /* prevent overflow from content like images */
  overflow: hidden;
}

.lg-controls {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 1040px) {
  .map-viewer ._inner {
    display: block;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }
}

.info-buttons,
.floor-buttons {
  gap: 0.5rem;
  margin-top: 2rem;
  flex-direction: column;
  display: flex;
  flex-wrap: nowrap;
}

button {
  @apply border border-mgrey-lighten-3 rounded-sm;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.5rem;
  width: 6rem;
  font-size: 0.875rem;
}

button.active {
  @apply high-contrast:border-5;
  background-color: #eee;
  font-weight: bold;
}


</style>