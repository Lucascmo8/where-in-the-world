<template>
  <form @submit.prevent="coutriesStore.searchWithText(text)">
    <input type="text" placeholder="Search for a country..." v-model="text" />
    <button><i class="uil uil-search"></i></button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCountriesStore } from '../stores/counter'
const coutriesStore = useCountriesStore()

const text = ref<string>('')
</script>

<style scoped>
form {
  @apply w-full sm:w-[512px] bg-white p-4 flex flex-row-reverse items-center gap-2 rounded-lg shadow-lg;
}

.dark form {
  @apply bg-slate-700 text-white;
}

input {
  @apply bg-transparent w-full h-full outline-none focus:border-b;
}
</style>
