import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).send({ message: "No token provided" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.userId = (decoded as { id: number }).id;
    next();
  });
};

export default authMiddleware;
