"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.myProfile = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import fetch from "node-fetch";

// [rootRouter]
var getJoin = function getJoin(req, res) {
  return res.render("users/join", {
    pageTitle: "회원가입"
  });
};
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, userName, studentID, password, password2, phoneNumber, pageTitle, exists;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, userName = _req$body.userName, studentID = _req$body.studentID, password = _req$body.password, password2 = _req$body.password2, phoneNumber = _req$body.phoneNumber;
            pageTitle = "회원가입"; // 비밀번호 재확인 오류 메시지 
            if (!(password !== password2)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "재확인 비밀번호가 일치하지 않습니다."
            }));
          case 4:
            _context.next = 6;
            return _User["default"].exists({
              $or: [{
                studentID: studentID
              }, {
                phoneNumber: phoneNumber
              }]
            });
          case 6:
            exists = _context.sent;
            if (!exists) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "이미 회원가입된 학번 혹은 전화번호 입니다."
            }));
          case 9:
            _context.prev = 9;
            _context.next = 12;
            return _User["default"].create({
              userName: userName,
              studentID: studentID,
              password: password,
              phoneNumber: phoneNumber
            });
          case 12:
            return _context.abrupt("return", res.render("users/join", {
              pageTitle: pageTitle,
              errorMessage: "회원 가입이 완료되었습니다."
            }));
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](9);
            return _context.abrupt("return", res.status(400).render("users/join", {
              pageTitle: pageTitle,
              errorMessage: _context.t0._message
            }));
          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 15]]);
  }));
  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var getLogin = function getLogin(req, res) {
  res.render("users/login", {
    pageTitle: "로그인"
  });
};
exports.getLogin = getLogin;
var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, studentID, password, pageTitle, user, ok;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, studentID = _req$body2.studentID, password = _req$body2.password;
            pageTitle = "로그인"; // 존재하지 않는 아이디 에러 메시지
            _context2.next = 4;
            return _User["default"].findOne({
              studentID: studentID
            });
          case 4:
            user = _context2.sent;
            if (user) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("users/login", {
              pageTitle: pageTitle,
              errorMessage: "존재하지 않는 학번입니다."
            }));
          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(password, user.password);
          case 9:
            ok = _context2.sent;
            if (ok) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", res.status(400).render("users/login", {
              pageTitle: pageTitle,
              errorMessage: "잘못된 비밀번호 입니다."
            }));
          case 12:
            req.session.loggedIn = true;
            req.session.user = user;
            req.session.save(function (err) {
              if (err) {
                return res.status(500).render("/500", {
                  pageTitle: "500 로그인 서버 에러"
                });
              } else return res.redirect("/");
            });
          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var logout = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req.session.destroy(function (err) {
              if (err) {
                return res.status(500).render("/500", {
                  pageTitle: "500 로그인 서버 에러"
                });
              } else return res.redirect("/");
            });
          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function logout(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.logout = logout;
var myProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _User["default"].findById(id).populate("lockers");
          case 3:
            user = _context4.sent;
            return _context4.abrupt("return", res.render("users/myProfile", {
              pageTitle: user.userName + "님의 프로필",
              user: user
            }));
          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function myProfile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// edit-profile 
exports.myProfile = myProfile;
var getEdit = function getEdit(req, res) {
  return res.render("users/editProfile", {
    pageTitle: "전화번호 변경"
  });
};
exports.getEdit = getEdit;
var postEdit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _id, phoneNumber, updatedUser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.session.user._id, phoneNumber = req.body.phoneNumber; // 아래 변수 선언들을 위와같이 ES6로 개선 가능
            // const id = req.session.user.id
            // const  {password, phoneNumber } = req.body;
            _context5.next = 3;
            return _User["default"].findByIdAndUpdate(_id, {
              phoneNumber: phoneNumber
            }, {
              "new": true
            }
            // findByIdAndUpdate의 option으로 mongoose에게 가장 최근에 업데이트된 object를 가져오라는 option
            );
          case 3:
            updatedUser = _context5.sent;
            req.session.user = updatedUser;
            return _context5.abrupt("return", res.redirect("/users/".concat(req.session.user._id)));
          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function postEdit(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// change password
exports.postEdit = postEdit;
var getChangePassword = function getChangePassword(req, res) {
  return res.render("users/changePassword", {
    pageTitle: "비밀번호 변경"
  });
};
exports.getChangePassword = getChangePassword;
var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _id, _req$body3, oldPW, newPW1, newPW2, pageTitle, user, ok;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // session과 body에서 user id와 사용자가 입력한 form 정보 불러오기
            _id = req.session.user._id, _req$body3 = req.body, oldPW = _req$body3.oldPW, newPW1 = _req$body3.newPW1, newPW2 = _req$body3.newPW2;
            pageTitle = "비밀번호 변경"; // db에서 user id 찾아오기 
            _context6.next = 4;
            return _User["default"].findById(_id);
          case 4:
            user = _context6.sent;
            _context6.next = 7;
            return _bcrypt["default"].compare(oldPW, user.password);
          case 7:
            ok = _context6.sent;
            if (ok) {
              _context6.next = 10;
              break;
            }
            return _context6.abrupt("return", res.status(400).render("users/changePassword", {
              pageTitle: pageTitle,
              errorMessage: "현재 비밀번호와 일치하지 않습니다."
            }));
          case 10:
            if (!(newPW1 != newPW2)) {
              _context6.next = 12;
              break;
            }
            return _context6.abrupt("return", res.status(400).render("users/changePassword", {
              pageTitle: pageTitle,
              errorMessage: "재확인 비밀번호가 일치하지 않습니다."
            }));
          case 12:
            if (!(oldPW == newPW1 && newPW1 == newPW2)) {
              _context6.next = 14;
              break;
            }
            return _context6.abrupt("return", res.status(400).render("users/changePassword", {
              pageTitle: pageTitle,
              errorMessage: "Nothing change"
            }));
          case 14:
            // db에서 불러온 user 비밀번호를 새비밀번호로 업데이트
            user.password = newPW1;

            // save()는 비동기식 함수이므로 새로운 데이터가 서버에 저장될 때까지 동기식 처리
            _context6.next = 17;
            return user.save();
          case 17:
            return _context6.abrupt("return", res.redirect("/users/logout"));
          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function postChangePassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.postChangePassword = postChangePassword;