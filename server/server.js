const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
