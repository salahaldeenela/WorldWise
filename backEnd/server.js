import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import citiesRoutes from "./routes/cities.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cities", citiesRoutes);

app.get("/", (req, res) => {
  res.json({ status: "WorldWise API running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on", PORT);
});
