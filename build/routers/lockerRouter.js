"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _lockerController = require("../controllers/lockerController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var lockerRouter = _express["default"].Router();
lockerRouter.route("/") // 사물함 배치도 및 신청
.all(_middlewares.protectorMiddleware).get(_lockerController.mainLocker);
lockerRouter.route("/:id([0-9a-f]{24})") // 사물함 신청
.all(_middlewares.protectorMiddleware).get(_lockerController.getSignup).post(_lockerController.postSignup);
lockerRouter.route("/:id([0-9a-f]{24})/return") // 사물함 반납
.all(_middlewares.protectorMiddleware).get(_lockerController.getReturn).post(_lockerController.postReturn);
lockerRouter.route("/alert") // 사물함 신청 완료 알림
.all(_middlewares.protectorMiddleware).get(_lockerController.getSuccess);
var _default = lockerRouter;
exports["default"] = _default;