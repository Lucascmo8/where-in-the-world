<template>
  <HeaderBar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import HeaderBar from './components/HeaderBar.vue'
</script>

<style>
* {
  @apply transition-all;
}

.dark * {
  @apply text-white;
}

.dark .darkStyleComponent{
  @apply bg-gray-700
}

body {
  @apply bg-slate-100;
}

body.dark {
  @apply bg-slate-900;
}
</style>
