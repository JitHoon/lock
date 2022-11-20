"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _rootController = require("../controllers/rootController");
var _userController = require("../controllers/userController");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootRouter = _express["default"].Router();
rootRouter.route("/") // 사용자 홈
.get(_rootController.getHome);
rootRouter.route("/join") // 회원가입
.all(_middlewares.publicOnlyMiddleware).get(_userController.getJoin).post(_userController.postJoin);
rootRouter.route("/login") // 로그인
.all(_middlewares.publicOnlyMiddleware).get(_userController.getLogin).post(_userController.postLogin);
var _default = rootRouter;
exports["default"] = _default;