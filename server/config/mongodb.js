import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected (Atlas)");
  } catch (error) {
    console.log("❌ DB Connection Error:", error.message);
  }
};

export default connectDB;
