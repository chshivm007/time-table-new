import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabaseName';

export default async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return; // Avoid reconnecting if already connected
  try {
    console.log('MONGO uri', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
