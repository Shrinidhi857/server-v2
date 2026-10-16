import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middleware/errorHandler.js";
import authMiddleware from "./middleware/authMiddleware.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use("/api",authMiddleware);
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT  current_database()");
  res.send(`The database name is :${result.rows[0].current_database}`);
});

// Routes
app.use("/api/user", userRoutes);

//Error handling  Middleware
app.use(errorHandling);

//Create table before starting server
createUserTable();

//Testing Postgres Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT  current_database()");
  res.send(`The database name is :${result.rows[0].current_database}`);
});
//server running
app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${port}`);

});
