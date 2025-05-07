import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ratesRouter from "./routes/rates";
import { startScheduler } from "./services/scheduler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/rates', ratesRouter);

app.get("/health", async (req, res) => {
  res.send("backend running");
});

startScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
