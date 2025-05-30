<template>
  <aside aria-hidden="true">
    <div class="search-box">
      <button>

      <img
          v-if="searchTerm !== ''"
          @click="deleteSearchTerm"
          :src="closeIcon"
           class="ml-1 hover:bg-mgrey-lighten-2 p-0 rounded-sm w-[24px]">
      </button>
      <input
          v-model="searchTerm"
          @input="onSearchInput"
          class="search-input rounded-lg" type="text" placeholder="Search for a keyword"/>
      <p v-if="searchTerm !== ''" class="search-items"> {{ foundSearchTerms }} hits</p>
      <button>
        <img v-if="searchTerm !== '' && foundSearchTerms > 0" :src="nextIcon"
             class="next-item"
             @click="goToNextWord"
        >
      </button>
      <div style="width: 0.4rem"></div>
    </div>
    <div v-if="showKeyWordSearchHits" class="not-found">
      <p class="not-found-item">
        {{ completeWordBaseTerms }} results found without filters.
      </p>
      <button class="show-all"
              @click="showAllInformation"
      > Show
      </button>
    </div>

    <h2 class="nav-heading">
      <img
          :src="listIcon"
          class="h-[12px] w-auto mr-2"
      />
      <span>On this page </span>
    </h2>
    <div class="nav-section">
      <div class="hc-exception bg-neutral-200 high-contrast:bg-yellow-300 w-1" style="flex: 0 0 2px; justify-items: center; border-radius: 1px; margin-right: 12px;">
        <div class="bg-neutral-800 hc-exception high-contrast:bg-yellow-300 w-[2px] high-contrast:w-3 high-contrast:border high-contrast:border-black font-medium"
             :style="indicatorBarStyle"></div>
      </div>
      <ul class="nav-list">
        <li class="nav-item"
            :class="currentSectionID === 'before-visit' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button   @click="scrollToSection($event, 'before-visit')">{{
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
            :class="currentSectionID === 'experience-the-exhibition' ? 'font-bold' : 'text-mgrey-darken-2'"
        >
          <button class="text-left" @click="scrollToSection($event, 'experience-the-exhibition')">
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
import {computed, nextTick, onMounted, onUnmounted, ref} from "vue";
import {scrollToPosition} from "@/utils/scroll.js";
import {filter} from "@/storage.js";
import {useColorMode} from "@vueuse/core";

const {t, locale, messages} = useI18n();
import {useThemeDetection} from "@/composables/useThemeDetection.js";
const observedElements = new Set();

let mutationObserver;
let observer = null;
const searchTerm = ref("");
const foundSearchTerms = ref(0);
const completeWordBaseTerms = ref(0);
const scrollToTermOccurence = ref(0);
const { theme } = useThemeDetection()

const listIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/list-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/list.svg', import.meta.url).href
});

const observeSections = () => {
  if (observer) observer.disconnect();

  const beforeVisit = document.getElementById('before-visit');
  const reachingMuseum = document.getElementById('reaching-the-museum');
  const movingAround = document.getElementById('moving-around');
  const experienceExhibition = document.getElementById('experience-the-exhibition');
  const faq = document.getElementById('faq');
  const visitorStories = document.getElementById('visitor-stories');
  console.log(movingAround);

  if (beforeVisit && reachingMuseum && movingAround && faq && visitorStories && experienceExhibition) {
    observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log("Observing sections for intersection changes", entry.target.id);
            if (entry.isIntersecting) {
              currentSectionID.value = entry.target.id;
            }
          });
        },
        {root: null, threshold: 0.05}
    );

    observer.observe(beforeVisit);
    observer.observe(reachingMuseum);
    observer.observe(movingAround);
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
  const navItemHeight = 2.313;

  if (currentSectionID.value === 'before-visit') {
    offset = 0;
  } else if (currentSectionID.value === 'reaching-the-museum') {
    offset = navItemHeight;
  } else if (currentSectionID.value === 'moving-around') {
    offset = navItemHeight * 2;
  } else if (currentSectionID.value === 'experience-the-exhibition') {
    offset = navItemHeight * 3;
  } else if (currentSectionID.value === 'faq') {
    offset = navItemHeight * 4;
  } else {
    offset = navItemHeight * 5;
  }

  return {
    height: "2.313rem",
    borderRadius: "1px",
    transition: "transform 0.2s ease-in-out, height 0.2s ease-in-out",
    transform: `translateY(${offset}rem)`,
  };
});


const scrollToSection = (event, id) => {
  event.preventDefault();
  const target = document.getElementById(id);
  observer.disconnect();
  setTimeout(() => {
    observeSections();
  }, 600);
  currentSectionID.value = id;
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const offset = 5 * rootFontSize;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

  scrollToPosition(targetPosition);
};

const allFilterSelected = computed(() => {
  return filter.value.blind && filter.value.deaf && filter.value.mobility && filter.value.cognitive;
})

const showKeyWordSearchHits = computed(() => {
  return !allFilterSelected.value && searchTerm.value !== '' && completeWordBaseTerms.value > foundSearchTerms.value
})

