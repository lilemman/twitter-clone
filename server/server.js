const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const postRoute = require("./routes/postRoute");

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/posts", require("./routes/postRoute"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
