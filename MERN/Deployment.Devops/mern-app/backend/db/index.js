// db/index.js
import mongoose from 'mongoose';

const opts = {
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, opts);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
}
