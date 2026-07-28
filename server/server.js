import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from './routes/userRoutes.js'
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 4000;
const app = express();

// ✅ CORS (ONLY ONCE)
app.use(cors());
app.use(express.json());

await connectDB();

app.get("/", (req, res) => res.send("API Working"));

// ROUTES
app.use('/api/user', userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
