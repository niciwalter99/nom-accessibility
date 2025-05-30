<template>
  <div v-if="show" class="modal-overlay hc-exception">
    <div class="modal-content high-contrast:border-2">
      <h2>Include selected keywords:</h2>
      <div class="keywords">
        <button
            v-for="(keyword, index) in keywords"
            :key="index"
            :class="['hc-exception','keyword-pill', 'high-contrast:border',  selectedSet?.includes(keyword)? 'selected' : '']"
            @click.prevent="toggleKeyword(keyword)"
        >
          {{ keyword }}
        </button>
      </div>
      <button class="close-button high-contrast:border" @click.prevent="emitClose">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed} from 'vue';

 defineProps({
  show: Boolean,
  keywords: {
    type: Array,
    default: () => [],
  }
});

const emit = defineEmits(['close']);

import {filter} from '@/storage.js'
const selectedSet = computed(() => filter.value.keywords ?? []);

function toggleKeyword(keyword) {
  const index = selectedSet.value.indexOf(keyword);
  if (index > -1) {
    const currentKeywords = filter.value.keywords;
    filter.value.keywords = currentKeywords.filter(k => k !== keyword);
  } else {
    filter.value.keywords = [... filter.value.keywords, keyword];
  }
}

function emitClose(event) {
  event.preventDefault();
  event.stopPropagation();
  emit('close', Array.from(selectedSet.value));
}
</script>

<style scoped>
@reference "@/assets/main.css";
.modal-overlay {
  @apply high-contrast:bg-black/80;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 1rem 0;
}

.keyword-pill {
  @apply high-contrast:bg-black text-black high-contrast:border-yellow-300
  border high-contrast:text-yellow-300;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 0.875rem;
  transition: background 0.2s, color 0.2s;
}

.keyword-pill.selected {
  @apply bg-mblue-base high-contrast:bg-yellow-300 high-contrast:text-black;
  color: white;
}

.close-button {
  margin-top: 1rem;
  background: #317aa7;
  color: white;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.875rem;
}
</style>
