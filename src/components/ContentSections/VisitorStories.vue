<template>
  <section id="visitor-stories" class="max-w-[650px]">
    <h1 class="my-4">What other visitors say</h1>
    <div class="grid-wrapper">
      <div class="testimonial-grid">
        <TestimonialCard
            :image="girl"
            text="The museum was easy to get around in my wheelchair, and I loved spending time at the aquariums."
            name="Ina Fake"
        />
        <TestimonialCard
            :image="girl"
            text="I appreciated the clear signage and helpful staff throughout the museum."
            name="John Doe"
        />
        <TestimonialCard
            :image="girl"
            text="The audio guides were fantastic and made the experience very enjoyable."
            name="Jane Smith"
        />
        <TestimonialCard
            :image="girl"
            text="The museum's accessibility features exceeded my expectations!"
            name="Alex Johnson"
        />
      </div>
    </div>
    <div class=" mt-4 bg-mbeige-base high-contrast:border rounded-md p-4 cc-default">
      💡 <b>{{ t('beforeVisit.note') }}</b>
      <p v-html=" t('beforeVisit.description2')"></p>
      <a :href="'tel:' + t('beforeVisit.phone')">{{ t('beforeVisit.phone') }}</a>
      {{ t('beforeVisit.or') }}
      <a :href="'mailto: nkm@karlsruhe.de' " class="cc-pointer">nkm@karlsruhe.de</a>.
      {{ t('beforeVisit.voiceCalls') }}
    </div>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import TestimonialCard from "@/components/general/TestimonialCard.vue";
import girl from '@/assets/images/girl.png';

const {t} = useI18n();
</script>

<style scoped>
.testimonial-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  container-type: inline-size;
}

@container (min-width: 40rem) {
  .testimonial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-wrapper {
  container-type: inline-size;
}


</style>