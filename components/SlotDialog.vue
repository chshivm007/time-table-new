<template>
  <div>
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all "
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Select a course
                </DialogTitle>

                <div class="alpha">
                  <AutoComplete
                    :items="courses"
                    item-text="name"
                    item-value="course_code"
                    v-model:model-value="selectedCourse"
                    return-object
                  />
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="onConfirmCourse"
                  >
                    Confirm
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import type { ICourse } from "~/types/global";

const selectedCourse = ref<null | ICourse>(null);

interface Props {
  course: ICourse | null;
  modelValue: boolean;
  courses: ICourse[];
}

const { course = null, modelValue = false, courses } = defineProps<Props>();

const emit = defineEmits(["update:course", "update:modelValue"]);

const closeModal = () => {
  selectedCourse.value = null;
  emit("update:modelValue", false);
};

watch(
  () => modelValue,
  (value) => {
    if (!value) return;

    if (course) {
      selectedCourse.value =
        courses.find((course) => course.course_code === course.course_code) || null;
    }
  }
);

const onConfirmCourse = () => {
  emit("update:course", selectedCourse.value);
};
</script>
