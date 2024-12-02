import { defineEventHandler, H3Event } from 'h3';
import connectDB from '../mongoose';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event: H3Event) => {
  try {

    const plainPassword = "test1234";
    const saltRounds = 10;

    bcrypt.hash(plainPassword, saltRounds).then((e) =>{
      console.log(e)
    });
    console.log("connecting db");
    await connectDB(); // Connect to MongoDB
    const users: IUser[] = await User.find(); // Fetch all users from MongoDB
    return { status: 200, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { status: 500, message: 'Error fetching users', error: (error as Error).message };
  }
});
