import { Router } from "express";

import { userController } from "../controllers/userController";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import {
  userLoginValidation,
  userCreateValidation,
} from "../middlewares/userValidation";

const router = Router();

router.post(
  "/users/register",
  userCreateValidation(),
  validate,
  userController.create
);
router.post(
  "/users/login",
  userLoginValidation(),
  validate,
  userController.login
);
router.get("/users/dashboard", authGuard, userController.getCurrentUser);
router.get("/users/:id", userController.findById);

export default router;
