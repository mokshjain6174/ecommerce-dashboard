import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.log('MISSING MONGODB_URI');
  }

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Cluster02", // Double check your DB name in Atlas!
      bufferCommands: false, // <--- CRITICAL FIX FOR TIMEOUTS
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
}