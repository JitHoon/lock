import express from "express";
import { logout,
    myProfile, 
    getEdit, postEdit,
    getMyQ,
    getChangePassword, postChangePassword,
    startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares"

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/:id")
.all(protectorMiddleware)
    .get(myProfile)
userRouter.route("/:id/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);
userRouter.route("/:id/q")
    .all(protectorMiddleware)
    .get(getMyQ)
userRouter
    .route("/:id/changePassword")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;