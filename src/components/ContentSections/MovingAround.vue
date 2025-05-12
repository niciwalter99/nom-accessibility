<template>
  <section id="moving-around" class="max-w-[650px] p-4">
    <h1>Moving around</h1>
    <h2>Environmental Conditions</h2>
    <ul>
      <li>
        <h3>Lighting & sensory comfort </h3>
        <p>You can use this sensory map to identify sensory-friendly spaces within the museum. This guide identifies
          spaces that are likely to be quieter and less crowded, those with natural and low light, and areas where there
          is usually seating, and you can take a break.</p>
        <MuseumMap></MuseumMap>
      </li>
      <li>
        <h3> Spacious layout </h3>
        <p>Our exhibition spaces and corridors offer enough room to navigate with a wheelchair or walking aid. The
          entrance is equipped with a ramp and electric door openers for smooth access. Two large elevators connect all
          levels of the museum and can accommodate multiple wheelchairs at the same time.</p>
      </li>
      <li>
        <h3>Accessible seating </h3>
        <p>Seating is available throughout the museum, including near exhibit zones, to support visitors who may need to
          rest regularly.</p>
      </li>
      <li>
        <h3> Accessible restrooms</h3>
        <p>An accessible restroom is available on the ground floor and can be opened with a Euro key. A key is also
          available at the front desk upon request. Additionally, a care room with a medical couch, changing table, and
          sink is located on the ground floor.</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import MuseumMap from "@/components/ContentSections/MuseumMap.vue";

const {t} = useI18n();
</script>

<style scoped>


</style>