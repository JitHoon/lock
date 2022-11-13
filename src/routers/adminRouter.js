import express from "express";
import { getAdJoin, postAdJoin,
    getAdLogin, postAdLogin,
    getAdLocker, postAdLocker } from "../controllers/adminController";
import { protectorMiddleware, publicOnlyMiddleware,} from "../middlewares";

const adminRouter = express.Router();

/*
adminRouter.route("/adjoin") // 관리자 회원가입 (임시)
.all(publicOnlyMiddleware)
.get(getAdJoin)
.post(postAdJoin);
*/

adminRouter.route("/adlogin") // 관리자 로그인
.all(publicOnlyMiddleware)
.get(getAdLogin)
.post(postAdLogin);

adminRouter.route("/adlocker") // 사물함 db 업로드
.all(protectorMiddleware)
.get(getAdLocker)
.post(postAdLocker);

export default adminRouter;