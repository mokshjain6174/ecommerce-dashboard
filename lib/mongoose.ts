import mongoose from 'mongoose';

const MONGODB_URI=process.env.MONGODB_URI; 

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!MONGODB_URI) return console.log('MONGODB_URI is missing');

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);

    isConnected = true;
    console.log('MongoDB Connected Successfully! 🚀');
  } catch (error) {
    console.log('MongoDB Connection Failed:', error);
  }
}