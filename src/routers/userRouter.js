import express from "express";
import { logout, startGithubLogin, finishGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;