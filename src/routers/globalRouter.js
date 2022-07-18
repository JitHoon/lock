import express from "express";
import { home, join, login, findpw } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/findpw", findpw);

export default globalRouter;