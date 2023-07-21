import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MONGO_URI`, `${conn.connection.host}`.cyan)
        console.log(`Welcome! to the Tech Ticket Backend!`.blue.bold)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB