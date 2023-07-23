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

if (process.env.NODE_ENV === "production") {
  // Serve static files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Always serve index.html for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

} else {
  app.get("/", (req, res) => {
    res.send("API IS RUNNING");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.magenta.bold);
});

