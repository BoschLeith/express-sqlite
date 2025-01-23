import express, { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../db.ts";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);
  res.sendStatus(201);
});

router.post("/login", (req: Request, res: Response) => {});

export default router;
