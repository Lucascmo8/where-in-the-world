<template>
  <header class="darkStyleComponent">
    <h1>Where in the world?</h1>
    <button @click="darkModeStore.toggleMode">
      <i
        class="uil"
        :class="{
          'uil-moon': useDarkModeStore().isDarkMode,
          'uil-sun': !useDarkModeStore().isDarkMode,
        }"
      ></i>
      {{ useDarkModeStore().isDarkMode ? `Dark Mode` : 'Light Mode' }}
    </button>
  </header>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '../stores/darkMode'

const darkModeStore = useDarkModeStore()
</script>

<style scoped>
header {
  @apply fixed z-50 flex justify-between top-0 left-0 w-full  p-4 bg-white shadow-lg cursor-default;
}

h1 {
  @apply text-xl font-semibold;
}

button {
  @apply text-sm;
}
</style>
