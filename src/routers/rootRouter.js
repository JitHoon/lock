import express from "express";
import { home } from "../controllers/rootController";
import { search } from "../controllers/qnaController";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/search").get(search);

export default rootRouter;