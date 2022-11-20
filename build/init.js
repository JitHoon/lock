"use strict";

require("regenerator-runtime");
require("dotenv/config");
require("./db");
require("./models/User");
require("./models/Locker");
require("./models/Question");
require("./models/Comment");
require("./models/Admin");
require("./models/Record");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = 4000;
var handleListening = function handleListening() {
  return console.log("Server listening on port http://localhost:".concat(PORT, " \uD83E\uDEE1"));
};
_server["default"].listen(PORT, handleListening);