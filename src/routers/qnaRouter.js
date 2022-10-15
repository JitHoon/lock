import express from "express";
import { mainQ, searchQ, getMyQ,
    seeQ,
    getUploadQ, postUploadQ,
    getEditQ, postEditQ, 
    deleteQ, } from "../controllers/qnaController";
import { protectorMiddleware } from "../middlewares"

const qnaRouter = express.Router();

qnaRouter 
    .route("/") // 질문 메인 페이지
    .get(mainQ);
qnaRouter 
    .route("/searchQ") // 질문 검색 페이지
    .get(searchQ);
qnaRouter
    .route("/:id([0-9a-f]{24})") // 질문 답변 확인 페이지
    .all(protectorMiddleware)
    .get(seeQ);
qnaRouter
    .route("/uploadq") // 질문 업로드 페이지
    .all(protectorMiddleware)
    .get(getUploadQ)
    .post(postUploadQ);
qnaRouter
    .route("/:id([0-9a-f]{24})/editq") // 질문 수정 페이지
    .all(protectorMiddleware)
    .get(getEditQ)
    .post(postEditQ);
qnaRouter
    .route("/:id([0-9a-f]{24})/delete") // 질문 삭제 페이지
    .all(protectorMiddleware)
    .get(deleteQ);

export default qnaRouter;