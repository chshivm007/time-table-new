import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  course_code: string;
  name: string;
  semester: number;
  department_id: number;
}

const CourseSchema: Schema = new Schema({
  course_code: { type: String, required: true },
  name: { type: String, required: true },
  semester: { type: Number, required: true },
  department_id: { type: Number, required: true }
});

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
