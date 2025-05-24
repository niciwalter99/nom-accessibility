<template>
  <div class="sr-only">
    <h2>{{ $t('visitorActivity.title') }}</h2>

    <details>
      <summary>{{ $t('visitorActivity.days.monday') }}</summary>
      <p>{{ $t('visitorActivity.closed') }}</p>
    </details>

    <details>
      <summary>{{ $t('visitorActivity.days.tuesday') }}</summary>
      <ul>
        <li>9:00 – {{ $t('visitorActivity.levels.veryQuiet') }}</li>
        <li>10:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>12:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>13:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>15:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>16:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>18:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
      </ul>
    </details>

    <details>
      <summary>{{ $t('visitorActivity.days.wednesday') }}</summary>
      <ul>
        <li>9:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>10:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>12:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>13:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>15:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>16:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>18:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
      </ul>
    </details>

    <details>
      <summary>{{ $t('visitorActivity.days.thursday') }}</summary>
      <ul>
        <li>9:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>10:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>12:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>13:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>15:00 – {{ $t('visitorActivity.levels.peakCrowded') }}</li>
        <li>16:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>18:00 – {{ $t('visitorActivity.levels.busy') }}</li>
      </ul>
    </details>

    <details>
      <summary>{{ $t('visitorActivity.days.friday') }}</summary>
      <ul>
        <li>9:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>10:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>12:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>13:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>15:00 – {{ $t('visitorActivity.levels.peakCrowded') }}</li>
        <li>16:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>18:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
      </ul>
    </details>

    <details>
      <summary>{{ $t('visitorActivity.days.saturday') }}</summary>
      <ul>
        <li>9:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>10:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>12:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>13:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>15:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>16:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>18:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
      </ul>
    </details>

    <details>
      <summary>{{ $t('visitorActivity.days.sunday') }}</summary>
      <ul>
        <li>9:00 – {{ $t('visitorActivity.levels.veryQuiet') }}</li>
        <li>10:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
        <li>12:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>13:00 – {{ $t('visitorActivity.levels.busy') }}</li>
        <li>15:00 – {{ $t('visitorActivity.levels.veryBusy') }}</li>
        <li>16:00 – {{ $t('visitorActivity.levels.moderate') }}</li>
        <li>18:00 – {{ $t('visitorActivity.levels.quiet') }}</li>
      </ul>
    </details>
  </div>

  <div class="my-4">
    <div class="bg-mbeige-base flex  flex-col items-center p-6 rounded-xl mx-auto">
      <div class="flex space-x-6 mb-6">
        <button
            v-for="day in days"
            :key="day"
            @click="(selectedDay = day)"
            class="text-gray-800 relative pb-1 cursor-pointer"
            :class="{
    'font-semibold underline': selectedDay === day,
    'text-gray-500': selectedDay !== day,
  }"
        >
          {{ day }}
        </button>
      </div>

      <div class="relative flex border-t border-gray-300 pt-6 h-50 my-auto">
        <div v-if="selectedDay === 'Mo'" class="text-center text-gray-600 text-sm w-full">
          Closed on Mondays
        </div>
        <div v-else class="flex gap-4 justify-between items-end">
          <div
              v-for="(height, idx) in activity[selectedDay]"
              :key="idx"
              class="flex flex-col items-center w-full"
          >
            <div class="flex-1 flex items-end">
              <div
                  class="bg-gray-500 w-3 rounded-md"
                  :style="{ height: height + 'px' }"
              ></div>
            </div>
            <!-- Label under the bar -->
            <div class="text-xs mt-2 text-gray-700 h-[25px]">
              {{ timeLabels[idx] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const selectedDay = ref('Tu')

// Static example data: bar heights in px
const activity = {
  Mo: [40, 60, 90, 110, 130, 100, 80],
  Tu: [10, 30, 50, 80, 110, 90, 70],
  We: [20, 40, 70, 100, 120, 90, 60],
  Th: [30, 60, 90, 110, 130, 110, 90],
  Fr: [40, 70, 100, 120, 140, 110, 80],
  Sa: [20, 50, 80, 90, 100, 80, 60],
  Su: [10, 30, 60, 80, 90, 70, 50],
}

const timeLabels = ['9:00', ' ', '12:00', '', '15:00', '', '18:00']
</script>

<style scoped>
/* Optional: Customize scrollbar, transitions etc. */
</style>
