"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postTerLocker = exports.postRec = exports.postRePW = exports.postPWLocker = exports.postAdUploadQ = exports.postAdPOSTLocker = exports.postAdLogin = exports.postAdJoin = exports.postAdEditQ = exports.getRec = exports.getPWLocker = exports.getDBUserS = exports.getDBUser = exports.getDBLockers = exports.getDBLocker = exports.getAdUploadQ = exports.getAdSeeQ = exports.getAdQnaS = exports.getAdQna = exports.getAdPOSTLocker = exports.getAdLogin = exports.getAdJoin = exports.getAdHome = exports.getAdEditQ = exports.deleteAdQ = void 0;
var _Admin = _interopRequireDefault(require("../models/Admin"));
var _User = _interopRequireDefault(require("../models/User"));
var _Locker = _interopRequireDefault(require("../models/Locker"));
var _Question = _interopRequireDefault(require("../models/Question"));
var _Record = _interopRequireDefault(require("../models/Record"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getAdJoin = function getAdJoin(req, res) {
  res.render("admin/adJoin", {
    pageTitle: "관리자 가입"
  });
};
exports.getAdJoin = getAdJoin;
var postAdJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, userName, studentID, password, password2, phoneNumber, pageTitle;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, userName = _req$body.userName, studentID = _req$body.studentID, password = _req$body.password, password2 = _req$body.password2, phoneNumber = _req$body.phoneNumber;
            pageTitle = "관리자 가입"; // 비밀번호 재확인 오류 메시지 
            if (!(password !== password2)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(400).render("admin/adJoin", {
              pageTitle: pageTitle,
              errorMessage: "재확인 비밀번호가 일치하지 않습니다."
            }));
          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _Admin["default"].create({
              userName: userName,
              studentID: studentID,
              password: password,
              phoneNumber: phoneNumber
            });
          case 7:
            return _context.abrupt("return", res.redirect("/admin/adlogin"));
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", res.status(400).render("admin/adJoin", {
              pageTitle: pageTitle,
              errorMessage: _context.t0._message
            }));
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }));
  return function postAdJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postAdJoin = postAdJoin;
var getAdLogin = function getAdLogin(req, res) {
  res.render("admin/adLogin", {
    pageTitle: "관리자 로그인"
  });
};
exports.getAdLogin = getAdLogin;
var postAdLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, studentID, password, pageTitle, admin, ok;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, studentID = _req$body2.studentID, password = _req$body2.password;
            pageTitle = "관리자 로그인"; // 존재하지 않는 아이디 에러 메시지
            _context2.next = 4;
            return _Admin["default"].findOne({
              studentID: studentID
            });
          case 4:
            admin = _context2.sent;
            if (admin) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("admin/adLogin", {
              pageTitle: pageTitle,
              errorMessage: "존재하지 않는 아이디 입니다."
            }));
          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(password, admin.password);
          case 9:
            ok = _context2.sent;
            if (ok) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("admin/adLogin", {
              pageTitle: pageTitle,
              errorMessage: "잘못된 비밀번호 입니다."
            }));
          case 12:
            req.session.loggedIn = true;
            req.session.admin = admin;
            req.session.save(function (err) {
              if (err) {
                return res.status(500).render("/500", {
                  pageTitle: "500 loginSeverError"
                });
              } else return res.redirect("/admin/".concat(req.session.admin._id));
            });
          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function postAdLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postAdLogin = postAdLogin;
