import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { mainRouter } from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/", mainRouter);

// sample api route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Express API!" })
})

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});