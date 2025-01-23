import express, { type Request, type Response } from "express";

import db from "../db.ts";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {});

router.post("/", (req: Request, res: Response) => {});

router.put("/:id", (req: Request, res: Response) => {});

router.delete("/:id", (req: Request, res: Response) => {});

export default router;
