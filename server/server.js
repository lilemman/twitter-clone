process.env.NODE_ENV = process.env.NODE_ENV || "development";
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const postRoute = require("./routes/postRoute");
const notificationRoute = require("./routes/notificationRoute");

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT;
// const __dirname = path.resolve();

//body parser
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/notifications", notificationRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
} else {
  console.log("Running in development mode");
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
