import express from "express";
import { home, 
    postReturn, } from "../controllers/rootController";
import { getJoin, postJoin,
    getLogin, postLogin, } from "../controllers/userController";
import { search } from "../controllers/qnaController";
import { publicOnlyMiddleware } from "../middlewares"

const rootRouter = express.Router();

rootRouter
    .route("/") // Q&A 사물함 내 정보 카드 화면
    .get(home);
rootRouter
    .route("/join") // 회원가입 화면
    .get(getJoin)
    .post(postJoin);
rootRouter
    .route("/login") // 로그인 화면
    .all(publicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin);
rootRouter.route("/return") // 사물함 반납 버튼
    .all(publicOnlyMiddleware)
    .post(postReturn);

export default rootRouter; 