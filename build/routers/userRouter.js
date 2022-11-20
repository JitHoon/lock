"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.route("/logout") // 로그아웃
.all(_middlewares.protectorMiddleware).get(_userController.logout);
userRouter.route("/:id") // 유저 프로필
.all(_middlewares.protectorMiddleware).get(_userController.myProfile);
userRouter.route("/:id/edit") // 유저 번호 변경
.all(_middlewares.protectorMiddleware).get(_userController.getEdit).post(_userController.postEdit);
userRouter.route("/:id/changePassword") // 유저 아이디 변경
.all(_middlewares.protectorMiddleware).get(_userController.getChangePassword).post(_userController.postChangePassword);
var _default = userRouter;
exports["default"] = _default;