import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import colors from "colors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;

const app = express();

connectDB()

// body parser for json and urlencode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

app.get("/", function (req, res) {
  res.status(200).json({ message: "API RUNNING" });
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`.magenta.bold);
});
