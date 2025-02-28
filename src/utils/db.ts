import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "restaurant-app",
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw new Error("Database connection failed");
  }
};
