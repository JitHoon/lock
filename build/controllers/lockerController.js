"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSignup = exports.postReturn = exports.mainLocker = exports.getSuccess = exports.getSignup = exports.getReturn = void 0;
var _Locker = _interopRequireDefault(require("../models/Locker"));
var _User = _interopRequireDefault(require("../models/User"));
var _Admin = _interopRequireDefault(require("../models/Admin"));
var _Record = _interopRequireDefault(require("../models/Record"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var mainLocker = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _id, lockers;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = req.session.user._id;
            _context.next = 3;
            return _Locker["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 3:
            lockers = _context.sent;
            return _context.abrupt("return", res.render("locker/mainLocker", {
              pageTitle: "사물함 배치도 및 신청",
              lockers: lockers,
              _id: _id
            }));
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function mainLocker(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/* 사물함 db 불러오는 방법 참고

export const getMyQ = async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("questions");
  
    return res.render("users/myQuestion", { pageTitle: "My Questions", user, });
  };

*/
exports.mainLocker = mainLocker;
var getSignup = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _id, id, user, locker, lockers, pageTitle;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = req.session.user._id;
            id = req.params.id;
            _context2.next = 4;
            return _User["default"].findById(_id);
          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return _Locker["default"].findById(id);
          case 7:
            locker = _context2.sent;
            _context2.next = 10;
            return _Locker["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 10:
            lockers = _context2.sent;
            pageTitle = locker.lockerNum + " 사물함 신청";
            if (!req.session.user.availableLocker) {
              _context2.next = 16;
              break;
            }
            return _context2.abrupt("return", res.render("locker/signUpLocker", {
              pageTitle: pageTitle,
              locker: locker,
              lockers: lockers
            }));
          case 16:
            return _context2.abrupt("return", res.render("locker/youHaveLocker", {
              pageTitle: pageTitle,
              locker: locker,
              lockers: lockers,
              user: user
            }));
          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getSignup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getSignup = getSignup;
var postSignup = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _id, id, locker, lockers, lockerNum, pageTitle, now, kr, end, signUpLocker, signUpUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.session.user._id;
            id = req.params.id;
            _context3.next = 4;
            return _Locker["default"].findById(id);
          case 4:
            locker = _context3.sent;
            _context3.next = 7;
            return _Locker["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 7:
            lockers = _context3.sent;
            lockerNum = req.body.lockerNum;
            pageTitle = locker.lockerNum + " 사물함 신청";
            now = new Date();
            kr = new Date(now.setHours(now.getHours() + 9));
            end = new Date(kr.setMonth(kr.getMonth() + 3)).toISOString();
            if (!(locker.lockerNum !== lockerNum)) {
              _context3.next = 15;
              break;
            }
            return _context3.abrupt("return", res.status(400).render("locker/signUpLocker", {
              pageTitle: pageTitle,
              locker: locker,
              lockers: lockers,
              errorMessage: "사물함 번호가 일치하지 않습니다."
            }));
          case 15:
            _context3.prev = 15;
            _context3.next = 18;
            return _Locker["default"].findByIdAndUpdate(id, {
              owner: _id,
              available: false,
              signupAt: kr
            }, {
              "new": true
            });
          case 18:
            signUpLocker = _context3.sent;
            req.session.locker = signUpLocker;
            _context3.next = 22;
            return _User["default"].findByIdAndUpdate(_id, {
              lockers: id,
              availableLocker: false,
              signupLockerAt: kr,
              returnDate: end
            }, {
              "new": true
            });
          case 22:
            signUpUser = _context3.sent;
            req.session.user = signUpUser;
            return _context3.abrupt("return", res.redirect("/locker/alert"));
          case 27:
            _context3.prev = 27;
            _context3.t0 = _context3["catch"](15);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(400).render("locker/signUpLocker", {
              pageTitle: pageTitle,
              locker: locker,
              lockers: lockers,
              errorMessage: "사물함 신청 실패, 010-4671-0338 로 문의 주세요."
            }));
          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[15, 27]]);
  }));
  return function postSignup(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.postSignup = postSignup;
var getReturn = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _id, id, user, locker, lockers, pageTitle;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = req.session.user._id;
            id = req.params.id;
            _context4.next = 4;
            return _User["default"].findById(_id).populate("lockers");
          case 4:
            user = _context4.sent;
            _context4.next = 7;
            return _Locker["default"].findById(id);
          case 7:
            locker = _context4.sent;
            _context4.next = 10;
            return _Locker["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 10:
            lockers = _context4.sent;
            pageTitle = user.userName + "님의 " + locker.lockerNum + " 사물함 반납";
            return _context4.abrupt("return", res.render("locker/returnLocker", {
              pageTitle: pageTitle,
              locker: locker,
              lockers: lockers,
              user: user
            }));
          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function getReturn(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getReturn = getReturn;
var postReturn = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _id, id, user, locker, lockers, lockerNum, pageTitle, now, kr, returnLocker, filter, newRec, returnUser;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.session.user._id;
            id = req.params.id;
            _context5.next = 4;
            return _User["default"].findById(_id).populate("lockers");
          case 4:
            user = _context5.sent;
            _context5.next = 7;
            return _Locker["default"].findById(id);
          case 7:
            locker = _context5.sent;
            _context5.next = 10;
            return _Locker["default"].find({}).sort({
              lockerNum: "asc"
            });
          case 10:
            lockers = _context5.sent;
            lockerNum = req.body.lockerNum;
            pageTitle = user.userName + "님의 " + locker.lockerNum + " 사물함 반납";
            now = new Date();
            kr = new Date(now.setHours(now.getHours() + 9));
            if (!(locker.lockerNum !== lockerNum)) {
              _context5.next = 17;
              break;
            }
            return _context5.abrupt("return", res.status(400).render("locker/returnLocker", {
              pageTitle: pageTitle,
              locker: locker,
              user: user,
              errorMessage: "사물함 번호가 일치하지 않습니다."
            }));
          case 17:
            _context5.prev = 17;
            _context5.next = 20;
            return _Locker["default"].findByIdAndUpdate(id, {
              owner: null,
              available: true,
              returnAt: kr
            }, {
              "new": true
            });
          case 20:
            returnLocker = _context5.sent;
            req.session.locker = returnLocker;
            filter = {
              locker_id: id
            };
            _context5.next = 25;
            return _Record["default"].findOneAndRemove(filter);
          case 25:
            _context5.next = 27;
            return _Record["default"].create({
              lockerNum: lockerNum,
              locker_id: id,
              lockerPW: locker.lockerPW,
              returnAt: kr,
              owner: _id
            });
          case 27:
            newRec = _context5.sent;
            _context5.next = 30;
            return _User["default"].findByIdAndUpdate(_id, {
              lockers: null,
              availableLocker: true,
              returnDate: 0,
              records: newRec._id
            }, {
              "new": true
            });
          case 30:
            returnUser = _context5.sent;
            req.session.user = returnUser;
            return _context5.abrupt("return", res.redirect("/users/".concat(req.session.user._id)));
          case 35:
            _context5.prev = 35;
            _context5.t0 = _context5["catch"](17);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(400).render("locker/returnLocker", {
              pageTitle: pageTitle,
              locker: locker,
              lockers: lockers,
              user: user,
              errorMessage: "사물함 반납 실패, 010-4671-0338 로 문의 주세요."
            }));
          case 39:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[17, 35]]);
  }));
  return function postReturn(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postReturn = postReturn;
var getSuccess = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _id, user, locker, now, kr, end;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = req.session.user._id;
            _context6.next = 3;
            return _User["default"].findById(_id);
          case 3:
            user = _context6.sent;
            locker = req.session.locker;
            now = new Date();
            kr = new Date(now.setHours(now.getHours() + 9));
            end = new Date(kr.setMonth(kr.getMonth() + 3)).toISOString();
            return _context6.abrupt("return", res.render("locker/successLocker", {
              pageTitle: "사물함 신청 완료",
              locker: locker,
              user: user,
              end: end
            }));
          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function getSuccess(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getSuccess = getSuccess;