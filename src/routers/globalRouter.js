import express from "express";
import { home, join, login, lockers } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/lockers", lockers)

export default globalRouter;