import express from "express";
import { handleHome, handleJoin, handleLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/join", handleJoin);
globalRouter.get("/login", handleLogin);

export default globalRouter;