import { Router } from "express";

import { jobController } from "../controllers/jobController";

import { validate } from "../middlewares/handleValidation";
import { jobCreateValidation } from "../middlewares/jobValidation";
import { authGuard } from "../middlewares/authGuard";

const router = Router();

router.post("/jobs", jobCreateValidation(), validate, jobController.create);
router.get("/jobs", jobController.index);
router.get("/jobs/search", jobController.search);
router.get("/jobs/:id", jobController.findById);
router.get("/users/dashboard/:id", authGuard, jobController.getUserJobs);
router.put("/jobs/:id", jobCreateValidation(), validate, jobController.update);
router.delete("/jobs/:id", jobController.delete);

export default router;
