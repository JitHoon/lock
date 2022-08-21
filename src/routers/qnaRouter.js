import express from "express";
import { qna, seeQ, getUploadQ, postUploadQ, getEditQ, postEditQ } from "../controllers/qnaController";

const qnaRouter = express.Router();
 
qnaRouter.route("/").get(qna);
qnaRouter.route("/:id([0-9a-f]{24})").get(seeQ);
qnaRouter.route("/uploadq").get(getUploadQ).post(postUploadQ);
qnaRouter.route("/editq").get(getEditQ).post(postEditQ);

export default qnaRouter;