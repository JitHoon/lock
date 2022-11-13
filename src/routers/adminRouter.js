import express from "express";
import { getAdJoin, postAdJoin,
    getAdLocker, postAdLocker,
    getAdHome,
    getAdLogin, postAdLogin,
    getDBLocker } from "../controllers/adminController";
import { protectorMiddleware, publicOnlyMiddleware,} from "../middlewares";

const adminRouter = express.Router();

/*
adminRouter.route("/adjoin") // 관리자 회원가입 (임시)
.all(publicOnlyMiddleware)
.get(getAdJoin)
.post(postAdJoin);
*/

/*
adminRouter.route("/adlocker") // 사물함 db 업로드 (임시)
.all(protectorMiddleware)
.get(getAdLocker)
.post(postAdLocker);
*/
adminRouter.route("/") // 관리자 홈
.get(getAdHome);
adminRouter.route("/adlogin") // 관리자 로그인
.all(publicOnlyMiddleware)
.get(getAdLogin)
.post(postAdLogin);
adminRouter.route("/dblocker") // 사물함 데이터
.all(protectorMiddleware)
.get(getDBLocker);


export default adminRouter;