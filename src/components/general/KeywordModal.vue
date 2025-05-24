<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>Include selected keywords:</h2>
      <div class="keywords">
        <button
            v-for="(keyword, index) in keywords"
            :key="index"
            :class="['keyword-pill', { selected: selectedSet.includes(keyword) }]"
            @click.prevent="toggleKeyword(keyword)"
        >
          {{ keyword }}
        </button>
      </div>
      <button class="close-button" @click.prevent="emitClose">Close</button>
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
const selectedSet = computed(() => filter.value.keywords);

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
.modal-overlay {
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
  max-width: 450px;
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
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 24px;
  background: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  transition: background 0.2s, color 0.2s;
  border: none;
}

.keyword-pill.selected {
  background: #317aa7;
  color: white;
}

.close-button {
  background: #317aa7;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}
</style>
