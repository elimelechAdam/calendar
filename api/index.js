import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import permissions from "./src/controllers/permissions.js";
import requests from "./src/controllers/requests.js";

dotenv.config();

if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/permissions", permissions);
app.use("/api/requests", requests);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`Cannot connect to database: ${error.message}`);
    process.exit(1);
  });
