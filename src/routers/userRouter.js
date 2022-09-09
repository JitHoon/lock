import express from "express";
import { logout,
     getEdit, postEdit,
     getChangePassword, postChangePassword,
     startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { protectorMiddleware } from "../middlewares"

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);
userRouter
    .route("/change-password")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;