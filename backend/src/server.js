import express from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


import { mainRouter } from "./routes/index.js";
app.use("/api/v1/", mainRouter);

// sample api route
app.get("/", (req, res) => {
    res.json({ message: "Welcome!" })
})

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});