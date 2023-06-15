<template>
  <select
    id="selectRegion"
    class="darkStyleComponent"
    @change="countriesStore.searchWithSelect"
    v-model="countriesStore.regionSelected"
  >
    <option disabled value="" selected>Filter by Region</option>
    <option value="all">All</option>
    <option value="africa">Africa</option>
    <option value="americas">Americas</option>
    <option value="asia">Asia</option>
    <option value="europe">Europe</option>
    <option value="oceania">Oceania</option>
  </select>
</template>

<script setup lang="ts">
import { useCountriesStore } from '../stores/counter'

const countriesStore = useCountriesStore()
</script>

<style>
  select {
    @apply flex items-center gap-2 w-52 p-4 bg-white rounded-lg shadow-lg;
  }
</style>
