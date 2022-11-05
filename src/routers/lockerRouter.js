import express from "express";
import { mainLocker, alphabetLocker,
    getAplly, postAplly,
    getUploadLocker, postUploadLocker } from "../controllers/lockerController";
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares";

const lockerRouter = express.Router();

lockerRouter
.route("/") // 사물함 전체 사진
.all(protectorMiddleware)
.get(mainLocker);
lockerRouter
.route("/alphabet") // 3*3 사물함 보여줌
.all(protectorMiddleware)
.get(alphabetLocker)
lockerRouter
.route("/alphabet/:id([0-9a-f]{24})") // 사물함을 하나 클릭했을 때
.all(protectorMiddleware)
.get(getAplly)
.post(postAplly); // 버튼 구현
lockerRouter
.route("/uploadLocker") // 사물함 업로드 페이지
.all(protectorMiddleware)
.get(getUploadLocker)
.post(postUploadLocker);


export default lockerRouter;