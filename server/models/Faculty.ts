import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for TypeScript
export interface IFaculty extends Document {
  id: number;
  name: string;
  designation: string;
  department_id: number;
}

// Define the Mongoose schema
const FacultySchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department_id: { type: Number, required: true }
});

// Export the model
export default mongoose.models.Faculty || mongoose.model<IFaculty>('Faculty', FacultySchema, "faculty");
