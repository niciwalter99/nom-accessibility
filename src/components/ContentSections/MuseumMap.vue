<template>
  <!--
    Alternative format for screenreader
  -->
  <div class="sr-only">
    <div v-html="altText"></div>
  </div>


  <div class="map-viewer" ref="mapContainer" aria-hidden="true">

    <div class="_inner">
      <button class="fullscreen-btn" @click="toggleFullscreen">
        <img class="icon" src="@/assets/icons/full-screen.svg">
      </button>
      <div class="controls">
        <div v-if="showLegend" class="_legend">
          <div
              v-for="(item, index) in legendLabels"
              :key="index"
              class="_legend-item"
          >
            <div :class="[item.color, 'w-4 h-4 rounded-sm']"/>
            <p class="_label">{{ item.label }}</p>
          </div>
        </div>
        <template v-if="lg">
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
                :class="{ active: selectedInfo === type }"
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
      <div class="map-image">
        <img :src="currentImage" :alt="`Map showing ${selectedInfo} on ${selectedFloor}`"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useScreenSize} from '@/composables/screenSize.js';
import {info} from "autoprefixer";

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

const legendLabels = computed(() => {
  if (selectedInfo.value === 'Noises') {
    return [
      {color: 'bg-mred-lighten-4', label: 'Crowded'},
      {color: 'color', label: 'Less crowded'},
      {color: 'bg-mgreen-lighten-3', label: 'Least crowded'}
    ];
  } else if (selectedInfo.value === 'Lighting') {
    return [
      {color: 'bg-mblue-lighten-4', label: 'Natural light'},
      {color: 'bg-mgreen-lighten-3', label: 'Natural & Artificial light'},
      {color: 'color', label: 'Artificial Light'}
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

</script>

<style scoped>
@reference "@/assets/main.css";



.p {
  font-size: 14px;
}

.fullscreen-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
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
  display: flex;
  align-items: center;
  gap: 0.2rem;

  .color {
    @apply w-4 h-4 rounded-sm;
    background: #F4F4A6;
  }

  ._label {
    width: 100px;
    font-size: 14px;
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
  }
}

.controls {
  display: block;
  width: 200px;
  margin-right: 1rem;
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
  cursor: pointer;
  font-size: 14px;
}

button.active {
  background-color: #eee;
  font-weight: bold;
}

.map-image img {
  width: 100%;
}
</style>