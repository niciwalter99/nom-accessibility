<template>
<!--  <div class="sr-only">
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
  </div>-->

  <div class="my-4">
    <div class="bg-mbeige-base flex  flex-col items-center p-6 rounded-xl mx-auto high-contrast:border">
      <div class="w-full overflow-x-auto mb-6">
        <div class="flex justify-center space-x-6 px-2">
          <button
              v-for="day in days"
              :key="day"
              @click="selectDay(day)"
              class="text-gray-800 relative pb-1 whitespace-nowrap"
              :class="{
          'font-semibold underline': selectedDay === day,
          'text-gray-500': selectedDay !== day
        }"
          >
            {{ day }}
          </button>
        </div>
      </div>

      <div class="relative border-t border-gray-300 pt-6 w-full overflow-x-auto" aria-hidden="true">
        <div class="flex justify-center gap-4 items-end content-end  h-[200px] overflow-y-hidden">
          <div v-if="selectedDay === 'Mo'" class="text-center text-gray-600 text-sm w-full">
            Closed on Mondays
          </div>
          <div v-else class="flex gap-4 items-end">
            <div
                v-for="(height, idx) in activity[selectedDay]"
                :key="idx"
                class="flex flex-col items-center justify-end"
            >
              <div class="flex-1 flex items-end">
                <div
                    class="bg-gray-500 w-3 rounded-md hc-exception high-contrast:bg-yellow-300"
                    :style="{ height: height + 'px' }"
                ></div>
              </div>
              <div class="text-xs mt-2 text-gray-700 h-[40px] whitespace-nowrap">
                {{ timeLabels[idx] }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {SRMessage} from "@/composables/ScreenReaderStatus.js";

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const selectedDay = ref('Tu')

// Static example data: bar heights in px
const activity = {
  Mo: [40, 60, 90, 110, 130, 100, 80],
  Tu: [10, 30, 50, 80, 110, 90, 70],
  We: [20, 40, 70, 100, 120, 90, 60],
  Th: [20, 50, 80, 90, 100, 80, 60],
  Fr: [10, 30, 60, 80, 90, 70, 50],
  Sa: [30, 60, 90, 110, 130, 110, 90],
  Su: [40, 70, 100, 120, 140, 110, 80],
}

const selectDay = (day) => {
  selectedDay.value = day

  switch (day) {
    case 'Mo':
      SRMessage('Monday is closed');
      break;
    case 'Tu':
      // Example: Tu activity data
      SRMessage('Tuesday is normally not very crowded. Peak times are around 13:00 and 16:00.');

      break;
    case 'We':
      SRMessage('Wednesday is normally not very crowded. Peak times are around 13:00 and 16:00.');
      break;
    case 'Th':
      SRMessage('Thursday is normally not very crowded. Peak times are around 13:00 and 16:00.');
      break;
    case 'Fr':
      SRMessage('Friday is normally moderately crowded. Peak times are around 14:00 and 17:00.');
      break;
    case 'Sa':
      SRMessage('Saturday is normally more crowded. Peak times are around 12:00 and 17:00.');
      break;
    case 'Su':
      SRMessage('Sunday is normally more crowded. Peak times are around 12:00 and 17:00.');
      break;
    default:
      console.warn('Unknown day selected:', day);
      break;
  }
}

const timeLabels = ['9:00', ' ', '12:00', '', '15:00', '', '18:00']
</script>

<style scoped>
/* Optional: Customize scrollbar, transitions etc. */
</style>
