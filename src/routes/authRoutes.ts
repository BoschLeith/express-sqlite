import bcrypt from "bcryptjs";
import express, { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import db from "../db.ts";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);

    const defaultTodo = `Hello, ${username}!`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ id: result.lastInsertRowid }, jwtSecret, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
});

router.post("/login", (req: Request, res: Response) => {});

export default router;
