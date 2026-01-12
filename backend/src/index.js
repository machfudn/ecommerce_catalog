const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const corsMiddleware = require("./middlewares/cors");

const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`API berjalan di http://localhost:${port}`);
});
