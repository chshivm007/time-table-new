<template>
  <div class="bg-gray-100 h-screen relative w-full">
    <AppLoader v-if="loading" />

    <div class="w-full h-full">
      <AppHeader />
      <div class="p-8 w-full h-full">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useLoadingState } from "@/helpers/loader";


const loading = useLoadingState();
console.log(loading, "loading")
</script>
