<template>
  <UAlert
    v-if="isOpen"
    icon="i-heroicons-command-line"
    color="primary"
    variant="solid"
    title="Heads up!"
    :description="message"
  />
</template>


<script setup lang="ts">

const baseAlert = useBaseAlert();

const message = computed(() => baseAlert.message.value);

const isOpen = computed(() => baseAlert.isVisible.value);

</script>