import express from "express";
import { home, qna, seeQ, getUploadQ, postUploadQ, getEditQ, postEditQ } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/qna").get(qna);
globalRouter.route("/qna/:id(\\d+)").get(seeQ);
globalRouter.route("/uploadq").get(getUploadQ).post(postUploadQ);
globalRouter.route("/editq").get(getEditQ).post(postEditQ);

export default globalRouter;