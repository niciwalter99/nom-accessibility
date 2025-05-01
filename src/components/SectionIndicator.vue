<template>
  <aside class="sidebar" aria-hidden="true">
    <div class="search-box">
      <input type="text" placeholder="Search for a keyword" class="search-input"/>
    </div>


    <h2 class="nav-heading">
      <img
          src="@/assets/icons/list.svg"
          class="h-[12px] w-auto mr-2"
      />
      <span>On this page </span>
    </h2>
    <div class="nav-section">
      <div class="bg-neutral-200" style="flex: 0 0 2px; border-radius: 1px; margin-right: 12px;">
        <div class="bg-neutral-800 font-medium"
             :style="indicatorBarStyle"></div>
      </div>
      <ul class="nav-list">
        <li class="nav-item"
            :class="currentSectionID === 'introduction' ? 'font-bold' : 'text-mgrey-darken-2'"
        ><a @click="scrollToSection($event, 'introduction')">{{
            t('sectionIndicator.beforeYouVisit')
          }}</a></li>
        <li
            class="nav-item list"
            :class="currentSectionID === 'content' ? 'font-bold' : 'text-mgrey-darken-2'"
        ><a @click="scrollToSection($event, 'content')">{{
            t('sectionIndicator.reachingTheMuseum')
          }}</a></li>
        <li class="nav-item"
            :class="currentSectionID === 'end' ? 'font-bold' : 'text-mgrey-darken-2'"
        ><a @click="scrollToSection($event, 'end')">{{ t('sectionIndicator.movingAround') }}</a>
        </li>
        <li class="nav-item">{{ t('sectionIndicator.experienceTheExhibition') }}</li>
        <li class="nav-item">{{ t('sectionIndicator.faq') }}</li>
        <li class="nav-item">{{ t('sectionIndicator.visitorStories') }}</li>
      </ul>
    </div>
  </aside>
</template>

<script setup>

import {useI18n} from "vue-i18n";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {scrollToPosition} from "@/utils/scroll.js";

const {t} = useI18n();

let mutationObserver;
onMounted(() => {
  const observeSections = () => {
    const intro = document.getElementById('introduction');
    const content = document.getElementById('content');
    const end = document.getElementById('end');

    if (intro && content && end) {
      const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                console.log('intersect', entry.target.id);
                currentSectionID.value = entry.target.id;
              }
            });
          },
          {root: null, threshold: 0.2}
      );

      observer.observe(intro);
      observer.observe(content);
      observer.observe(end);
    }
  };

  mutationObserver = new MutationObserver(() => {
    observeSections();
  });

  mutationObserver.observe(document.body, {childList: true, subtree: true});
});

onUnmounted(() => {
  mutationObserver.disconnect();

});

const currentSectionID = ref("introduction");

const indicatorBarStyle = computed(() => {
  let offset = 0;
  const navItemHeight = 37;

  if (currentSectionID.value === 'introduction') {
    offset = 0;
  } else if (currentSectionID.value === 'content') {
    offset = navItemHeight;
  } else if (currentSectionID.value === 'end') {
    offset = navItemHeight * 2;
  } else {
    offset = 37 * 3;
  }


  return {
    height: "24px",
    borderRadius: "1px",
    transition: "transform 0.2s ease-in-out, height 0.2s ease-in-out",
    transform: `translateY(${offset}px)`,
  };
});



const scrollToSection = (event, id) => {
  event.preventDefault();
  const target = document.getElementById(id);
  const offset = 80;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

  scrollToPosition(targetPosition);
};
</script>

<style scoped>
@reference "@/assets/main.css";

.search-box {
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
}

.nav-section {
  color: #1a1a1a;
  display: flex;
}

.nav-heading {
  @apply flex items-center text-mgrey-darken-2;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item:first-child {
  padding: 0 0 8px 0;
}

.nav-item {
  padding: 8px 0;
  font-size: 14px;
  cursor: default;
}

</style>