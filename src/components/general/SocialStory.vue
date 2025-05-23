<template>
  <div class="step-navigator">
    <template
        v-if="currentPathKey === '/'"
    >

      <p class="title">
        My visit to the natural history museum frame by frame
      </p>
      <img src="@/assets/images/SocialStory/Start.png" alt="Social Story"/>
      <p class="title">I go to the museum by train</p>
      <button
          class="primary-button"
          @click="nextStep"
      >
        <span>Next →</span>
      </button>
    </template>

    <template v-else>
      <div class="image-wrapper" v-if="currentStepData.image">
        <img :src="currentStepData.image" :alt="'Step ' + (stepIndex + 1)"/>
        <div class="map" v-if="currentStepData.map"
             @click="showMap(currentStepData.map)"
        >
          <img :src="currentStepData.map" alt="Map"/>
        </div>
      </div>

      <p class="caption" v-html="currentStepData.caption"/>

      <div class="options" v-if="currentStepData.options">
        <button
            v-for="(option, i) in currentStepData.options"
            :key="i"
            class="option-button"
            @click="selectPath(option.pathKey)"
        >
          <img class='option-image' :src="option.image" alt="option image"/>
          <p class='option-text' v-html="option.caption"/>
          <span class="option-next">Next →</span>
        </button>
      </div>

      <template v-else>
        <div class="controls">
          <button @click="prevStep" class="nav-button">
            ← Before
          </button>

          <button
              @click="nextStep"
              :disabled="stepIndex === currentPath.length - 1"
              class="nav-button next"
          >
            Next →
          </button>
        </div>
        <p class="step-indicator">
          Step {{ stepIndex + 1 }} of {{ currentPath.length }}</p>
      </template>
    </template>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';


const props = defineProps({
  forkedSteps: {
    type: Object,
    required: true
  },
  startPath: {
    type: String,
    default: 'fork'
  }
});

const currentPathKey = ref('/');
const stepIndex = ref(0);

const currentPath = computed(() => props.forkedSteps[currentPathKey.value]);
const currentStepData = computed(() => currentPath.value[stepIndex.value]);

const selectPath = (pathKey) => {
  currentPathKey.value = pathKey;
  stepIndex.value = 0;
};

const nextStep = () => {
  if (currentPathKey.value === '/') {
    currentPathKey.value = props.startPath;
  } else if (stepIndex.value < currentPath.value.length - 1) {
    stepIndex.value++;
  }
};

const prevStep = () => {
  if (stepIndex.value > 0) {
    stepIndex.value--;
  } else {
    currentPathKey.value = props.startPath;
  }
};
</script>

<style scoped>
@reference "@/assets/main.css";

.title {
  font-size: 30px;
  margin: 1rem;
}

.option-image {
  height: 200px;
}

.option-text {
  height: 200px;
}

.primary-button {
  @apply bg-mblue-base;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.step-navigator {
  max-width: 500px;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;

  .map {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  .map:hover {
    transform: scale(2);
  }

}

.caption {
  font-size: 20px;
  margin: 1rem 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-button {
  @apply bg-mgrey-lighten-4;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.nav-button:hover {
  @apply bg-mgrey-lighten-3;
}

.nav-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.step-indicator {
  font-size: 0.95rem;
  color: #555;
}

.options {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  .option-next:hover {
    @apply bg-mgrey-lighten-4 rounded-md;
  }
}

.option-button {
  flex: 1 1 45%;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 2px solid #ccc;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease; /* Smooth transition */
}

.option-button:hover {
  @apply bg-mgrey-lighten-4;
}

.option-button img {
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}

.option-button span {
  display: block;
  margin-top: 0.5rem;
  font-weight: bold;
}
</style>
