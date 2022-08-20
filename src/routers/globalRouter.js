import express from "express";
import { home } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.route("/").get(home);

export default globalRouter;