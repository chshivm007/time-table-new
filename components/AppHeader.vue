<template>
  <header
    class="bg-primary-500 text-gray-100 py-4 bg-slate-700 shadow-md"
  >

    <div class="container mx-auto px-4 flex items-center justify-start">

      <BookOpenIcon
        class="h-8 w-8 cursor-pointer"
        @click="$router.push('/')"
      />

      <div class="flex justify-center w-full">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
          Time Table Generator
        </h1>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

import { BookOpenIcon } from "@heroicons/vue/24/solid"
import { useRouter } from "vue-router"

const $router = useRouter()

</script>

<style scoped>
/* Add some space between the icon and the title */
.container {
  gap: 1rem;
}
</style>

