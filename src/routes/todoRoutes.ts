import express, { type Request, type Response } from "express";

import db from "../db.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
  if (req.userId) {
    const todos = getTodos.all(req.userId);
    res.json(todos);
  } else {
    res.status(400).json({ error: "User ID is required" });
  }
});

router.post("/", (req: Request, res: Response) => {
  const { task } = req.body;
  const insertTodo = db.prepare(
    `INSERT INTO todos (user_id, task) VALUES (?, ?)`
  );

  if (req.userId) {
    const result = insertTodo.run(req.userId, task);
    res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 });
  } else {
    res.status(400).json({ error: "User ID is required" });
  }
});

router.put("/:id", (req: Request, res: Response) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updatedTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
  updatedTodo.run(completed, id);

  res.json({ message: "Todo completed" });
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteTodo = db.prepare(
    `DELETE FROM todos WHERE id = ? AND user_id = ?`
  );

  if (req.userId) {
    deleteTodo.run(id, req.userId);
    res.json({ message: "Todo deleted" });
  } else {
    res.status(400).json({ error: "User ID is required" });
  }
});

export default router;
