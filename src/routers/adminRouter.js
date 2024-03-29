import express from "express";
import { getAdPOSTLocker, postAdPOSTLocker,
    getAdJoin, postAdJoin,
    getAdLogin, postAdLogin,
    getAdHome,
    getDBLockers, 
    getDBLocker,
    getPWLocker, postPWLocker,
    getRec, postRec,
    getDBUser, postRePW,
    getDBUserS, postTerLocker,
    getAdQna, getAdQnaS,
    getAdUploadQ, postAdUploadQ,
    getAdEditQ, postAdEditQ,
    getAdSeeQ,
    deleteAdQ} from "../controllers/adminController";
import { protectorMiddleware, publicOnlyMiddleware,} from "../middlewares";

const adminRouter = express.Router();

adminRouter.route("/adlocker") // 사물함 db 업로드 (임시)
.all(protectorMiddleware)
.get(getAdPOSTLocker)
.post(postAdPOSTLocker);

adminRouter.route("/adjoin") // 관리자 회원가입 (임시)
.all(publicOnlyMiddleware)
.get(getAdJoin)
.post(postAdJoin);

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
adminRouter.route("/:id([0-9a-f]{24})/dbuser") // 사용자 데이터 전체 비번 초기화
.all(protectorMiddleware)
.get(getDBUser)
.post(postRePW)
adminRouter.route("/:id([0-9a-f]{24})/dbusers") // 사용자 데이터 검색 및 사물함 강제 해지
.all(protectorMiddleware)
.get(getDBUserS)
.post(postTerLocker)
adminRouter.route("/:id([0-9a-f]{24})/qna") // Q&A | 공지
.all(protectorMiddleware)
.get(getAdQna);
adminRouter.route("/:id([0-9a-f]{24})/qna/searchQ") // Q&A | 공지 검색
.all(protectorMiddleware)
.get(getAdQnaS);
adminRouter.route("/:id([0-9a-f]{24})/uploadq") // 공지 업로드
.all(protectorMiddleware)
.get(getAdUploadQ)
.post(postAdUploadQ);
adminRouter.route("/:id([0-9a-f]{24})/qna/:id([0-9a-f]{24})") // 질문 확인, 강제 삭제
.all(protectorMiddleware)
.get(getAdSeeQ);
adminRouter.route("/:id([0-9a-f]{24})/qna/:id([0-9a-f]{24})/editq") // 공지 수정
.all(protectorMiddleware)
.get(getAdEditQ)
.post(postAdEditQ);
adminRouter.route("/:id([0-9a-f]{24})/qna/:id([0-9a-f]{24})/delete") // 공지 삭제
.all(protectorMiddleware)
.get(deleteAdQ);

export default adminRouter;