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
            :class="currentSectionID === 'before-visit' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'before-visit')">{{
              t('sectionIndicator.beforeYouVisit')
            }}
          </button>
        </li>
        <li
            class="nav-item list"
            :class="currentSectionID === 'reaching-the-museum' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'reaching-the-museum')">{{
              t('sectionIndicator.reachingTheMuseum')
            }}
          </button>
        </li>
        <li class="nav-item"
            :class="currentSectionID === 'moving-around' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'moving-around')">{{ t('sectionIndicator.movingAround') }}</button>
        </li>
        <li class="nav-item"
            :class="currentSectionID === 'navigating-the-museum' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'navigating-the-museum')">Navigating the museum</button>
        </li>
        <li class="nav-item"
            :class="currentSectionID === 'experience-the-exhibition' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'experience-the-exhibition')">
            {{ t('sectionIndicator.experienceTheExhibition') }}
          </button>
        </li>
        <li class="nav-item"
            :class="currentSectionID === 'faq' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'faq')">{{ t('sectionIndicator.faq') }}</button>
        </li>
        <li class="nav-item"
            :class="currentSectionID === 'visitor-stories' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button @click="scrollToSection($event, 'visitor-stories')">{{
              t('sectionIndicator.visitorStories')
            }}
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>

import {useI18n} from "vue-i18n";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {scrollToPosition} from "@/utils/scroll.js";

const {t} = useI18n();
const observedElements = new Set();

let mutationObserver;
let observer = null;

const observeSections = () => {
  if (observer) observer.disconnect();

  const beforeVisit = document.getElementById('before-visit');
  const reachingMuseum = document.getElementById('reaching-the-museum');
  const movingAround = document.getElementById('moving-around');
  const navigatingMuseum = document.getElementById('navigating-the-museum');
  const experienceExhibition = document.getElementById('experience-the-exhibition');
  const faq = document.getElementById('faq');
  const visitorStories = document.getElementById('visitor-stories');

  if (beforeVisit && reachingMuseum && movingAround && navigatingMuseum && faq && visitorStories && experienceExhibition) {
    console.log('observe');
    observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('intersecting', entry.target.id);
              currentSectionID.value = entry.target.id;
            }
          });
        },
        {root: null, threshold: 0.3}
    );

    observer.observe(beforeVisit);
    observer.observe(reachingMuseum);
    observer.observe(movingAround);
    observer.observe(navigatingMuseum);
    observer.observe(experienceExhibition);
    observer.observe(faq);
    observer.observe(visitorStories);
  }
};

onMounted(() => {
  observeSections();

  mutationObserver = new MutationObserver(() => {
    observeSections();
  });

  mutationObserver.observe(document.body, {childList: true, subtree: true});
});

onUnmounted(() => {
  mutationObserver.disconnect();

});

const currentSectionID = ref("before-visit");

const indicatorBarStyle = computed(() => {
  let offset = 0;
  const navItemHeight = 37;

  if (currentSectionID.value === 'before-visit') {
    offset = 0;
  } else if (currentSectionID.value === 'reaching-the-museum') {
    offset = navItemHeight;
  } else if (currentSectionID.value === 'moving-around') {
    offset = navItemHeight * 2;
  } else if (currentSectionID.value === 'navigating-the-museum') {
    offset = navItemHeight * 3;
  } else if (currentSectionID.value === 'experience-the-exhibition') {
    offset = navItemHeight * 4;
  } else if (currentSectionID.value === 'faq') {
    offset = navItemHeight * 5;
  } else {
    offset = 37 * 6;
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
  observer.disconnect();
  setTimeout(() => {
    observeSections(); // Re-observe all sections
  }, 600);
  currentSectionID.value = id;
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