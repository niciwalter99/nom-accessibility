<template>
  <NavigationBar></NavigationBar>
  <div class="relative w-full h-96">
    <img
        src="@/assets/images/aussenansicht-nkm.png"
        alt="Naturkundemuseum Karlsruhe von aussen"
        class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black opacity-25"></div>
    <div class="absolute bottom-16 left-16 text-white">
      <h3 class="image-header">{{ t('navBar.accessibility') }}</h3>
      <p class="image-desc">{{ t('navBar.imageDesc') }}</p>
    </div>
  </div>
  <main class="flex grow flex-col">
    <section class="mx-auto mt-10 ">

      <Filter
          :ref="(el) => {filter = el}"
      ></Filter>
      <div v-if="settings.signLanguage" class="mt-3 max-w-3xl bg-mred-lighten-3 text-mred-darken-5 high-contrast:border rounded-md p-4">
        ⚠️ <b>{{ t('beforeVisit.note') }}</b>
        {{ t('beforeVisit.SLNote') }}
      </div>
      <div v-if="settings.language === 'de'"
           class=" max-w-3xl my-2 bg-mred-lighten-3 text-mred-darken-5 high-contrast:border rounded-md p-4">
        ⚠️ <b>{{ t('beforeVisit.note') }}</b>
        {{ t('beforeVisit.languageNote') }}
      </div>

    </section>

    <section class="mx-auto mt-10 w-full h-full max-w-[1420px] px-2 lg:px-8">
      <div class=" grid grid-cols-1 items-start gap-x-8 lg:grid-cols-article">
        <section-indicator class="sticky top-24 mt-2 hidden w-[260px] lg:block" aria-hidden="true"></section-indicator>

        <Content
            id="content"
            class=" mx-auto w-full max-w-[650px] antialiased"
            @highlight-filter="highlightFilter"
            :show-quick-filter="showFilter"
        ></Content>
      </div>

    </section>
  </main>
</template>

<script setup>
import NavigationBar from "./components/general/NavigationBar.vue";
import SectionIndicator from "./components/general/SectionIndicator.vue";
import Content from "./components/Content.vue";
import {useI18n} from "vue-i18n";
import Filter from "@/components/general/Filter.vue";
import {onMounted, onUnmounted, ref} from "vue";
import QuickFilter from "@/components/general/QuickFilter.vue";
import {settings} from "@/storage.js";

const {t} = useI18n();

const filter = ref(null);

const highlightFilter = () => {
  if (filter.value) {
    filter.value.highlightFilter();
  }
};

let observer = null;
const showFilter = ref(false);

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        showFilter.value = true;
      } else {
        showFilter.value = false;
      }
    });
  });

  if (filter.value) {
    observer.observe(filter.value.$el);
  }

});
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});




</script>


<style scoped>

.image-header {
  font-size: 1.5rem;
  margin-bottom: 0.4rem;
}

.image-desc {
  font-size: 1.875rem;
  max-width: 34rem;
}



</style>
