import { defineEventHandler, getQuery } from 'h3';
import connectDB from '../mongoose';
import Course, { ICourse } from '../models/Course';

export default defineEventHandler(async (event) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Extract query parameters from the request
    const { department_id, semester } = getQuery(event);

    // Build the query object
    const query: any = {};
    if (department_id) query.department_id = parseInt(department_id as string, 10);
    if (semester) query.semester = parseInt(semester as string, 10);

    // Fetch courses from MongoDB based on query
    const courses: ICourse[] = await Course.find(query);

    return { status: 200, data: courses };
  } catch (error) {
    console.error('Error fetching courses:', error);

    return sendError(event, createError({statusCode: 401, statusMessage:  `Error fetching courses', ${(error as Error).message}`}));
  }
});
