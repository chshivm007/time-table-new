import { defineEventHandler, readBody } from 'h3';
import bcrypt from 'bcrypt';
import connectDB from '../mongoose';
import User, { IUser } from '../models/User';

interface AuthRequest {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = (await readBody(event)) as AuthRequest;

    console.log( { email, password}, "trying to login" );

    if (!email || !password) {
      return { status: 400, message: 'Email and password are required' };
    }

    await connectDB(); // Connect to the database

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return sendError(event, createError({statusCode: 401, statusMessage: 'No user exist with this email'}));
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return sendError(event, createError({statusCode: 401, statusMessage: 'Invalid password'}));
    }

    return {statusCode: 200,  data: user };

  } catch (error) {
    console.error('Authentication error:', error);
    return sendError(event, createError({statusCode: 500, statusMessage: (error as Error).message}));
  }
});
