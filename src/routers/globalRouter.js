import express from "express";
import { home } from "../controllers/globalController";
import { search } from "../controllers/qnaController";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/search").get(search);

export default globalRouter;