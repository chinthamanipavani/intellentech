const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const taskRoutes=require("./routes/taskRoutes")
const submittedTaskRoutes = require("./routes/submittedTaskRoutes");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://intellentech-crwj.vercel.app"], // your Vercel frontend
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Fix preflight
// app.options("/*", cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tasks", submittedTaskRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
