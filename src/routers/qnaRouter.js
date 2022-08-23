import express from "express";
import { qna, seeQ, getUploadQ, postUploadQ, getEditQ, postEditQ, deleteQ } from "../controllers/qnaController";

const qnaRouter = express.Router();
 
qnaRouter.route("/").get(qna);
qnaRouter.route("/:id([0-9a-f]{24})").get(seeQ);
qnaRouter.route("/uploadq").get(getUploadQ).post(postUploadQ);
qnaRouter.route("/:id([0-9a-f]{24})/editq").get(getEditQ).post(postEditQ);
qnaRouter.route("/:id([0-9a-f]{24})/delete").get(deleteQ);

export default qnaRouter;