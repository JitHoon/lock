"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var commentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  questions: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
var Comment = _mongoose["default"].model("Comment", commentSchema);
var _default = Comment;
exports["default"] = _default;