require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const assetRoutes = require("./routes/assetRoutes");
const transferRoutes = require("./routes/transferRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB connected"))
.catch(err => console.log(err));

app.use("/api/assets", assetRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running"));