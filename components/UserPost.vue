<template>
  <div
    class="border border-gray-300 rounded-lg p-4 shadow"
  >
    <h3 class="text-lg font-semibold leading-tight sm:text-xl">
      {{ title }}
    </h3>
    <p class="text-gray-600 text-sm sm:text-base">{{ body }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  title: string;
  body: string;
}>();



</script>
