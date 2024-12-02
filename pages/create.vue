<template>
  <div class="mx-auto p-4">
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
            class="bg-white rounded-md shadow-lg py-2 px-4 grow min-w-32"
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
                {{ period.subject?.id || "- -" }}
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
    />
  </div>
</template>

<script setup lang="ts">
import type { Course, CourseId } from "~/types/global";
import { Course as CourseEnum } from "@/assets/data";

const title = ref("");
const description = ref("");

const PERIODS = 8;
const DAYS = 5;

interface TimeSlot {
  start: string;
  end: string;
}

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

const activeCourse = ref<null | Course>(null);

const showSlotDialog = ref(false);

interface Period {
  id: string;
  sequence: number;
  subject: null | Course;
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

interface Teacher {
  id: number;
  name: string;
  courseIds: CourseId[];
}

const teachers = ref<Teacher[]>([
  { id: 1, name: "Alice Johnson", courseIds: [CourseEnum.MATHEMATICS] },
  { id: 2, name: "Brian Davis", courseIds: [CourseEnum.SCIENCE] },
  { id: 3, name: "Catherine Lee", courseIds: [CourseEnum.ENGLISH] },
  { id: 4, name: "David Wilson", courseIds: [CourseEnum.HISTORY] },
  { id: 5, name: "Eva Martin", courseIds: [CourseEnum.GEOGRAPHY] },
  { id: 6, name: "Frank White", courseIds: [CourseEnum.PHYSICS] },
  { id: 7, name: "Grace Thompson", courseIds: [CourseEnum.CHEMISTRY] },
  { id: 8, name: "Hannah Scott", courseIds: [CourseEnum.BIOLOGY] },
  { id: 9, name: "Irene Hall", courseIds: [CourseEnum.COMPUTER_SCIENCE] },
  { id: 10, name: "Jason Clark", courseIds: [CourseEnum.ART] },
]);

const getTeacherForCourse = (course: Course) => {
  return teachers.value.find((teacher) =>
    teacher.courseIds.includes(course.id)
  );
};

const activePeriod = ref<null | Period>(null);

const onSelectChangeCourse = (period: Period) => {
  showSlotDialog.value = true;
  activePeriod.value = period;
};

const onSubmit = () => {
  console.log("Title:", title.value);
  console.log("Description:", description.value);
  // Add logic to handle form submission
};

const findConflictingPeriod = (newCourse: Course, period: Period) => {
  const periodSequence = period.sequence;

  const courseTeacher = getTeacherForCourse(newCourse);

  if (!courseTeacher) {
    throw new Error("No teacher found for course" + newCourse.id);
  }

  const conflictingDay = days.value.find((day) => {
    const correspondingPeriod = day.periods.find((period) => {
      return period.sequence === periodSequence;
    })!;

    if (!correspondingPeriod.subject) return false;

    return courseTeacher.courseIds.includes(correspondingPeriod.subject.id);
  });

  if (!conflictingDay) return null;

  return {
    day: conflictingDay,
    period: conflictingDay.periods.find((period) => {
      return period.sequence === periodSequence;
    })!,
    teacher: courseTeacher,
  };
};

const onSelectCourse = (newCourse: Course) => {
  if (!activePeriod.value) return;

  const conflict = findConflictingPeriod(newCourse, activePeriod.value);

  if (conflict) {
    alert(
      `Teacher ${conflict.teacher.name} is already teaching ${
        conflict.period.subject!.name
      } on ${conflict.day.id} at period ${
        conflict.period.sequence
      }`
    );

    return;
  }

  activePeriod.value.subject = newCourse;

  showSlotDialog.value = false;
};
</script>
