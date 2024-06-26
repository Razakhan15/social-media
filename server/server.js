const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");
const path = require("path");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
connectDb();
const corsOptions = {
  origin: "https://social-media-client-nsfh.onrender.com",
};
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.listen(PORT, console.log(`app is running on ${PORT}`));
