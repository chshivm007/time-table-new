<template>
  <div
    class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden sm:max-w-lg md:max-w-xl lg:max-w-2xl min-w-[15rem] sm:min-w-[20rem] md:min-w-[30rem]"
  >
    <!-- Profile Section -->
    <div class="bg-gray-800 p-4 flex items-center">
      <img
        :src="avatarUrl"
        alt="avatar"
        class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white"
      />
      <div class="ml-4">
        <h2 class="text-white text-xl font-semibold leading-tight sm:text-2xl">
          {{ user.name }}
        </h2>
        <p class="text-gray-300 text-sm sm:text-base">{{ user.username }}</p>
        <p class="text-gray-300 text-sm sm:text-base">{{ user.email }}</p>
      </div>
    </div>

    <!-- Posts Toggle Button -->
    <div class="p-4">
      <button
        @click="togglePosts"
        :class="[
         `bg-white text-gray-900 border border-gray-900 hover:border-gray-100
         hover:text-gray-100 hover:bg-gray-900 font-bold py-2 px-4 rounded-md
         focus:outline-none focus:shadow-outline transition-all duration-100`,
          showPosts ? 'w-full sm:w-auto' : 'w-full',
        ]"
      >
        {{ showPosts ? "Hide Posts" : "Show Posts" }}
      </button>
    </div>

    <!-- Posts Section -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showPosts"
        class="p-4 max-h-[30rem] sm:max-h-[35rem] overflow-y-auto transition-all duration-500"
      >
        <slot name="posts" :user="user">

          <!-- Default content -->
          <ul class="list-disc pl-4">
            <li
              v-for="post in user.posts"
              :key="post.id"
              class="mb-2"
            >
              <a
                :href="`/posts/${post.id}`"
                class="text-blue-500 hover:text-blue-700 hover:underline"
              >
                {{ post.title }}
              </a>
            </li>
          </ul>

        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
    posts: {
      id: number;
      title: string;
      body: string;
    }[];
  };

  showPosts: boolean;
}>();

/**
 * A random avatar URL using Picsum Photos.
 *
 * @returns {string} A random avatar URL.
 */
const avatarUrl = `https://picsum.photos/512?random=${Math.floor(
  Math.random() * 1000
)}`;

const emit = defineEmits<(e: "togglePosts") => void>();

const togglePosts = () => {
  emit("togglePosts");
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
