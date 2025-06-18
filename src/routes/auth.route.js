import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { signUpSchema } from "../validations/auth.validation.js";

const authRouter = Router();

authRouter.post("/sign-up", validate(signUpSchema), signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);
export default authRouter;
