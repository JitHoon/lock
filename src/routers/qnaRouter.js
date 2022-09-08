import express from "express";
import { qna, seeQ, getUploadQ, postUploadQ, getEditQ, postEditQ, deleteQ } from "../controllers/qnaController";
import { protectorMiddleware } from "../middlewares"

const qnaRouter = express.Router();
 
qnaRouter
    .route("/").get(qna);
qnaRouter
    .route("/:id([0-9a-f]{24})")
    .all(protectorMiddleware)
    .get(seeQ);
qnaRouter
    .route("/uploadq")
    .all(protectorMiddleware)
    .get(getUploadQ)
    .post(postUploadQ);
qnaRouter
    .route("/:id([0-9a-f]{24})/editq")
    .all(protectorMiddleware)
    .get(getEditQ)
    .post(postEditQ);
qnaRouter
    .route("/:id([0-9a-f]{24})/delete")
    .all(protectorMiddleware)
    .get(deleteQ);

export default qnaRouter;