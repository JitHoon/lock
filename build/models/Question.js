"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 질문 데이터 : 번호, 제목, 작성자, 내용, 등록일, meta : 조회수 // hashtags 고민
var questionSchema = new _mongoose["default"].Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    "default": 0
  },
  admin: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Admin"
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
// 우리가 제공해주는 데이터 : number, createdAt, views
// 사용자가 제공하는 데이터 : title, writer, content, hashtags : array 형태

questionSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.startsWith("#") ? word : "#".concat(word);
  });
});
var Question = _mongoose["default"].model("Question", questionSchema);
var _default = Question;
exports["default"] = _default;