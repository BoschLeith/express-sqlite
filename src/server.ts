import type { Request, Response } from "express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import authMiddleware from "./middleware/authMiddleware.ts";
import authRoutes from "./routes/authRoutes.ts";
import todoRoutes from "./routes/todoRoutes.ts";

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
