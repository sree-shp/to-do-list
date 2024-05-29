const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/task", taskRoutes);

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL).then(() => {
  console.log("DB Connected");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
