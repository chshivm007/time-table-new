<template>
  <div class="mx-auto p-4 grid grid-cols-1 gap-8 mt-10">

    <div class="flex gap-x-4 w-full">
      <!-- Left Grid -->
      <div class="grid gap-y-4 grow-0">
        <div class="bg-transparent rounded-md px-4 pt-5 pb-4"></div>
        <div
          v-for="day in weekdays"
          :key="day"
          class="bg-white rounded-md shadow-lg px-4 py-6"
        >
          {{ day }}
        </div>
      </div>
      <!-- Left Grid End -->

      <!-- Right Grid -->
      <div class="grid gap-y-4 grid-cols-1 grow overflow-x-auto">
        <!-- Top Grid -->
        <div class="flex gap-x-4">
          <div
            v-for="timeSlot in timeSlots"
            :key="timeSlot.start"
            class="bg-gray-300 rounded-md border-2  border-black py-2 px-4 grow min-w-32 "
          >
            <div
              class="font-semibold text-sm text-gray-800 flex justify-between"
            >
              <span>
                {{ timeSlot.start }}
              </span>

              <span> - </span>

              <span>
                {{ timeSlot.end }}
              </span>
            </div>
          </div>
        </div>
        <!-- Top Grid End -->

        <div v-for="day in days" :key="day.id" class="flex gap-x-4">
          <div
            v-for="period in day.periods"
            :key="period.id"
            class="bg-white rounded-md shadow-lg w-48 grid grid-cols-1 text-center min-w-32"
          >
            <div class="my-2 mt-4">
              <span class="font-semibold text-gray-800">
                {{ period.subject?.course_code || "- -" }}
              </span>
            </div>

            <button
              class="w-full bg-blue-600 text-white text-center rounded-b-md text-sm py-1 hover:bg-blue-700"
              @click="onSelectChangeCourse(period)"
            >
              Change
            </button>
          </div>
        </div>
      </div>
      <!-- Right Grid End -->
    </div>

    <SlotDialog
      v-model:model-value="showSlotDialog"
      :course="activePeriod?.subject || null"
      @update:course="onSelectCourse"
      :courses="courses"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICourse } from "~/types/global";

const PERIODS = 8;

interface TimeSlot {
  start: string;
  end: string;
}

const courses = ref<ICourse[]>([]);

const timeSlots: TimeSlot[] = [];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

for (let i = 0; i < PERIODS; i++) {
  const startHour = 9 + Math.floor(i / 2);
  const startMinute = (i % 2) * 30;
  const start = `${(startHour + 12).toString().padStart(2, "0")}:${startMinute
    .toString()
    .padStart(2, "0")}`;

  const endHour = 9 + Math.floor((i + 1) / 2);
  const endMinute = ((i + 1) % 2) * 30;
  const end = `${(endHour + 12).toString().padStart(2, "0")}:${endMinute
    .toString()
    .padStart(2, "0")}`;

  timeSlots.push({
    start,
    end,
  });
}


const showSlotDialog = ref(false);

interface Period {
  id: string;
  sequence: number;
  subject: null | ICourse;
}

interface Day {
  id: (typeof weekdays)[number];
  periods: Period[];
}

const days = ref<Day[]>([]);

weekdays.forEach((weekday) => {
  const periods = [];

  for (let j = 0; j < PERIODS; j++) {
    periods.push({
      id: `${j}`,
      sequence: j + 1,
      subject: null,
    });
  }

  days.value.push({
    id: weekday,
    periods,
  });
});


const activePeriod = ref<null | Period>(null);

const onSelectChangeCourse = (period: Period) => {
  showSlotDialog.value = true;
  activePeriod.value = period;
};

const route = useRoute();

const { departmentId, semester } = route.params;

const fetchCourses = async () => {
  const response = await $fetch("/api/courses", {
    method: "GET",
    params: { department_id: departmentId, semester: semester },
  });

  courses.value = response.data;
};

onMounted(() => {
  fetchCourses();
});


const onSelectCourse = (newCourse: ICourse) => {
  if (!activePeriod.value) return;

  activePeriod.value.subject = newCourse;

  showSlotDialog.value = false;
};
</script>
