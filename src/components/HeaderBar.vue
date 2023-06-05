<template>
  <header>
    <h1>Where in the world?</h1>
    <button @click="darkModeStore.toggleMode">
      <i
        class="uil"
        :class="{
          'uil-moon': useDarkModeStore().isDarkMode,
          'uil-sun': !useDarkModeStore().isDarkMode
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
  @apply bg-white text-black flex justify-between p-4 fixed top-0 left-0 z-50 w-full shadow-lg cursor-default;
}
.dark header {
  @apply bg-gray-700 text-white;
}

h1 {
  @apply text-xl font-semibold;
}

button {
  @apply text-sm;
}
</style>
