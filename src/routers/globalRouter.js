import express from "express";
import { home, qna, getQ, postQ } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/qna", qna);
globalRouter.route("/question").get(getQ).post(postQ);

export default globalRouter;