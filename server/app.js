// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Import task routes
const taskRoutes = require("./routes/taskRoutes");

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for enabling CORS with specified origin
app.use(
  cors({
    origin: process.env.CORS_URL, // Allow requests from specified origin
  })
);

// Routes for handling task-related requests
app.use("/api/v1/task", taskRoutes);

// MongoDB connection URL
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB database
mongoose.connect(DATABASE_URL).then(() => {
  console.log("DB Connected");
});

// Port for the server to listen on
const port = process.env.PORT;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
