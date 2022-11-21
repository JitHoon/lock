"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = require("../controllers/adminController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var adminRouter = _express["default"].Router();
adminRouter.route("/adlocker") // 사물함 db 업로드 (임시)
.all(_middlewares.protectorMiddleware).get(_adminController.getAdPOSTLocker).post(_adminController.postAdPOSTLocker);
adminRouter.route("/adjoin") // 관리자 회원가입 (임시)
.all(_middlewares.publicOnlyMiddleware).get(_adminController.getAdJoin).post(_adminController.postAdJoin);
adminRouter.route("/adlogin") // 관리자 로그인
.all(_middlewares.publicOnlyMiddleware).get(_adminController.getAdLogin).post(_adminController.postAdLogin);
adminRouter.route("/:id([0-9a-f]{24})") // 관리자 홈
.get(_adminController.getAdHome);
adminRouter.route("/:id([0-9a-f]{24})/dblocker") // 사물함 데이터
.all(_middlewares.protectorMiddleware).get(_adminController.getDBLockers);
adminRouter.route("/:id([0-9a-f]{24})/dblocker/:id([0-9a-f]{24})") // 각 사물함 데이터
.all(_middlewares.protectorMiddleware).get(_adminController.getDBLocker);
adminRouter.route("/:id([0-9a-f]{24})/dblocker/:id([0-9a-f]{24})/changepw") // 각 사물함 비밀번호 변경
.all(_middlewares.protectorMiddleware).get(_adminController.getPWLocker).post(_adminController.postPWLocker);
adminRouter.route("/:id([0-9a-f]{24})/reclocker") // 사물함 반납 기록
.all(_middlewares.protectorMiddleware).get(_adminController.getRec).post(_adminController.postRec); // 사물함 비밀번호 변경 완료 버튼
adminRouter.route("/:id([0-9a-f]{24})/dbuser") // 사용자 데이터 전체 비번 초기화
.all(_middlewares.protectorMiddleware).get(_adminController.getDBUser).post(_adminController.postRePW);
adminRouter.route("/:id([0-9a-f]{24})/dbusers") // 사용자 데이터 검색 및 사물함 강제 해지
.all(_middlewares.protectorMiddleware).get(_adminController.getDBUserS).post(_adminController.postTerLocker);
adminRouter.route("/:id([0-9a-f]{24})/qna") // Q&A | 공지
.all(_middlewares.protectorMiddleware).get(_adminController.getAdQna);
adminRouter.route("/:id([0-9a-f]{24})/qna/searchQ") // Q&A | 공지 검색
.all(_middlewares.protectorMiddleware).get(_adminController.getAdQnaS);
adminRouter.route("/:id([0-9a-f]{24})/uploadq") // 공지 업로드
.all(_middlewares.protectorMiddleware).get(_adminController.getAdUploadQ).post(_adminController.postAdUploadQ);
adminRouter.route("/:id([0-9a-f]{24})/qna/:id([0-9a-f]{24})") // 질문 확인, 강제 삭제
.all(_middlewares.protectorMiddleware).get(_adminController.getAdSeeQ);
adminRouter.route("/:id([0-9a-f]{24})/qna/:id([0-9a-f]{24})/editq") // 공지 수정
.all(_middlewares.protectorMiddleware).get(_adminController.getAdEditQ).post(_adminController.postAdEditQ);
adminRouter.route("/:id([0-9a-f]{24})/qna/:id([0-9a-f]{24})/delete") // 공지 삭제
.all(_middlewares.protectorMiddleware).get(_adminController.deleteAdQ);
var _default = adminRouter;
exports["default"] = _default;