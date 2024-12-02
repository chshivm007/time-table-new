import { Course } from "@/assets/data";


export type CourseId = typeof Course[keyof typeof Course];

export interface Course {
  name: string,
  id: CourseId,
}