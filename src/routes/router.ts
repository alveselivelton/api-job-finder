import { Router } from "express";
import { Request, Response } from "express";

import userRouter from "./users";
import jobsRouter from "./jobs";

const router = Router();

router.use(userRouter);
router.use(jobsRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default router;
