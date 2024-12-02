<template>
  <div class="flex items-center p-4 border-b border-gray-300 pr-16" @click="emit('select', user.id)">
    <div class="flex-shrink-0 mr-4">
      <img
        class="w-12 h-12 rounded-full user_image"
        :src="getRandomImage()"
        alt=""
        loading="lazy"
      />
    </div>
    <div>
      <h2 class="text-lg font-bold">{{ user.name }}</h2>
      <p class="text-sm text-gray-600">{{ user.email }}</p>
      <p class="text-sm text-gray-600">@{{ user.username }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  user: {
    name: string;
    email: string;
    username: string;
    id: number;
  };
}>();

const emit = defineEmits<(e: "select", value: number) => void>();

/**
 * Returns a random image URL from picsum.photos.
 *
 * @returns {string} The URL of a random image.
 */
const getRandomImage = () => {
  return `https://picsum.photos/512?random=${Math.floor(Math.random() * 1000)}`;
};
</script>

<style scoped>
.user_image {
  background-color: #ddd;
  background-image: linear-gradient(90deg, #ddd 0px, transparent 0px),
    linear-gradient(90deg, transparent 50px, #ddd 50px);
  background-size: 50px 100%;
}
</style>
