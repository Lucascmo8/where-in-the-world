<template>
  <RouterLink :to="{ path: '/about/' + code }" class="cardContainer darkStyleComponent">
    <img :src="flag" :alt="name + 'flag'" />
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
    required: true,
  },
  flag: {
    type: String as () => string,
    required: true,
  },
  population: {
    type: Number as () => number,
    required: true,
  },
  region: {
    type: String as () => string,
    required: true,
  },
  code: {
    type: String as () => string,
    required: true,
  },
  capital: {
    type: Object as () => any[],
    required: true,
  },
})
</script>

<style scoped>
.cardContainer {
  @apply flex flex-col h-80 w-64 rounded-lg shadow-lg hover:scale-105 hover:bg-slate-400;
}

img {
  @apply h-1/2 w-full rounded-t-lg;
}

.cardText {
  @apply flex flex-col gap-2 h-1/2 w-full p-4;
}

.cardText * {
  @apply transition-none;
}

h2 {
  @apply text-lg font-bold;
}

ul {
  @apply flex flex-col;
}

span {
  @apply font-bold;
}
</style>
