<template>
  <main>
    <RouterLink to="/"><i class="uil uil-arrow-left"></i>Back</RouterLink>
    <NoneFoundMessage v-if="countriesStore.showCountry.country.length == 0" />
    <div class="detailsContainer" v-else>
      <img
        :src="countriesStore.showCountry.country[0].flags.png"
        alt=""
      />

      <div class="textBox">
        <div class="capitalDetails">
          <h1>{{ countriesStore.showCountry.country[0].name.common }}</h1>
          <ul>
            <li><span>Official Name:</span> {{ countriesStore.showCountry.country[0].name.official || "No Official name" }}</li>
            <li><span>Population:</span> {{ countriesStore.showCountry.country[0].population.toLocaleString('en-US') || "No population" }}</li>
            <li><span>Region:</span> {{ countriesStore.showCountry.country[0].region }}</li>
            <li><span>Sub Region:</span> {{ countriesStore.showCountry.country[0].subregion || "No sub region" }}</li>
            <li><span>Capital:</span> {{ countriesStore.showCountry.country[0].capital[0] || "No Capital" }}</li>
          </ul>
        </div>
        <ul class="moreDetails">
          <li><span>Alpha Code:</span> {{ countriesStore.showCountry.country[0].cca3 || "No Alpha Code" }}</li>
          <li><span>Currencies:</span> {{ countriesStore.showCountry.country[0].currencies.name || "No Currencies" }}</li>
          <li><span>Languages:</span> {{ Object.values(countriesStore.showCountry.country[0].languages).join(", ") || "No Languages" }}</li>
        </ul>
        <div class="borderDetails">
            <span>Border Countries: </span>

            <button v-show="countriesStore.countriesInBorder.length > 0" v-for="(country , index) in countriesStore.countriesInBorder" :key="index" @click.prevent="seeCountryInBorder(country.code)">{{ country.name }}</button>
            <p v-if="countriesStore.countriesInBorder.length == 0">No countries on border</p>
      </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import NoneFoundMessage from '../components/NoneFoundMessage.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router';
import { useCountriesStore } from '../stores/counter';
import NoneFoundMessageVue from '../components/NoneFoundMessage.vue';

const countriesStore = useCountriesStore()
const route: any = useRoute()

onMounted(async()=>{
  countriesStore.getDetailsCountry(route.params.country)
})

const seeCountryInBorder = (countryOnView:string)=>{
  router.replace(`/about/${countryOnView}`)
  countriesStore.getDetailsCountry(countryOnView)
}

const toHome = ()=>{
  window.location.reload()
}
</script>

<style scoped>
main {
  @apply w-full pt-24 px-4;
}

a {
  @apply w-36 h-10 p-2 shadow-lg bg-white hover:bg-slate-300 rounded-lg;
}


.detailsContainer{
  @apply mt-8 lg:flex lg:gap-8
}

img{
  @apply w-full object-fill md:max-h-96 md:w-[500px]
}


.textBox {
  @apply flex flex-col gap-10 text-lg py-8 md:grid md:grid-cols-2 lg:py-0 lg:w-[755px] ;
}

h1{
  @apply text-2xl font-bold mb-4;
}

h1,li{
  @apply transition-none;
}

span{
  @apply font-semibold;
}

.moreDetails{
  @apply md:pt-12
}

.borderDetails{
  @apply col-start-1 col-end-3 flex flex-wrap gap-2 items-center
}

button {
  @apply w-36 h-20 p-2 shadow-lg bg-white outline-none  hover:bg-slate-300 focus:bg-slate-300 rounded-lg
}

.dark button, .dark a {
  @apply bg-slate-700 hover:bg-slate-300;
}
</style>
