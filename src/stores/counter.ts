import { reactive, ref,watch } from 'vue'
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
    console.log(`foi1`)
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all')
      allCountries.countries = response.data
      showCountries.countries = allCountries.countries
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
  }

  const searchWithSelect = () => {
    if (regionSelected.value == 'all') {
      showCountries.countries = allCountries.countries
      return
    }
    orderCountries()
    showCountries.countries = allCountries.countries.filter(
      (country: any) => country.region.toLowerCase() == regionSelected.value
    )
  }

  const orderCountries = () => {
    const ordenedCoutries = showCountries.countries.sort((a, b) => {
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

    showCountries.countries = ordenedCoutries
  }

  const showCountry = reactive({
    country: [] as any[]
  })

  const countriesInBorder = ref<any[]>([])
  
  fetchCountries()

  const getDetailsCountry = async (countryName:string) =>{
    console.log(`foi2`)
    countriesInBorder.value.pop()
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
      showCountry.country = response.data
    } catch (error) {
      console.error('Erro ao buscar o país:', error)
    }
    countriesInBorder.value = allCountries.countries.filter((coutry:any)=>showCountry.country[0].borders.includes(coutry.cca3)).map((country:any)=>country.name.common)

    console.log(showCountry)
  }

  watch(
    () => showCountry.country.length,
    (newCountry) => {
      console.log(newCountry)
      countriesInBorder.value = allCountries.countries.filter((coutry:any)=>showCountry.country[0].borders.includes(coutry.cca3)).map((country:any)=>country.name.common)
    }
  )

  return {
    allCountries,
    showCountries,
    showCountry,
    regionSelected,
    fetchCountries,
    searchWithText,
    searchWithSelect,
    orderCountries,
    getDetailsCountry,
    countriesInBorder
  }
})
