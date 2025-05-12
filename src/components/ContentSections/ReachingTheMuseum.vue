<template>
  <section id="reaching-the-museum" class="max-w-[650px] p-4">
    <h1>Reaching the museum</h1>
    <h2>Getting to the museum</h2>
    <p>Located at Friedrichsplatz in the city center, the Natural History Museum Karlsruhe is easy to reach by public
      transport or by car.</p>
    <ul>
      <li>
        <h3>By train</h3>
        <p>The museum is easily accessible via barrier-free train. The nearest stations are:</p>
        <ul>
          <li>
            Marktplatz(Lines S1/S11, S2, S5, Tram 1)
          </li>
          <li>
            Ettlinger Tor / Staatstheater (Lines S1/S11, S4, S52, S7, S8, Tram 2)
          </li>
        </ul>
        <p>From both stations, it’s a 500 meter walk to the museum. You can find real-time schedules and accessibility
          details on the <a>KVV online journey planner </a></p>
      </li>
      <li>
        <h3> By car</h3>
        <p>If you're arriving by car, take the B10 into the city center and continue into Kriegsstraße. At Ettlinger
          Tor, follow signs toward Stadtmitte (city center).
          Nearby parking garages that are also accessible with a wheelchair include:</p>
        <ul>
          <li>Friedrichsplatz (150 meter walk to the museum)</li>
          <li>Landesbibliothek (150 meter walk to the museum)</li>
          <li>IHK (220 meter walk to the museum)</li>
          <li>ECE Ettlinger Tor Center (300 meter walk to museum)</li>
        </ul>
      </li>
    </ul>
    <h2 class="m-4"> Detailed description</h2>
    <div class="w-full flex gap-8 mb-4">
      <DetailedDescription
          title="My visit by car"
          description="My visit to the natural history museum by car frame by frame"
          :icon=carTravel
      />
      <DetailedDescription
          title="My visit by train"
          description="My visit to the natural history museum by train frame by frame"
          :icon=train
      />
    </div>
    <h3>Lockers</h3>
    <p>

      We offer lockers near the entrance beneath the entry, where you can safely store your personal belongings during
      your visit. To use them you need a 1€ coin. Please remember to empty them the same day, as the museum is not
      responsible for valuables left inside.
    </p>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import DetailedDescription from "@/components/DetailedDescription.vue";
import carTravel from "@/assets/icons/carTravel.png";
import train from "@/assets/icons/train.png";



const {t} = useI18n();
</script>

<style scoped>
@reference "@/assets/main.css";

.title {
  @apply text-2xl;
}


</style>