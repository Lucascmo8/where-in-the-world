import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountriesStore = defineStore('countries', () => {
  const allCountries = reactive({
    countries: [] as any[]
  })

  const showCountries = reactive({
    countries: [] as any[]
  })

  const regionSelected = ref<string>('')

  async function fetchCountries() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      allCountries.countries = response.data
      showCountries.countries = response.data
    } catch (error) {
      console.error('Erro ao buscar os países:', error)
    }

    console.log(allCountries)
  }

  const searchWithText = (text: string) => {
    regionSelected.value = ''

    if (text.trim() == '') {
      fetchCountries()
      return
    }

    const filteredCountry = allCountries.countries.filter((country: any) => {
      for (const translation in country.translations) {
        if (
          // eslint-disable-next-line no-prototype-builtins
          country.translations.hasOwnProperty(translation) &&
          country.translations[translation].common.toLowerCase() === text.trim().toLowerCase()
        ) {
          return true
        }
      }
      if (country.name.common.toLowerCase() === text.trim().toLowerCase()) {
        return true
      } else if (country.name.official.toLowerCase() === text.trim().toLowerCase()) {
        return true
      } else if (country.cca3.toLowerCase() === text.trim().toLowerCase()) {
        return true
      }
      return false
    })

    showCountries.countries = filteredCountry

    console.log(showCountries)
  }

  const searchWithSelect = () => {
    if (regionSelected.value == 'all') {
      showCountries.countries = allCountries.countries
      return
    }
    showCountries.countries = allCountries.countries.filter(
      (country: any) => country.region.toLowerCase() == regionSelected.value
    )
    console.log(showCountries.countries)
  }

  return {
    allCountries,
    showCountries,
    regionSelected,
    fetchCountries,
    searchWithText,
    searchWithSelect
  }
})
