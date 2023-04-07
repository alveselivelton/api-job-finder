import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../models/User";

export const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        return res.status(422).json({ errors: ["E-mail já cadastrado!"] });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      await UserModel.create({
        name,
        email,
        password: passwordHash,
      });

      return res.status(201).json({ msg: "Usuário criado com sucesso." });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ errors: ["Usuário não encontrado!"] });
      }

      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        return res
          .status(422)
          .json({ errors: ["E-mail e/ou senha inválido!"] });
      }

      const secret = process.env.JWT_SECRET as string;

      const token = jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });

      return res.status(200).json({
        token,
        _id: user._id,
      });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },

  getCurrentUser: async (req: Request, res: Response) => {
    const user = req.body;

    return res.status(200).json(user);
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const user = await UserModel.findById(id).select("-password");

      if (!user) {
        return res.status(404).json({ errors: ["Usuário não encontrado!"] });
      }

      return res.status(200).json(user);
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },
};
