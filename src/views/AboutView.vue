<template>
  <main>
    <RouterLink to="/"><i class="uil uil-arrow-left"></i>Back</RouterLink>
    <NoneFoundMessage v-if="countriesStore.currentCountry == undefined" />
    <div class="detailsContainer" v-else>
      <img :src="countriesStore.currentCountry.flags.png" alt="" />

      <div class="textBox">
        <div class="capitalDetails">
          <h1>{{ countriesStore.currentCountry.name.common }}</h1>
          <ul>
            <li>
              <span>Official Name:</span>
              {{ countriesStore.currentCountry.name.official || 'No Official name' }}
            </li>
            <li>
              <span>Population:</span>
              {{
                countriesStore.currentCountry.population.toLocaleString('en-US') ||
                'No population'
              }}
            </li>
            <li><span>Region:</span> {{ countriesStore.currentCountry.region || 'Region not found' }}</li>
            <li>
              <span>Sub Region:</span>
              {{ countriesStore.currentCountry.subregion || 'No sub region' }}
            </li>
            <li>
              <span>Capital:</span>
              {{ getCapital() || 'No Capital' }}
            </li>
          </ul>
        </div>
        <ul class="moreDetails">
          <li>
            <span>Alpha Code:</span>
            {{ countriesStore.currentCountry.cca3 || 'No Alpha Code' }}
          </li>
          <li>
            <span>Currencies:</span>
            {{ 'No Currencies' }}
          </li>
          <li>
            <span>Languages:</span>
            {{ getLanguages() || 'No Languages' }}
          </li>
        </ul>
        <div class="borderDetails">
          <span>Border Countries: </span>

          <button
            class="darkStyleComponent"
            v-show="countriesStore.borderCountries"
            v-for="(country, index) in countriesStore.borderCountries"
            :key="index"
            @click.prevent="seeCountryInBorder(country.code)"
          >
            {{ country.name }}
          </button>
          <p v-if="countriesStore.borderCountries.length == 0 ">No countries on border</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import NoneFoundMessage from '../components/NoneFoundMessage.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router'
import { useCountriesStore } from '../stores/countries'

const countriesStore = useCountriesStore()
const route: any = useRoute()

onMounted(async () => {
  countriesStore.fetchCountryDetails(route.params.country)
})

const seeCountryInBorder = (countryOnView: string) => {
  router.replace(`/about/${countryOnView}`)
  countriesStore.fetchCountryDetails(countryOnView)
}

const getCapital = ()=> countriesStore.currentCountry?.capital?.[0] ?? ''

const getLanguages = () => {
  const languages = countriesStore.currentCountry?.languages
  if(languages){
    return Object.values(languages).join(', ')
  }
}
</script>

<style scoped>
main {
  @apply w-full pt-24 px-4;
}

a {
  @apply w-36 h-10 p-2 shadow-lg bg-white hover:bg-slate-400 rounded-lg;
}

.dark a {
  @apply bg-slate-700 hover:bg-slate-400;
}
.detailsContainer {
  @apply mt-8 lg:flex lg:gap-8;
}

img {
  @apply w-full object-fill md:max-h-96 md:w-[500px];
}

.textBox {
  @apply flex flex-col gap-10 text-lg py-8 md:grid md:grid-cols-2 lg:py-0 lg:w-[755px];
}

h1 {
  @apply text-2xl font-bold mb-4;
}

h1,
li {
  @apply transition-none;
}

span {
  @apply font-semibold;
}

.moreDetails {
  @apply md:pt-12;
}

.borderDetails {
  @apply col-start-1 col-end-3 flex flex-wrap gap-2 items-center;
}

button {
  @apply w-36 h-20 p-2 shadow-lg bg-white outline-none hover:bg-slate-400 focus:bg-slate-400 rounded-lg;
}
</style>