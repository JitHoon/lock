"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var recordSchema = new _mongoose["default"].Schema({
  lockerNum: {
    type: String,
    required: true,
    trim: true
  },
  locker_id: {
    type: String,
    required: true,
    trim: true
  },
  lockerPW: {
    type: String,
    required: true,
    trim: true
  },
  returnAt: {
    type: Date,
    "default": 0
  },
  change: {
    type: Boolean,
    "default": false
  },
  // 비밀번호 수정 완료 버튼으 따로 만들어야 id 가져오기 쉬움
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  } // 이름, 학번, 번호
});

var Record = _mongoose["default"].model("Record", recordSchema);
var _default = Record;
exports["default"] = _default;