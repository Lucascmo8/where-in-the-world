<template>
  <RouterLink :to="{ path: '/about/' + code }" class="cardContainer">
    <img :src="flag" alt="" />
    <div class="cardText">
      <h2>{{ name }}</h2>
      <ul>
        <li><span>Population:</span> {{ population.toLocaleString('en-US') }}</li>
        <li><span>Region:</span> {{ region }}</li>
        <li><span>Capital:</span> {{ capital[0] }}</li>
      </ul>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myProps = defineProps({
  name: {
    type: String as () => string,
    required: true
  },
  flag: {
    type: String as () => string,
    required: true
  },
  population: {
    type: Number as () => number,
    required: true
  },
  region: {
    type: String as () => string,
    required: true
  },
  code: {
    type: String as () => string,
    required: true
  },
  capital: {
    type: Object as () => any[],
    required: true
  }
})
</script>

<style scoped>
.cardContainer {
  @apply w-64 h-80 flex flex-col bg-white rounded-lg shadow-lg hover:scale-105;
}

.dark .cardContainer {
  @apply bg-gray-700 text-white;
}

img {
  @apply w-full h-1/2 rounded-t-lg;
}

.cardText {
  @apply w-full h-1/2 p-4  flex flex-col gap-2;
}

.cardText * {
  @apply transition-none;
}

h2 {
  @apply font-bold text-lg;
}

ul {
  @apply flex flex-col;
}

span {
  @apply font-bold;
}
</style>
