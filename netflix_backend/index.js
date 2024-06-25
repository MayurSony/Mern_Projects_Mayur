// Step 1: Creating the server using express
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

dotenv.config(); // Load environment variables first

const app = express();

// Middleware part
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  
};
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, I am coming from the backend",
    success: true,
  });
});

// API routes
app.use("/api/v1/user", userRoute); // Example: http://localhost:8080/api/v1/user/register

// Database connection
databaseConnection();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
