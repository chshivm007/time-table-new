<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold mb-4">Add a Teacher</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <label for="name" class="block">Name</label>
      <input
        type="text"
        v-model="name"
        id="name"
        class="w-full px-4 py-2 border rounded-md"
      />
      <label for="email" class="block">Email</label>
      <input
        type="email"
        v-model="email"
        id="email"
        class="w-full px-4 py-2 border rounded-md"
      />
      <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-md">
        Add
      </button>
    </form>
    <div class="mt-4">
      <h2 class="text-2xl font-bold">Teachers</h2>
      <ul class="list-disc pl-4">
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const users = ref([
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Brian Davis" },
  { id: 3, name: "Catherine Lee" },
  { id: 4, name: "David Wilson" },
  { id: 5, name: "Eva Martin" },
  { id: 6, name: "Frank White" },
  { id: 7, name: "Grace Thompson" },
  { id: 8, name: "Hannah Scott" },
  { id: 9, name: "Irene Hall" },
  { id: 10, name: "Jason Clark" },
]);

function onSubmit() {
  users.value.push({
    id: users.value.length + 1,
    name: name.value,
    email: email.value,
  });
  name.value = "";
  email.value = "";
}
</script>
