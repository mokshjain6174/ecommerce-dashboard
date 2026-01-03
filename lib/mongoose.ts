import mongoose from 'mongoose';

/**
 * Global Connection Tracker
 * In a serverless environment (like Vercel), functions can be reused.
 * This variable prevents opening multiple unnecessary connections to MongoDB.
 */
let isConnected = false; // Track the connection status

/**
 * connectToDB
 * Establishes a connection to the MongoDB database.
 * Includes critical configurations for stability and performance.
 */
export const connectToDB = async () => {
  // Set strictQuery to ensure Mongoose only saves fields defined in our Schema
  mongoose.set('strictQuery', true);
  // Security Check: Ensure the database URI is provided in the environment variables
  if (!process.env.MONGODB_URI) {
    return console.log('MISSING MONGODB_URI');
  }
// Connection Optimization: If already connected, do not attempt to reconnect
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    /**
     * Database Connection
     * - dbName: Explicitly targets your specific database cluster.
     * - bufferCommands: Disabling this prevents Mongoose from queueing commands
     * when the connection is down, which is a major cause of Vercel timeouts.
     */
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Cluster02", 
      bufferCommands: false, 
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    
  }
}