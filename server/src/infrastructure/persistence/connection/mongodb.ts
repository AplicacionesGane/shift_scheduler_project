import mongoose from "mongoose";

export const connectToMongoDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};