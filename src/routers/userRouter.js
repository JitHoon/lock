import express from "express";
import { logout,
    myProfile, 
    getEdit, postEdit,
    getChangePassword, postChangePassword,} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares"

const userRouter = express.Router();

userRouter.route("/logout") // 로그아웃
.all(protectorMiddleware)
.get(logout);
userRouter.route("/:id") // 유저 프로필
.all(protectorMiddleware)
.get(myProfile)
userRouter.route("/:id/edit") // 유저 번호 변경
.all(protectorMiddleware)
.get(getEdit)
.post(postEdit);
userRouter
.route("/:id/changePassword") // 유저 아이디 변경
.all(protectorMiddleware)
.get(getChangePassword)
.post(postChangePassword);

export default userRouter;