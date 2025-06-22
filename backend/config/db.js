import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB ansluten");
  } catch (error) {
    console.error("❌ MongoDB-anslutning misslyckades:", error.message);
    process.exit(1);
  }
};

export default connectDB;