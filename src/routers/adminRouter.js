import express from "express";
import { getAdPOSTLocker, postAdPOSTLocker,
    getAdJoin, postAdJoin,
    getAdLogin, postAdLogin,
    getAdHome,
    getDBLockers, 
    getDBLocker,
    getPWLocker, postPWLocker,
    getRec, postRec,
    getTerLocker, postTerLocker} from "../controllers/adminController";
import { protectorMiddleware, publicOnlyMiddleware,} from "../middlewares";

const adminRouter = express.Router();

adminRouter.route("/adlocker") // 사물함 db 업로드 (임시)
.all(protectorMiddleware)
.get(getAdPOSTLocker)
.post(postAdPOSTLocker);

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
adminRouter.route("/:id([0-9a-f]{24})") // 관리자 홈
.get(getAdHome);
adminRouter.route("/:id([0-9a-f]{24})/dblocker") // 사물함 데이터
.all(protectorMiddleware)
.get(getDBLockers);
adminRouter.route("/:id([0-9a-f]{24})/dblocker/:id([0-9a-f]{24})") // 각 사물함 데이터
.all(protectorMiddleware)
.get(getDBLocker)
adminRouter.route("/:id([0-9a-f]{24})/dblocker/:id([0-9a-f]{24})/changepw") // 각 사물함 비밀번호 변경
.all(protectorMiddleware)
.get(getPWLocker)
.post(postPWLocker);
adminRouter.route("/:id([0-9a-f]{24})/reclocker") // 사물함 반납 기록
.all(protectorMiddleware)
.get(getRec)
.post(postRec); // 사물함 비밀번호 변경 완료 버튼
adminRouter.route("/:id([0-9a-f]{24})/dblocker/:id([0-9a-f]{24})/terminate") // 각 사물함 강제 해지
.all(protectorMiddleware)
.get(getTerLocker)
.post(postTerLocker);

export default adminRouter;