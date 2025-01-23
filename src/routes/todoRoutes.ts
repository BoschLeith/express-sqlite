import express, { type Request, type Response } from "express";

import db from "../db.ts";

interface CustomRequest extends Request {
  userId?: string;
}

const router = express.Router();

router.get("/", (req: CustomRequest, res: Response) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
  if (req.userId) {
    const todos = getTodos.all(req.userId);
    res.json(todos);
  } else {
    res.status(400).json({ error: "User ID is required" });
  }
});

router.post("/", (req: Request, res: Response) => {});

router.put("/:id", (req: Request, res: Response) => {});

router.delete("/:id", (req: Request, res: Response) => {});

export default router;
