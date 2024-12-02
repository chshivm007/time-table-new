<template>
    <Combobox :model-value="selected" @update:model-value="onSelect">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :displayValue="(person) => (accessText(person) || 'No Val')"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20"
          >
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="person in filteredItems"
              as="template"
              :key="accessVal(person)"
              :value="person"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ accessText(person) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'


interface Props {
  modelValue: Record<string, any> | string | number | null,
  items: Record<string, any>[] | string[] | number[],
  itemText: string,
  itemValue: string,
  returnObject?: boolean,
}


const { modelValue = null, items = [], itemText = "text", itemValue = "value", returnObject = false} = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const onSelect = (value: Object) => {
  selected.value = value;

  if (returnObject) {
    emit('update:modelValue', value);
  }
  else {
    emit('update:modelValue', accessVal(value));
  }
};

function accessVal (val: Record<string, any> | string) {
  if (!val) {
    return ""
  }
  if (typeof val === 'string' || typeof val === 'number') {
    return val;
  }
  else {
    return val[itemValue];
  }
}

function accessText (val: Record<string, any> | string) {
  if (!val) {
    return ""
  }
  if (typeof val === 'string' || typeof val === 'number') {
    return val;
  }
  else {
    return val[itemText];
  }
}

watch(() => modelValue, (value) => {
  selected.value = items.find((person) => accessVal(person) === value);
})

const selected = ref();

if (modelValue) {
  selected.value = items.find((person) => accessVal(person) === accessVal(modelValue));
}
else {
  selected.value = null;
}

const query = ref('')

const filteredItems = computed(() =>
  query.value === ''
    ? items
    : items.filter((person) =>
        accessVal(person)
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>
