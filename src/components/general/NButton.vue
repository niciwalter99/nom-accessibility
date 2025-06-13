<template>
  <button
      :class="[
      'hc-exception nav-button',
      variantClass,
      { 'disabled': disabled }
    ]"
      :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'secondary',
    validator: (v) => ['primary', 'secondary', 'tertiary'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const variantClass = {
  primary: 'nav-button--primary',
  secondary: 'nav-button--secondary',
  tertiary: 'nav-button--tertiary'
}[props.variant]

</script>

<style scoped>
@reference "@/assets/main.css";

.nav-button {
  @apply px-4 py-2 rounded-md font-medium ;
  transition: all 0.2s ease-in-out;
}

.nav-button:disabled {
  @apply opacity-40 cursor-not-allowed;
}

.nav-button--secondary {
  @apply bg-mgrey-lighten-4 hover:bg-mgrey-lighten-3
  high-contrast:border
  high-contrast-hover:bg-yellow-300 high-contrast-hover:text-black;
}

.nav-button--primary {
  @apply bg-mblue-darken-1 text-white hover:bg-mblue-darken-1
  high-contrast:bg-black high-contrast:bg-yellow-300 high-contrast:text-black
  high-contrast-hover:bg-black high-contrast-hover:text-yellow-300 high-contrast-hover:border;
}

.nav-button--tertiary {
  @apply bg-transparent text-blue-600 underline hover:text-blue-800
 high-contrast:border
  high-contrast-hover:bg-yellow-300 high-contrast-hover:text-black;
}

</style>