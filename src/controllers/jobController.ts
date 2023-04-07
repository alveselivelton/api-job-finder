import { Request, Response } from "express";

import { JobModel } from "../models/Job";

export const jobController = {
  create: async (req: Request, res: Response) => {
    try {
      const {
        title,
        description,
        company,
        email,
        salary,
        experience,
        workingModel,
        userId,
      } = req.body;

      const job = await JobModel.create({
        title,
        description,
        company,
        email,
        salary,
        experience,
        workingModel,
        userId,
      });

      return res.status(201).json({ msg: "Vaga criada com sucesso!", job });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  },

  index: async (req: Request, res: Response) => {
    try {
      const jobs = await JobModel.find()
        .sort([["createdAt", -1]])
        .exec();

      return res.status(200).json({ jobs });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const job = await JobModel.findById(id);

      if (!job) {
        return res.status(404).json({ errors: ["Nenhuma vaga encontrada!"] });
      }

      return res.status(200).json({ job });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },

  getUserJobs: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const jobs = await JobModel.find({ userId: id })
        .sort([["createdAt", -1]])
        .exec();

      if (jobs.length === 0) {
        return res
          .status(404)
          .json({ errors: ["Você ainda não postou nenguma vaga!"] });
      }

      return res.status(200).json({ jobs });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },

  search: async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;
      const jobs = await JobModel.find({ title: new RegExp(q, "i") })
        .sort([["createdAt", -1]])
        .exec();

      if (jobs.length === 0) {
        return res.status(404).json({ errors: ["Nenhuma vaga encontrada!"] });
      }

      return res.status(200).json({ jobs });
    } catch (e: any) {
      console.log(e.message);

      return res
        .status(500)
        .json({ errors: ["Por favor, tente novamente mais tarde!"] });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.body;

      const userJob = await JobModel.findById(id);

      if (!userJob) {
        return res.status(404).json({ errors: ["A vaga não existe."] });
      }

      const job = await JobModel.updateOne({ _id: id }, data);

      return res.status(200).json({ msg: "Vaga atualizada com sucesso!", job });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const job = await JobModel.findById(id);

      if (!job) {
        return res.status(404).json({ errors: ["A vaga não existe."] });
      }

      await job.deleteOne();

      return res.status(200).json({ msg: "Vaga excluida com sucesso!", job });
    } catch (e: any) {
      console.log(e.message);
      return res
        .status(500)
        .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    }
  },
};
