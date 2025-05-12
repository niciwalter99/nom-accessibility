<template>
  <section id="faq" class="max-w-[650px] p-4">
    <h1>Frequently asked questions (FAQ) </h1>
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Häufig gestellte Fragen (FAQ)</h2>
      <details>
        <summary><b>Kann ich Tickets online kaufen?</b></summary>
        <p>Nein, Tickets sind nur am Eingang erhältlich. Online-Verkäufe werden derzeit nicht angeboten.</p>
      </details>

      <details>
        <summary><b>Gibt es eine zeitliche Begrenzung für den Besuch?</b></summary>
        <p>Nein, Sie können während der Öffnungszeiten so lange bleiben, wie Sie möchten.</p>
      </details>

      <details>
        <summary><b>Gibt es etwas zu essen im Museum und ist der Bereich zugänglich?</b></summary>
        <p>Ja, im ersten Obergeschoss befindet sich eine Cafeteria in zentraler Lage. Sie ist rollstuhlgerecht und mit taktiler Leitführung ausgestattet. Der Platz ist jedoch begrenzt, und es kann voll werden.</p>
      </details>

      <details>
        <summary><b>Wo sind die Toiletten, und sind sie barrierefrei?</b></summary>
        <p>Toiletten befinden sich im Erdgeschoss direkt hinter der Treppe sowie im Obergeschoss in der Nähe der Cafeteria. Eine barrierefreie Toilette ist im Erdgeschoss vorhanden und kann mit einem Euro-Key genutzt werden. Falls Sie keinen eigenen Schlüssel haben, erhalten Sie einen an der Information.</p>
      </details>

      <details>
        <summary><b>Gibt es inklusive Führungen?</b></summary>
        <p>Ja, wir bieten inklusive Führungen für blinde und gehörlose Personen an. Für gehörlose Besucher:innen gibt es Führungen in Gebärdensprache. Für blinde Besucher:innen bieten wir beschreibende Sprache und tastbare Elemente. Führungen für schwerhörige Personen mit technischen Hörhilfen (z. B. Mikrofon oder Lautsprechersystem) werden derzeit nicht angeboten.</p>
      </details>

      <details>
        <summary><b>Darf ich im Museum fotografieren?</b></summary>
        <p>Ja, das Fotografieren ist erlaubt. Bitte verzichten Sie jedoch auf Blitzlicht – insbesondere in den Bereichen mit lebenden Tieren.</p>
      </details>
    </section>
  </section>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<style scoped>


</style>