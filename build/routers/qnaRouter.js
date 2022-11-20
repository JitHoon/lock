"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _qnaController = require("../controllers/qnaController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var qnaRouter = _express["default"].Router();
qnaRouter.route("/") // 질문 리스트
.all(_middlewares.protectorMiddleware).get(_qnaController.mainQ);
qnaRouter.route("/searchQ") // 질문 검색
.all(_middlewares.protectorMiddleware).get(_qnaController.searchQ);
qnaRouter.route("/uploadq") // 질문 업로드
.all(_middlewares.protectorMiddleware).get(_qnaController.getUploadQ).post(_qnaController.postUploadQ);
qnaRouter.route("/:id([0-9a-f]{24})/editq") // 질문 수정
.all(_middlewares.protectorMiddleware).get(_qnaController.getEditQ).post(_qnaController.postEditQ);
qnaRouter.route("/:id([0-9a-f]{24})/delete") // 질문 삭제
.all(_middlewares.protectorMiddleware).get(_qnaController.deleteQ);
qnaRouter.route("/:id([0-9a-f]{24})") // 질문 자세히보기
.all(_middlewares.protectorMiddleware).get(_qnaController.seeQ);
qnaRouter.route("/:id([0-9a-f]{24})/comment") // 질문 댓글 등록
.all(_middlewares.protectorMiddleware).post(_qnaController.createComment);
qnaRouter.route("/:id([0-9a-f]{24})/commentdelete") // 질문 댓글 삭제
.all(_middlewares.protectorMiddleware)["delete"](_qnaController.deleteComment);
var _default = qnaRouter;
exports["default"] = _default;