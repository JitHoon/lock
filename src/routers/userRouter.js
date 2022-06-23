import express from "express";
import { handleEditUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", handleEditUser);

export default userRouter;