import express from "express";
import { home } from "../controllers/rootController";
import { getJoin, postJoin,
    getLogin, postLogin, } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares"

const rootRouter = express.Router();

rootRouter.route("/") // 홈
.get(home);
rootRouter.route("/join") // 회원가입
.all(publicOnlyMiddleware)
.get(getJoin)
.post(postJoin);
rootRouter.route("/login") // 로그인
.all(publicOnlyMiddleware)
.get(getLogin)
.post(postLogin);

export default rootRouter; 