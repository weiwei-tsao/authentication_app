import mongoose from 'mongoose';
import config from './index';

const db = config.mongoURI;

const connectDB = async (): Promise<void> => {
  try {
    console.log('Attempting to connect to MongoDB...');

    if (!db || db === '') {
      throw new Error(
        'MongoDB URI is empty or undefined. Check your environment variables.'
      );
    }

    await mongoose.connect(db, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 10000, // Close sockets after 10 seconds of inactivity
    });
    console.log('MongoDB Connected: ' + `${db}`);
  } catch (err) {
    const error = err as Error;
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
