import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

interface Flag{
  alt:string;
  png:string;
}

interface Name{
  common:string;
  official:string;
}

interface Country{
  borders:string[] | undefined ;
  capital?:string[];
  cca3:string;
  currencies:Record<string,string>;
  flags:Flag;
  languages:Record<string,string>;
  name:Name;
  population:number;
  region:string;
  subregion:string;
  translations:Record<string,Name>;
}

interface BorderCountry{
  name:string;
  code:string;
}

export const useCountriesStore = defineStore('countries', () => {
  const allCountries = ref<Country[]>([])

  const displayedCountries = ref<Country[]>([])

  const selectedRegion = ref<string>('');

  (async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      allCountries.value = response.data;
      displayedCountries.value = allCountries.value;
    } catch (error) {
      console.error('Error when searching for countries:', error);
    }
    console.log(allCountries.value)
  })()

  const searchWithText = (text: string) => {
    selectedRegion.value = ''

    if (text === '') {
      displayedCountries.value = allCountries.value
      return
    }

    const filteredCountries = filterCountriesByText(text)
    displayedCountries.value = filteredCountries
  }

  const filterCountriesByText = (text: string) => {
    return allCountries.value.filter((country: any) => {
      for (const translation in country.translations) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          country.translations.hasOwnProperty(translation) &&
          country.translations[translation].common.toLowerCase() === text
        ) {
          return true
        }
      }
      if (
        country.name.common.toLowerCase() === text ||
        country.name.official.toLowerCase() === text ||
        country.cca3.toLowerCase() === text ||
        country.region.toLowerCase() === text
      ) {
        return true
      }
      return false
    })
  }

  const searchWithSelect = () => {
    if (selectedRegion.value === 'all') {
      displayedCountries.value = allCountries.value
    } else {
      const filteredCountries = filterCountriesByRegion(selectedRegion.value)
      orderCountries(filteredCountries)
      displayedCountries.value = filteredCountries
    }
  }

  const filterCountriesByRegion = (region: string) => {
    if (region === 'all') {
      return allCountries.value
    }
    return allCountries.value.filter((country: any) => country.region.toLowerCase() === region)
  }

  const orderCountries = (countries: any[]) => {
    countries.sort((a, b) => {
      const nameA = a.name.common.toUpperCase()
      const nameB = b.name.common.toUpperCase()

      if (nameA < nameB) {
        return -1
      }

      if (nameA > nameB) {
        return 1
      }

      return 0
    })
  }

  const currentCountry = ref<Country | undefined>()

  const borderCountries = ref<BorderCountry[] | any[]>([])

  const updateBorderCountries = () => {
    if (currentCountry.value && currentCountry.value.borders) {
      borderCountries.value = currentCountry.value.borders
        .filter((countryCode: string) => currentCountry.value?.cca3 !== countryCode)
        .map((countryCode: string) => {
          const country = allCountries.value.find((c: any) => c.cca3 === countryCode)
          return { name: country?.name.common, code: country?.cca3 }
        })
    } else {
      borderCountries.value = []
    }
  }

  watchEffect( async()=>{
    if(borderCountries.value[0] && borderCountries.value[0].name == undefined){
      updateBorderCountries()
    }
  })
  
  const fetchCountryDetails = async (countryCode: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      currentCountry.value = response.data[0];
      updateBorderCountries();
    } catch (error) {
      console.error('Error when searching for countries:', error);
    }
    console.log(currentCountry.value)
    console.log(countryCode)
    console.log(borderCountries.value)
  }

  return {
    allCountries,
    displayedCountries,
    selectedRegion,
    searchWithText,
    searchWithSelect,
    orderCountries,
    fetchCountryDetails,
    currentCountry,
    borderCountries,
  }
})