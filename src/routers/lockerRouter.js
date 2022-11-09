import express from "express";
import { mainLocker,
    getSignup, postSignup, } from "../controllers/lockerController";
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares";

const lockerRouter = express.Router();

lockerRouter
.route("/") // 사물함 위치 및 신청 페이지
.all(protectorMiddleware)
.get(mainLocker);
lockerRouter
.route("/:id([0-9a-f]{24})") // 사물함 신청 페이지
.all(protectorMiddleware)
.get(getSignup)
.post(postSignup);

export default lockerRouter;