import mongoose from "mongoose";

const connectDB = async () => {
   try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/quiz_system`);
    console.log("Connected to MongoDB");
   } catch (error) {
    console.log("MongoDB connection failed", error);
   }
}

export default connectDB;