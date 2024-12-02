<template>
  <form class="bg-white rounded-lg shadow-lg p-4" @submit.prevent="onSelectSearch">
    <h1 class="text-xl md:text-2xl font-bold mb-4 ">User Search</h1>
    <div class="flex flex-col sm:flex-row gap-x-4 gap-y-2 sm:gap-y-0">
      <input
        type="text"
        v-model="query"
        class="px-4 py-2 border border-gray-300 rounded-md grow sm:w-full"
        autofocus
      />
      <button
        type="submit"
        class="bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const query = ref("");

const emit = defineEmits<(e: "update", value: string) => void>();

const onSelectSearch = async () => {
  emit("update", query.value);
};
</script>
