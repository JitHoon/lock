import express from "express";
import { logout, edit, back, remove, profile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/return", back);
userRouter.get("/remove", remove);
userRouter.get(":id(\\d+)", profile);

export default userRouter;