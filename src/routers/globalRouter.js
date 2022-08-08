import express from "express";
import { home, qna, getQ, postQ } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/qna").get(qna);
globalRouter.route("/question").get(getQ).post(postQ);

export default globalRouter;