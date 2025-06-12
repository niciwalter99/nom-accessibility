<template>
  <div
      :class="{ 'navbar--hidden': !showNavbar }"
      class="navbar top-0 z-20 h-20 flex justify-between items-center px-6 bg-white border border-white border-b-mgrey-lighten-3"
  >
    <div class="flex items-center space-x-2">
      <img
          v-if="theme !== 'high-contrast'"
          src="@/assets/images/logo.png"
          class="h-14 w-auto"
          aria-hidden="true"
      />
      <p v-else aria-hidden="true">Naturkundemuseum Karlsruhe</p>
      <span class="sr-only">Naturkundemuseum Karlsruhe</span>
    </div>

    <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="lg:hidden focus:outline-none"
        aria-label="Toggle menu"
    >
      <svg
          v-if="!isMobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-mgrey-darken-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-mgrey-darken-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <nav
        class="hidden lg:flex items-center space-x-6 text-base text-mgrey-darken-2"
    >
      <AccessibilityMenu />
      <LanguageButtons />
    </nav>

    <div
        v-if="isMobileMenuOpen"
        class="absolute top-20 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col px-6 py-4 space-y-4 lg:hidden"
    >
      <AccessibilityMenu />
      <LanguageButtons />
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import { useThemeDetection } from "@/composables/useThemeDetection.js"
import AccessibilityMenu from "@/components/general/AccessibilityMenu.vue"
import LanguageButtons from "@/components/general/LanguageButtons.vue"

const { theme } = useThemeDetection()
const isMobileMenuOpen = ref(false)
const showNavbar = ref(true)

let lastScroll = 0
const scrollThreshold = 10 // Minimum scroll distance to trigger hide/show

function handleScroll() {
  let currentScroll = window.scrollY
  const scrollDifference = Math.abs(currentScroll - lastScroll)

  if (scrollDifference < scrollThreshold) return

  if (currentScroll > lastScroll && currentScroll > 60) {
    showNavbar.value = false
/*
    isMobileMenuOpen.value = false
*/
  } else if (currentScroll < lastScroll) {
    showNavbar.value = true
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}

</style>