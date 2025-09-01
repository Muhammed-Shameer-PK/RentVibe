import mongoose from 'mongoose';

// Disable SSL certificate validation for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

mongoose.set('strictQuery', false);

const MONGODB_URI = 'mongodb+srv://muhammedshameer616_db_user:RoRRSx7G1qmGgU5d@cluster0.pap6wzf.mongodb.net/rentvibe?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Keep trying for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Instead of exiting, let's try to handle the error gracefully
    console.log('Please check your MongoDB Atlas network access settings and make sure your IP is whitelisted');
    throw error;
  }
};