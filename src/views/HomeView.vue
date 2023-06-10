<template>
  <main>
    <div class="containerSearch">
      <SearchBar />
      <SelectRegion />
    </div>
    <div class="containerCountries">
      <NoneFoundMessage v-show="countriesStore.showCountries.countries.length == 0" />
      <CoutryCard
        v-for="(country, index) in countriesStore.showCountries.countries.slice(
          0,
          visibleCountries
        )"
        :key="index"
        :name="country.name.common"
        :flag="country.flags.png"
        :population="country.population"
        :region="country.region"
        :capital="country.capital || ['No capital']"
      />
    </div>
    <div
      class="ContainerButtonCountries"
      v-show="countriesStore.showCountries.countries.length > 20"
    >
      <button
        class="buttonSeeMore"
        v-show="countriesStore.showCountries.countries.length > visibleCountries"
        @click="moreVisibleCountries"
      >
        See more...
      </button>
      <button class="buttonToTop" @click="scroolToTop"><i class="uil uil-arrow-up"></i></button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import SelectRegion from '../components/SelectRegion.vue'
import CoutryCard from '../components/CoutryCard.vue'
import NoneFoundMessage from '../components/NoneFoundMessage.vue'
import { useCountriesStore } from '../stores/counter'

const countriesStore = useCountriesStore()

countriesStore.fetchCountries()

const visibleCountries = ref<number>(20)

const moreVisibleCountries = () => {
  if (visibleCountries.value < 250) {
    visibleCountries.value += 30
  }
}

watch(
  () => countriesStore.showCountries.countries.length,
  (newCountriesLength) => {
    console.log(newCountriesLength)
    visibleCountries.value = 20
  }
)

const scroolToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
main {
  @apply w-full pt-24 px-4;
}
.containerSearch {
  @apply w-full flex flex-col gap-8 sm:flex-row sm:justify-between;
}

.containerCountries {
  @apply flex flex-wrap justify-center gap-12 py-12 sm:justify-between;
}

.ContainerButtonCountries {
  @apply grid grid-cols-3 p-2;
}

.buttonSeeMore {
  @apply p-2 bg-white rounded-lg shadow-lg hover:bg-slate-300 col-start-2 justify-self-center;
}

.dark .buttonSeeMore {
  @apply bg-slate-700 text-white hover:bg-slate-500;
}

.buttonToTop {
  @apply w-8 h-8 p-2 bg-white rounded-full flex justify-center items-center col-start-3 justify-self-end hover:bg-slate-300;
}

.dark .buttonToTop {
  @apply bg-slate-700 text-white hover:bg-slate-500;
}
</style>
