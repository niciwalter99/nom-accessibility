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
      ref="filter"
      ></Filter>
    </section>

    <section class="mx-auto mt-10 w-full max-w-[1420px] px-8 sm:px-16">
      <div class=" grid grid-cols-1 items-start gap-x-8 lg:grid-cols-article">
        <section-indicator class="sticky top-24 mt-2 hidden w-[260px] lg:block"></section-indicator>
        <Content
            class=" mx-auto w-full max-w-[650px] antialiased"
        @highlight-filter="highlightFilter"
        ></Content>
      </div>

    </section>
  </main>
</template>

<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import SectionIndicator from "./components/SectionIndicator.vue";
import Content from "./components/Content.vue";
import {useI18n} from "vue-i18n";
import Filter from "@/components/Filter.vue";
import {ref} from "vue";

const {t} = useI18n();

const filter = ref(null);

const highlightFilter = () => {
  console.log('call filter');
  if (filter.value) {
    filter.value.highlightFilter();
  }
};
</script>



<style scoped>

.article {
  grid-template-columns: 1fr 4fr 1fr;
}

.image-header {
  font-size: 24px;
  margin-bottom: 0.4rem;
}

.image-desc {
  font-size: 30px;
  max-width: 34rem;
}

</style>
