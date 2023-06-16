<template>
  <main>
    <div class="containerSearch">
      <SearchBar />
      <RegionSelect />
    </div>
    <div class="containerCountries">
      <NoneFoundMessage v-show="countriesStore.displayedCountries.length == 0" />
      <CoutryCard
        v-for="(country, index) in countriesStore.displayedCountries.slice(
          0,
          visibleCountries
        )"
        :key="index"
        :name="country.name.common"
        :flag="country.flags.png"
        :population="country.population"
        :region="country.region"
        :code="country.cca3"
        :capital="country.capital || ['No capital']"
      />
    </div>
    <div
      class="ContainerButtonCountries"
      v-show="countriesStore.displayedCountries.length > 20"
    >
      <button
        id="buttonSeeMore"
        class="darkStyleComponent"
        v-show="countriesStore.displayedCountries.length > visibleCountries"
        @click="moreVisibleCountries"
      >
        See more...
      </button>
      <button id="buttonToTop" class="darkStyleComponent" @click="scroolToTop"><i class="uil uil-arrow-up"></i></button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import RegionSelect from '../components/RegionSelect.vue'
import CoutryCard from '../components/CoutryCard.vue'
import NoneFoundMessage from '../components/NoneFoundMessage.vue'
import { useCountriesStore } from '../stores/countries'


const countriesStore = useCountriesStore()

const visibleCountries = ref<number>(20)

const moreVisibleCountries = () => {
  if (visibleCountries.value < 250) {
    visibleCountries.value += 30
  }
}

watch(
  () => countriesStore.displayedCountries.length,
  (newCountriesLength) => {
    console.log(newCountriesLength)
    visibleCountries.value = 20
  }
)

const scroolToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
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

#buttonSeeMore {
  @apply p-2 rounded-lg shadow-lg hover:bg-slate-400 col-start-2 justify-self-center;
}

#buttonToTop {
  @apply w-8 h-8 p-2 rounded-full flex justify-center shadow-lg items-center col-start-3 justify-self-end hover:bg-slate-400;
}
</style>
