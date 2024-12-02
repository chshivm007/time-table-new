import { defineEventHandler, getQuery, H3Event } from 'h3';
import connectDB from '../mongoose';
import Faculty, { IFaculty } from '../models/Faculty';

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Extract query parameters from the request
    const { department_id } = getQuery(event);

    // Build the query object
    const query: any = {};
    if (department_id) query.department_id = parseInt(department_id as string, 10);

    // Fetch courses from MongoDB based on query
    const courses: IFaculty[] = await Faculty.find(query);

    return { status: 200, data: courses };
  } catch (error) {
    console.error('Error fetching courses:', error);

    return sendError(event, createError({statusCode: 401, statusMessage:  `Error fetching courses', ${(error as Error).message}`}));
  }
});
