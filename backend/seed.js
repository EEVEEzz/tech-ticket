import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
import colors from "colors";
import tickets from "./data/tickets.js";
import users from "./data/users.js";
import User from './models/userModel.js'
import Ticket from "./models/ticketModel.js";
import connectDB from "./config/db.js";

connectDB()

const importData = async () => {
    try {
        // clear everything
        await Ticket.deleteMany()
        await User.deleteMany()

        // create users from user model, get admin
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        // Create new object with user added
        const sampleTickets = tickets.map((item) => {
            return { ...item, user: adminUser }
        })

        // push to product model
        await Ticket.insertMany(sampleTickets)

        console.log(`Data imported`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error.message}`.red.inverse)
        process.exit(1)
    }
}

const destoryData = async () => {
    try {
        // clear everything
        await Ticket.deleteMany()
        await User.deleteMany()

        console.log(`Data Destoryed!`.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error.message}`.red.inverse)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destoryData()
} else {
    importData()
}