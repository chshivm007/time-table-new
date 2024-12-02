<template>
  <div>
    <label for="price" class="block text-sm/6 font-medium text-gray-900">
      {{ label }}
    </label>
    <div class="mt-2">
      <div
        class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
      >
        <!-- <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
          $
        </div> -->
        <input
          type="text"
          name="price"
          id="price"
          :value="props.modelValue"
          @input="onInputChange"
          class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          placeholder="0.00"
        />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

interface Props {
  modelValue: string,
  label: string,
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

function onInputChange(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}

</script>