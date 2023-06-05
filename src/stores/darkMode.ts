import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkMode', () => {
  const isDarkMode = ref<boolean>(false)
  const toggleMode = () => {
    isDarkMode.value = !isDarkMode.value
    setMode(isDarkMode.value)
  }

  const setMode = (isDarkMode: boolean) => {
    isDarkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }

  return { isDarkMode, toggleMode }
})
