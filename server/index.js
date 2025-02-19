// IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db/db.js";
import { verifyToken } from "./middlewares/verifyToken.js";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

// CONFIGURATION
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use("/auth", authRoutes);
app.use("/movie", verifyToken, movieRoutes);
app.use("/tv", verifyToken, tvRoutes);
app.use("/search", verifyToken, searchRoutes);

// LISTEN
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});