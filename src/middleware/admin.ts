import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function adminOnly(
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

  jwt.verify(token, secret, (error, decodedUser: any) => {
    if (error) {
      res.status(403).json({
        message: "Invalid or expired token.",
      });
      return;
    }

    if (decodedUser.role !== "admin") {
      res.status(403).json({
        message: "Admin access required.",
      });
      return;
    }

    next();
  });
}

export default adminOnly;