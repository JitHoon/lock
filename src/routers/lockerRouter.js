import express from "express";
import { mainLocker,
    getSignup, postSignup,
    getReturn, postReturn,
    getSuccess } from "../controllers/lockerController";
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares";

const lockerRouter = express.Router();

lockerRouter.route("/") // 사물함 배치도 및 신청
.all(protectorMiddleware)
.get(mainLocker);
lockerRouter.route("/:id([0-9a-f]{24})") // 사물함 신청
.all(protectorMiddleware)
.get(getSignup)
.post(postSignup);
lockerRouter.route("/:id([0-9a-f]{24})/return") // 사물함 반납
.all(protectorMiddleware)
.get(getReturn)
.post(postReturn);
lockerRouter.route("/alert") // 사물함 신청 완료 알림
.all(protectorMiddleware)
.get(getSuccess);

export default lockerRouter;