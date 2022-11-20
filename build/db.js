"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect("mongodb://127.0.0.1:27017/locker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = _mongoose["default"].connection;
var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};
var handleError = function handleError(error) {
  return console.log("❌ DB Error", error);
};
db.once("open", handleOpen);
db.on("error", handleError);