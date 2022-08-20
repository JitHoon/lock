import express from "express";
import { qna, seeQ, getUploadQ, postUploadQ, getEditQ, postEditQ } from "../controllers/qnaController";

const globalRouter = express.Router();

globalRouter.route("/").get(qna);
globalRouter.route("/:id(\\d+)").get(seeQ);
globalRouter.route("/uploadq").get(getUploadQ).post(postUploadQ);
globalRouter.route("/editq").get(getEditQ).post(postEditQ);

export default qnaRouter;