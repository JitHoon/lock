import express from "express";
import { mainLocker,
    getSignup, postSignup, } from "../controllers/lockerController";
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares";

const lockerRouter = express.Router();

lockerRouter
.route("/") // 사물함 전체 사진
.all(protectorMiddleware)
.get(mainLocker);
lockerRouter
.route("/:id([0-9a-f]{24})") // 사물함을 하나 클릭했을 때
.all(protectorMiddleware)
.get(getSignup)
.post(postSignup); // 버튼 구현

export default lockerRouter;