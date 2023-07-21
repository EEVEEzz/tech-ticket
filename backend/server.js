import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import colors from "colors";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddlewar.js";
import ticketRoutes from './routes/ticketRoutes.js'
import userRoutes from './routes/userRoutes.js'
import clientRoutes from './routes/clientRoutes.js'

const PORT = process.env.PORT;

const app = express();

connectDB()

// body parser for json and urlencode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

app.use("/api/tickets", ticketRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", function (req, res) {
  res.status(200).json({ message: "API IS RUNNING" });
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`.magenta.bold);
});
