import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ errors: ["Acesso negado!"] });
    }

    const secret = process.env.JWT_SECRET as string;

    const decodedToken = jwt.verify(token, secret) as JwtPayload;

    req.body = await UserModel.findById(decodedToken.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};
