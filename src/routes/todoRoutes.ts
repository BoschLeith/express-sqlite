import express, { type Request, type Response } from "express";

import prisma from "../prismaClient.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const todos = prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });

  res.json(todos);
});

router.post("/", async (req: Request, res: Response) => {
  const { task } = req.body;
  const userId = req.userId;

  if (userId === undefined) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  const todo = await prisma.todo.create({
    data: {
      task,
      userId,
    },
  });

  res.json(todo);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updateTodo = await prisma.todo.update({
    where: {
      id: Number(id),
      userId: req.userId,
    },
    data: {
      completed: !!completed,
    },
  });

  res.json(updateTodo);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  await prisma.todo.delete({
    where: {
      id: Number(id),
      userId,
    },
  });

  res.json({ message: "Todo deleted" });
});

export default router;
