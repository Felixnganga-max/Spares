const express = require("express");
const path = require("path");  // Add this import
const PORT = process.env.PORT || 4004;
const { connectDB } = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Import Spare Parts Router
const sparesRouter = require('./routes/sparesRoute.js');
const userRouter = require("./routes/userRoutes.js");
const cartRouter = require("./routes/cartRouter.js");
const orderRouter = require("./routes/orderRouter.js");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
connectDB();

// Route to test the app
app.get('/home', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

// Register Spare Parts Routes
app.use('/api/spares', sparesRouter);
app.use('/api/users', userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});