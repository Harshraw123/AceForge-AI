import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI is not defined in environment variables');
            return false;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        // Don't exit process in production, just log the error
        if (process.env.NODE_ENV === 'production') {
            console.error("Database connection failed, but continuing without DB");
            return false;
        } else {
            process.exit(1);
        }
    }
}

export default connectDb;