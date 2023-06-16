import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCountriesStore = defineStore('countries', () => {
  const allCountries = ref<any[]>([])

  const displayedCountries = ref<any[]>([])

  const selectedRegion = ref<string>('');

  (async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      allCountries.value = response.data;
      displayedCountries.value = allCountries.value;
    } catch (error) {
      console.error('Error when searching for countries:', error);
    }
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

  const currentCountry = ref<any>()

  const borderCountries = ref<any[]>([])

  const updateBorderCountries = () => {
    borderCountries.value = currentCountry.value.borders
      .filter((countryCode: string) => currentCountry.value.cca3 !== countryCode)
      .map((countryCode: string) => {
        const country = allCountries.value.find((c: any) => c.cca3 === countryCode);
        return { name: country.name.common, code: country.cca3 };
      });
  };
  
  const fetchCountryDetails = async (countryCode: string) => {
    borderCountries.value.pop();
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      currentCountry.value = response.data[0];
      updateBorderCountries();
    } catch (error) {
      console.error('Error when searching for countries:', error);
    }
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
