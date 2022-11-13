import express from "express";
import { mainQ, searchQ, getMyQ,
    seeQ,
    getUploadQ, postUploadQ,
    getEditQ, postEditQ, 
    deleteQ, 
    createComment, deleteComment } from "../controllers/qnaController";
import { protectorMiddleware } from "../middlewares"

const qnaRouter = express.Router();

qnaRouter.route("/") // 질문 리스트
.all(protectorMiddleware)
.get(mainQ);
qnaRouter.route("/searchQ") // 질문 검색
.all(protectorMiddleware)
.get(searchQ);
qnaRouter.route("/uploadq") // 질문 업로드
.all(protectorMiddleware)
.get(getUploadQ)
.post(postUploadQ);
qnaRouter.route("/:id([0-9a-f]{24})/editq") // 질문 수정
.all(protectorMiddleware)
.get(getEditQ)
.post(postEditQ);
qnaRouter.route("/:id([0-9a-f]{24})/delete") // 질문 삭제
.all(protectorMiddleware)
.get(deleteQ);
qnaRouter.route("/:id([0-9a-f]{24})") // 질문 자세히보기
.all(protectorMiddleware)
.get(seeQ);
qnaRouter.route("/:id([0-9a-f]{24})/comment") // 질문 댓글 등록
.all(protectorMiddleware)
.post(createComment);
qnaRouter.route("/:id([0-9a-f]{24})/commentdelete") // 질문 댓글 삭제
.all(protectorMiddleware)
.delete(deleteComment);

export default qnaRouter;