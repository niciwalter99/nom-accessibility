<template>
  <section id="visitor-stories" class="max-w-[650px]">
    <h1 class="my-4">What other visitors say</h1>
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
    <div class="bg-mbeige-base rounded-md p-4 my-4">
      💡 <b>Note</b>
      We are continuously working to improve the accessibility of our museum for all visitors. If you have any
      questions, feedback, or suggestions for improvement, please don’t hesitate to contact us at
      <a :href="'tel:' + t('beforeVisit.phone')">{{ t('beforeVisit.phone') }}</a>
      {{ t('beforeVisit.or') }}
      <a :href="'mailto: nkm@karlsruhe.de' ">nkm@karlsuhre.de</a>.
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}


</style>