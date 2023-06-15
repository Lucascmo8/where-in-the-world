<template>
  <form @submit.prevent="coutriesStore.searchWithText(text)" class="darkStyleComponent">
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
  @apply flex flex-row-reverse items-center gap-2 w-full sm:w-[512px] p-4 bg-white rounded-lg shadow-lg;
}

input {
  @apply h-full w-full bg-transparent outline-none hover:border-b focus:border-b;
}
</style>
