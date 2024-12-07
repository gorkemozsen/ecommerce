const express = require("express");
const path = require("path");

require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");

const db = require("./models");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
});
