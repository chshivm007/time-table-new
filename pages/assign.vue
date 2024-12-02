<template>
  <div class="flex justify-center">
    <div class="grid gap-10 mt-16">
      <div class="flex gap-x-4 gap-y-2">
        <div class="grow flex gap-x-4">
          <div class="h-fit w-full">
            <label> Department</label>
            <AutoComplete
              item-text="text"
              item-value="value"
              v-model="departmentId"
              :items="departments"
              class="w-full"
            />
          </div>

          <div class="h-fit">
            <label> Semester</label>
            <AutoComplete
              v-model="semester"
              item-text="text"
              item-value="value"
              :items="semesters"
            />
          </div>
        </div>
        <div class="flex items-end grow-0">
          <button
            type="button"
            @click="fetchData"
            class="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium transition-all duration-100"
          >
            Fetch
          </button>
        </div>
      </div>
      <div class="shadow-md sm:rounded-lg overflow-visible">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-visible"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Course</th>
              <th scope="col" class="px-6 py-3">Faculty</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subject in courses"
              :key="subject.course_code"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ subject.name }}
              </th>
              <td class="px-6 py-4">
                <Autocomplete
                  v-model="courseMap[subject.course_code]"
                  :items="faculties"
                  item-text="name"
                  item-value="id"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center">
        <button
          type="button"
          @click="submitSemesterAssignment"
          class="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium transition-all duration-100"
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Autocomplete from "@/components/AutoComplete.vue";
import { hideLoader, showLoader } from "~/helpers/loader";
import type { ICourse } from "~/types/global";

const courses = ref<ICourse[]>([]);

const departments = [
  {
    text: "MCA",
    value: 1,
  },
];

const semestersValues = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const semesters = semestersValues.map((semester, index) => ({
  text: semester,
  value: index + 1,
}));

interface Faculty {
  id: number;
  name: string;
  department_id: number;
}

const courseMap = ref<Record<string, Faculty | null>>({});

const faculties = ref<Faculty[]>([]);

const departmentId = ref<null | number>(1);
const semester = ref<null | number>(1);

const fetchCourses = async () => {
  const response = await $fetch("/api/courses", {
    method: "GET",
    params: { department_id: departmentId.value, semester: semester.value },
  });

  courses.value = response.data;

  courses.value.forEach((course) => {
    courseMap.value[course.course_code] = null;
  });
};

const fetchFaculty = async () => {
  const response = await $fetch("/api/faculty", {
    method: "GET",
    params: { department_id: departmentId.value },
  });

  faculties.value = response.data;
};

const fetchData = () => {
  fetchFaculty();
  fetchCourses();
};

const submitSemesterAssignment = async () => {
  const payload = {
    department_id: departmentId.value,
    semester: semester.value,

    courses: Object.entries(courseMap.value).map(
      ([course_code, faculty_id]) => ({
        course_code,
        faculty_id,
      })
    ),
  };

  showLoader();

  try {
    const response = await $fetch("/api/assign", {
      method: "POST",
      body: payload,
    });

    await navigateTo({
      path: "/create",
      query: { department_id: departmentId.value, semester: semester.value },
    });
  } catch (err) {
    alert((err as unknown as Error).message);
  }

  hideLoader();
};
</script>