var getAdPOSTLocker = function getAdPOSTLocker(req, res) {
  var _id = req.session.admin._id;
  res.render("admin/adPOSTLocker", {
    pageTitle: "사물함 DB 업로드",
    _id: _id
  });
};
exports.getAdPOSTLocker = getAdPOSTLocker;
var postAdPOSTLocker = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _id, _req$body3, lockerNum, lockerPW, newLocker, admin;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.session.admin._id;
            _req$body3 = req.body, lockerNum = _req$body3.lockerNum, lockerPW = _req$body3.lockerPW;
            _context3.prev = 2;
            _context3.next = 5;
            return _Locker["default"].create({
              lockerNum: lockerNum,
              lockerPW: lockerPW,
              admin: _id
            });
          case 5:
            newLocker = _context3.sent;
            _context3.next = 8;
            return _Admin["default"].findById(_id);
          case 8:
            admin = _context3.sent;
            admin.lockers.push(newLocker._id);
            admin.save();
            return _context3.abrupt("return", res.redirect("/admin/adlocker"));
          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(400).render("admin/adPOSTLocker", {
              pageTitle: "사물함 DB 업로드",
              errorMessage: _context3.t0._message,
              _id: _id
            }));
          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14]]);
  }));
  return function postAdPOSTLocker(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.postAdPOSTLocker = postAdPOSTLocker;
var getAdHome = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _id;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.session.admin._id;
            return _context4.abrupt("return", res.render("admin/adHome", {
              pageTitle: "CNU 전자공학과 사물함 신청 시스템",
              _id: _id
            }));
          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function getAdHome(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getAdHome = getAdHome;
var getDBLockers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _id, lockers;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.session.admin._id;
            _context5.next = 3;
            return _Locker["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 3:
            lockers = _context5.sent;
            return _context5.abrupt("return", res.render("locker/mainLocker", {
              pageTitle: "사물함 배치도 및 리스트",
              lockers: lockers,
              _id: _id
            }));
          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getDBLockers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getDBLockers = getDBLockers;
var getDBLocker = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _id, id, locker, pageTitle;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            _context6.next = 4;
            return _Locker["default"].findById(id).populate("owner");
          case 4:
            locker = _context6.sent;
            pageTitle = locker.lockerNum + " 사물함 데이터";
            return _context6.abrupt("return", res.render("admin/adLocker", {
              pageTitle: pageTitle,
              locker: locker,
              _id: _id
            }));
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function getDBLocker(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getDBLocker = getDBLocker;
var getPWLocker = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _id, id, locker, pageTitle;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            _context7.next = 4;
            return _Locker["default"].findById(id).populate("owner");
          case 4:
            locker = _context7.sent;
            pageTitle = locker.lockerNum + " 사물함 비밀번호 변경";
            return _context7.abrupt("return", res.render("admin/adPWLocker", {
              pageTitle: pageTitle,
              locker: locker,
              _id: _id
            }));
          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function getPWLocker(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getPWLocker = getPWLocker;
var postPWLocker = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _id, id, locker, _req$body4, newPW1, newPW2, pageTitle, arr, set, changePWLocker;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            _context8.next = 4;
            return _Locker["default"].findById(id).populate("owner");
          case 4:
            locker = _context8.sent;
            _req$body4 = req.body, newPW1 = _req$body4.newPW1, newPW2 = _req$body4.newPW2;
            pageTitle = locker.lockerNum + " 사물함 비밀번호 변경";
            if (!(newPW1 !== newPW2)) {
              _context8.next = 9;
              break;
            }
            return _context8.abrupt("return", res.status(400).render("admin/adPWLocker", {
              pageTitle: pageTitle,
              locker: locker,
              _id: _id,
              errorMessage: "재확인 비밀번호가 일치하지 않습니다."
            }));
          case 9:
            arr = newPW1.split('');
            set = new Set(arr);
            if (!arr.includes('0')) {
              _context8.next = 13;
              break;
            }
            return _context8.abrupt("return", res.status(400).render("admin/adPWLocker", {
              pageTitle: pageTitle,
              locker: locker,
              _id: _id,
              errorMessage: "0을 포함할 수 없습니다."
            }));
          case 13:
            if (!(arr.length !== set.size)) {
              _context8.next = 15;
              break;
            }
            return _context8.abrupt("return", res.status(400).render("admin/adPWLocker", {
              pageTitle: pageTitle,
              locker: locker,
              _id: _id,
              errorMessage: "중복된 숫자가 포함되어 있습니다."
            }));
          case 15:
            _context8.prev = 15;
            _context8.next = 18;
            return _Locker["default"].findByIdAndUpdate(id, {
              lockerPW: newPW1
            }, {
              "new": true
            });
          case 18:
            changePWLocker = _context8.sent;
            req.session.locker = changePWLocker;
            return _context8.abrupt("return", res.redirect("/admin/".concat(_id, "/dblocker/").concat(locker._id)));
          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](15);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(400).render("admin/adPWLocker", {
              pageTitle: pageTitle,
              locker: locker,
              _id: _id,
              errorMessage: "사물함 비밀번호 변경 실패, 010-4671-0338 로 문의 주세요."
            }));
          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[15, 23]]);
  }));
  return function postPWLocker(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.postPWLocker = postPWLocker;
var getRec = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _id, records;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _id = req.session.admin._id;
            _context9.next = 3;
            return _Record["default"].find({}).populate("owner").sort({
              returnAt: "asc"
            });
          case 3:
            records = _context9.sent;
            return _context9.abrupt("return", res.render("admin/adRec", {
              pageTitle: "사물함 반납 기록 및 비번 변경",
              records: records,
              _id: _id
            }));
          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function getRec(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getRec = getRec;
var postRec = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _id, records, _req$body5, newPW, lockerNum, filter, pageTitle, arr, set, locker, record, changePWLocker, changeRecord;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _id = req.session.admin._id;
            _context10.next = 3;
            return _Record["default"].find({}).populate("owner").sort({
              returnAt: "asc"
            });
          case 3:
            records = _context10.sent;
            _req$body5 = req.body, newPW = _req$body5.newPW, lockerNum = _req$body5.lockerNum;
            filter = {
              lockerNum: lockerNum
            };
            pageTitle = "사물함 반납 기록 및 비번 변경";
            arr = newPW.split('');
            set = new Set(arr);
            if (!arr.includes('0')) {
              _context10.next = 11;
              break;
            }
            return _context10.abrupt("return", res.status(400).render("admin/adRec", {
              pageTitle: pageTitle,
              records: records,
              _id: _id,
              errorMessage: "0을 포함할 수 없습니다."
            }));
          case 11:
            if (!(arr.length !== set.size)) {
              _context10.next = 13;
              break;
            }
            return _context10.abrupt("return", res.status(400).render("admin/adRec", {
              pageTitle: pageTitle,
              records: records,
              _id: _id,
              errorMessage: "중복된 숫자가 포함되어 있습니다."
            }));
          case 13:
            _context10.next = 15;
            return _Locker["default"].findOne(filter);
          case 15:
            locker = _context10.sent;
            _context10.next = 18;
            return _Record["default"].findOne(filter);
          case 18:
            record = _context10.sent;
            if (!(locker === null)) {
              _context10.next = 21;
              break;
            }
            return _context10.abrupt("return", res.status(400).render("admin/adRec", {
              pageTitle: pageTitle,
              records: records,
              _id: _id,
              errorMessage: "사물함 번호가 일치하지 않습니다."
            }));
          case 21:
            if (!(record === null)) {
              _context10.next = 23;
              break;
            }
            return _context10.abrupt("return", res.status(400).render("admin/adRec", {
              pageTitle: pageTitle,
              records: records,
              _id: _id,
              errorMessage: "사물함 번호가 일치하지 않습니다."
            }));
          case 23:
            _context10.prev = 23;
            _context10.next = 26;
            return _Locker["default"].findOneAndUpdate(filter, {
              lockerPW: newPW
            }, {
              "new": true
            });
          case 26:
            changePWLocker = _context10.sent;
            req.session.locker = changePWLocker;
            _context10.next = 30;
            return _Record["default"].findOneAndUpdate(filter, {
              change: true,
              lockerPW: newPW
            }, {
              "new": true
            });
          case 30:
            changeRecord = _context10.sent;
            req.session.record = changeRecord;
            return _context10.abrupt("return", res.redirect("/admin/".concat(_id, "/reclocker")));
          case 35:
            _context10.prev = 35;
            _context10.t0 = _context10["catch"](23);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(400).render("admin/adRec", {
              pageTitle: pageTitle,
              records: records,
              _id: _id,
              errorMessage: "사물함 비밀번호 변경 실패, 010-4671-0338 로 문의 주세요."
            }));
          case 39:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[23, 35]]);
  }));
  return function postRec(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.postRec = postRec;
var getDBUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _id, users;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _id = req.session.admin._id;
            _context11.next = 3;
            return _User["default"].find({}).populate("lockers").sort({
              studentID: "asc"
            });
          case 3:
            users = _context11.sent;
            return _context11.abrupt("return", res.render("admin/dbUser", {
              pageTitle: "사용자 데이터",
              users: users,
              _id: _id
            }));
          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function getDBUser(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.getDBUser = getDBUser;
var getDBUserS = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _id, keyword, users;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _id = req.session.admin._id;
            keyword = req.query.keyword;
            users = [];
            if (!keyword) {
              _context12.next = 7;
              break;
            }
            _context12.next = 6;
            return _User["default"].find({
              userName: {
                $regex: new RegExp(keyword, "ig")
              }
            }).populate("lockers");
          case 6:
            users = _context12.sent;
          case 7:
            return _context12.abrupt("return", res.render("admin/dbUserS", {
              pageTitle: "사용자 데이터",
              users: users,
              keyword: keyword,
              _id: _id
            }));
          case 8:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return function getDBUserS(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getDBUserS = getDBUserS;
var postRePW = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _id, users, studentID, user, pageTitle, resetPW;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _id = req.session.admin._id;
            _context13.next = 3;
            return _User["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 3:
            users = _context13.sent;
            studentID = req.body.studentID;
            _context13.next = 7;
            return _User["default"].findOne({
              studentID: studentID
            });
          case 7:
            user = _context13.sent;
            pageTitle = "사용자 데이터";
            resetPW = "0000";
            if (!user) {
              _context13.next = 18;
              break;
            }
            if (!(studentID != user.studentID)) {
              _context13.next = 13;
              break;
            }
            return _context13.abrupt("return", res.status(400).render("admin/dbUser", {
              pageTitle: pageTitle,
              users: users,
              _id: _id,
              errorMessage: "학번을 정확히 입력하세요."
            }));
          case 13:
            user.password = resetPW;
            _context13.next = 16;
            return user.save();
          case 16:
            _context13.next = 19;
            break;
          case 18:
            return _context13.abrupt("return", res.status(400).render("admin/dbUser", {
              pageTitle: pageTitle,
              users: users,
              _id: _id,
              errorMessage: "학번을 정확히 입력하세요."
            }));
          case 19:
            return _context13.abrupt("return", res.render("admin/dbUser", {
              pageTitle: pageTitle,
              users: users,
              _id: _id,
              errorMessage: user.userName + " 사용자 비밀번호 초기화 완료."
            }));
          case 20:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return function postRePW(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.postRePW = postRePW;
var postTerLocker = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _id, users, studentID, user, pageTitle, now, kr, terLocker, terUser;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _id = req.session.admin._id;
            _context14.next = 3;
            return _User["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 3:
            users = _context14.sent;
            studentID = req.body.studentID;
            _context14.next = 7;
            return _User["default"].findOne({
              studentID: studentID
            }).populate("lockers");
          case 7:
            user = _context14.sent;
            pageTitle = "사용자 데이터";
            now = new Date();
            kr = new Date(now.setHours(now.getHours() + 9));
            if (!user) {
              _context14.next = 29;
              break;
            }
            if (!(studentID != user.studentID)) {
              _context14.next = 14;
              break;
            }
            return _context14.abrupt("return", res.status(400).render("admin/dbUser", {
              pageTitle: pageTitle,
              users: users,
              _id: _id,
              errorMessage: "학번을 정확히 입력하세요."
            }));
          case 14:
            if (!(user.lockers !== null)) {
              _context14.next = 21;
              break;
            }
            _context14.next = 17;
            return _Locker["default"].findByIdAndUpdate(user.lockers._id, {
              owner: null,
              available: true,
              returnAt: kr
            }, {
              "new": true
            });
          case 17:
            terLocker = _context14.sent;
            req.session.locker = terLocker;
            _context14.next = 22;
            break;
          case 21:
            return _context14.abrupt("return", res.render("admin/dbUser", {
              pageTitle: pageTitle,
              users: users,
              _id: _id
            }));
          case 22:
            _context14.next = 24;
            return _User["default"].findByIdAndUpdate(user._id, {
              lockers: null,
              availableLocker: true
            }, {
              "new": true
            });
          case 24:
            terUser = _context14.sent;
            req.session.user = terUser;
            return _context14.abrupt("return", res.redirect("/admin/" + _id + "/dbusers?keyword=" + user.userName));
          case 29:
            return _context14.abrupt("return", res.status(400).render("admin/dbUser", {
              pageTitle: pageTitle,
              users: users,
              _id: _id,
              errorMessage: "학번을 정확히 입력하세요."
            }));
          case 30:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return function postTerLocker(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.postTerLocker = postTerLocker;
var getAdQna = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _id, questions;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _id = req.session.admin._id;
            _context15.next = 3;
            return _Question["default"].find({}).populate("admin").sort({
              createdAt: "desc"
            });
          case 3:
            questions = _context15.sent;
            return _context15.abrupt("return", res.render("qna/mainQ", {
              pageTitle: "Q&A",
              questions: questions,
              _id: _id
            }));
          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return function getAdQna(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getAdQna = getAdQna;
var getAdQnaS = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _id, keyword, questions;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _id = req.session.admin._id;
            keyword = req.query.keyword;
            questions = [];
            if (!keyword) {
              _context16.next = 7;
              break;
            }
            _context16.next = 6;
            return _Question["default"].find({
              content: {
                $regex: new RegExp(keyword, "ig")
              }
            }).populate("owner").populate("admin");
          case 6:
            questions = _context16.sent;
          case 7:
            return _context16.abrupt("return", res.render("qna/searchQ", {
              pageTitle: "Q&A",
              questions: questions,
              _id: _id
            }));
          case 8:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return function getAdQnaS(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
exports.getAdQnaS = getAdQnaS;
var getAdUploadQ = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _id;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _id = req.session.admin._id;
            return _context17.abrupt("return", res.render("qna/uploadQ", {
              pageTitle: "공지 업로드",
              _id: _id
            }));
          case 2:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return function getAdUploadQ(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
exports.getAdUploadQ = getAdUploadQ;
var postAdUploadQ = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var _id, content, now, kr, newQuestion, admin;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            // user id를 question db에 추가
            _id = req.session.admin._id;
            content = req.body.content;
            now = new Date();
            kr = new Date(now.setHours(now.getHours() + 9));
            _context18.prev = 4;
            _context18.next = 7;
            return _Question["default"].create({
              content: content,
              createdAt: kr,
              admin: _id
            });
          case 7:
            newQuestion = _context18.sent;
            _context18.next = 10;
            return _Admin["default"].findById(_id);
          case 10:
            admin = _context18.sent;
            admin.questions.push(newQuestion._id);
            // save 함수가 불러오면서 비밀번호가 또 해싱되는 문제 발생
            admin.save();
            return _context18.abrupt("return", res.redirect("/admin/" + _id + "/qna"));
          case 16:
            _context18.prev = 16;
            _context18.t0 = _context18["catch"](4);
            console.log(_context18.t0);
            return _context18.abrupt("return", res.status(400).render("/admin/" + _id + "/uploadq", {
              pageTitle: "공지 업로드",
              _id: _id,
              errorMessage: _context18.t0
            }));
          case 20:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[4, 16]]);
  }));
  return function postAdUploadQ(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
exports.postAdUploadQ = postAdUploadQ;
var getAdSeeQ = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var _id, id, question;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            _context19.next = 4;
            return _Question["default"].findById(id).populate("owner").populate("comments");
          case 4:
            question = _context19.sent;
            if (question) {
              _context19.next = 7;
              break;
            }
            return _context19.abrupt("return", res.status(404).render("404", {
              pageTitle: "질문을 찾을 수 없습니다."
            }));
          case 7:
            return _context19.abrupt("return", res.render("qna/seeQ", {
              pageTitle: "Q&A",
              question: question,
              _id: _id
            }));
          case 8:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return function getAdSeeQ(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
exports.getAdSeeQ = getAdSeeQ;
var getAdEditQ = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var _id, id, question;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            _context20.next = 4;
            return _Question["default"].findById(id);
          case 4:
            question = _context20.sent;
            if (question) {
              _context20.next = 7;
              break;
            }
            return _context20.abrupt("return", res.status(404).render("404", {
              pageTitle: "공지를 찾을 수 없습니다."
            }));
          case 7:
            return _context20.abrupt("return", res.render("qna/editQ", {
              pageTitle: "공지 수정",
              question: question,
              _id: _id
            }));
          case 8:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return function getAdEditQ(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
exports.getAdEditQ = getAdEditQ;
var postAdEditQ = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var _id, id, content, question, editQ;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            content = req.body.content;
            _context21.next = 5;
            return _Question["default"].findById(id);
          case 5:
            question = _context21.sent;
            if (question) {
              _context21.next = 8;
              break;
            }
            return _context21.abrupt("return", res.status(404).render("404", {
              pageTitle: "공지를 찾을 수 없습니다."
            }));
          case 8:
            _context21.next = 10;
            return _Question["default"].findByIdAndUpdate(id, {
              content: content
            }, {
              "new": true
            });
          case 10:
            editQ = _context21.sent;
            req.session.question = editQ;
            return _context21.abrupt("return", res.redirect("/admin/" + _id + "/qna"));
          case 13:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));
  return function postAdEditQ(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
exports.postAdEditQ = postAdEditQ;
var deleteAdQ = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var _id, id, question;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _id = req.session.admin._id;
            id = req.params.id;
            _context22.next = 4;
            return _Question["default"].findById(id);
          case 4:
            question = _context22.sent;
            if (question) {
              _context22.next = 7;
              break;
            }
            return _context22.abrupt("return", res.status(404).render("404", {
              pageTitle: "질문을 찾을 수 없습니다."
            }));
          case 7:
            _context22.next = 9;
            return _Question["default"].findByIdAndRemove(id);
          case 9:
            return _context22.abrupt("return", res.redirect("/admin/" + _id + "/qna"));
          case 10:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));
  return function deleteAdQ(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();
exports.deleteAdQ = deleteAdQ;