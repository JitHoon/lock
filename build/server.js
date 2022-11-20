"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _adminRouter = _interopRequireDefault(require("./routers/adminRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _lockerRouter = _interopRequireDefault(require("./routers/lockerRouter"));
var _qnaRouter = _interopRequireDefault(require("./routers/qnaRouter"));
var _middlewares = require("./middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// adminRouter 추가후 201701703 유저만 post 가능하도록 만드는 middleware 만들기

var app = (0, _express["default"])();

/*
console.log(process.cwd());
*/

/*
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    // 어떤 method가 어느 url로 향하는지 알 수 있음
    // req.method = Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on.
    next();
};
const privativeMiddleware = (req, res, next) => {
    const url =req.url;

    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }

    console.log("Allowed");

    next();
};
const handleHome = (req, res) => {
    return res.end();
};
const handleProtected = (req, res) => {
    return res.send("<h1>Welcome to private lounge.<h1>");
};
app.use(morgan("dev"));
app.use(privativeMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);
*/

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(_middlewares.localsMiddleware);
app.use("/static", _express["default"]["static"]("assets")); // 브라우저를 위한 url
app.use("/public", _express["default"]["static"]("public"));
app.use("/", _rootRouter["default"]);
app.use("/admin", _adminRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/locker", _lockerRouter["default"]);
app.use("/qna", _qnaRouter["default"]);
var _default = app;
exports["default"] = _default;