function onSearchInput() {
  const content = document.getElementById("content");

  removeHighlights(content);

  if (!searchTerm.value) return;

  const regex = new RegExp(searchTerm.value, 'gi');
  const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: node => {
          if (!regex.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;

          let parent = node.parentNode;
          while (parent && parent !== content) {
            if (
                parent.classList?.contains('sr-only') ||
                parent.classList?.contains('screen-reader-only') ||
                parent.getAttribute?.('aria-hidden') === 'true' ||
                parent.getAttribute?.('role') === 'presentation'
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentNode;
          }

          return NodeFilter.FILTER_ACCEPT;        }
      },
      false
  );

  const nodesToProcess = [];
  while (walker.nextNode()) {
    nodesToProcess.push(walker.currentNode);
  }

  nodesToProcess.forEach((textNode, index) => {
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    const text = textNode.nodeValue;
    console.log(textNode);
 /*   if(textNode.Key.contains('sensoryPlan')) {
      return;
    }*/

    text.replace(regex, (match, offset) => {
      const before = text.slice(lastIndex, offset);
      if (before) frag.appendChild(document.createTextNode(before));

      const highlight = document.createElement("span");
      if(index === 0) {
        highlight.className = "hc-exception highlight keyword-focus";
      } else {
        highlight.className = "hc-exception highlight";
      }
      highlight.textContent = match;
      frag.appendChild(highlight);

      lastIndex = offset + match.length;
    });

    const after = text.slice(lastIndex);
    if (after) frag.appendChild(document.createTextNode(after));

    textNode.parentNode.replaceChild(frag, textNode);
  });


  const firstMatch = content.querySelector('.highlight');
  foundSearchTerms.value = content.querySelectorAll('.highlight').length;

  completeWordBaseTerms.value = searchWordBase(searchTerm.value);

  if (firstMatch) {
    scrollToTermOccurence.value = 0;
    firstMatch.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
}

function goToNextWord() {
  const content = document.getElementById("content");
  const spans = content.querySelectorAll('span.keyword-focus');
  spans.forEach(span => {
    span.classList.remove('keyword-focus');
  });

  const words = content.querySelectorAll('.highlight');
  scrollToTermOccurence.value += 1;
  scrollToTermOccurence.value %= words.length;
  const nextWord = words[scrollToTermOccurence.value];
  console.log(nextWord);
  console.log(nextWord.closest('details'));
  if (nextWord) {
    const detailsParent = nextWord.closest('details');
    if (detailsParent && !detailsParent.open) {
      detailsParent.open = true;
    }
    nextWord.scrollIntoView({behavior: 'smooth', block: 'center'});
    nextWord.className = "hc-exception highlight keyword-focus";
  }

}

function searchWordBase(keyword) {
  const currentTranslations = messages.value[locale.value];
  const results = [];
  const excludedKeys = ['navBar', 'sectionIndicator', 'filter', 'insideMuseumSteps', 'carSteps', 'trainSteps', 'sensoryPlan', 'visitorActivity'];

  function search(obj, prefix = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (excludedKeys.includes(key)) {
        return;
      }

      if (typeof value === 'string') {
        const matches = (value.match(new RegExp(keyword, 'gi')) || []).length;
        if (matches > 0) {
          results.push({key: path, value, count: matches});
        }
      } else if (typeof value === 'object' && value !== null) {
        search(value, path);
      }
    });
  }

  search(currentTranslations);

  const totalOccurrences = results.reduce((sum, entry) => sum + entry.count, 0);
  console.log(results);

  return totalOccurrences;
}

const deleteSearchTerm = () => {
  searchTerm.value = '';
  foundSearchTerms.value = 0;
  completeWordBaseTerms.value = 0;
  scrollToTermOccurence.value = 0;

  const content = document.getElementById("content");
  removeHighlights(content);
}

function removeHighlights(root) {
  const highlights = root.querySelectorAll('span.highlight');
  highlights.forEach(span => {
    const textNode = document.createTextNode(span.textContent);
    span.replaceWith(textNode);
    root.normalize();
  });
}

const nextIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/arrow-right-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/arrow-right.svg', import.meta.url).href
});

const closeIcon = computed(() => {
  if (theme.value === 'high-contrast') {
    return new URL('@/assets/icons/close-hc.svg', import.meta.url).href
  }

  if (theme.value === 'color-blind') {
    return new URL('@/assets/icons/selected-color-blind.svg', import.meta.url).href
  }

  return new URL('@/assets/icons/close.svg', import.meta.url).href
});


const showAllInformation = () => {
  filter.value.blind = true;
  filter.value.deaf = true;
  filter.value.mobility = true;
  filter.value.cognitive = true;

  nextTick(() => {
    onSearchInput();
  })
}
</script>

<style scoped>
@reference "@/assets/main.css";

.search-box {
  display: flex;

  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  .search-input {
    width: 100%;
    padding: 8px 12px;

    font-size: 0.875rem;
  }

  .next-item {
    @apply hover:bg-mgrey-lighten-2 rounded-sm;

    width: 20px;
    height: 20px;
    padding: 0.2rem;
    margin-left: 0.4rem;
    margin-right: 0.6rem;
  }

  .search-input:focus {
    outline: none;
    border-color: inherit;
    box-shadow: none;
  }

  .search-items {
    display: inline-block;
    white-space: nowrap;
    font-size: 0.875rem;
  }
}

.not-found {
  display: flex;
  @apply text-mgrey-darken-2;
  margin-top: 0.5rem;

  .not-found-item {
    font-size: 0.875rem;
  }

  .show-all {
    margin-left: 0.1rem;
    text-decoration: underline;
    font-size: 0.875rem;
  }
}


.nav-section {
  color: #1a1a1a;
  display: flex;
}

.nav-heading {
  @apply flex items-center text-mgrey-darken-2;
  font-weight: 600;
  font-size: 0.875rem;
  margin-top: 1.5rem;
  margin-bottom: 12px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

</style>