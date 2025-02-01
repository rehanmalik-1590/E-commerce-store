import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);  // Debugging log
        
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);  // Exit the process if connection fails
    }
};

export default connectDB;
