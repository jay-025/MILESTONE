import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Access denied. Token required.",
    });
    return;
  }

  const secret = process.env.JWT_SECRET as string;

  jwt.verify(token, secret, (error, user) => {
    if (error) {
      res.status(403).json({
        message: "Invalid or expired token.",
      });
      return;
    }

    next();
  });
}

export default authenticateToken;