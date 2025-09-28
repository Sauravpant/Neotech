import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB connected... Connection host ${connectionInstance.connection.host}`
    );
  } catch (err: any) {
    console.error("Failed connecting the MongoDB...");
  }
};

export default connectDB;
