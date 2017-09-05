/* IMPORT */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var chalk = require("chalk");
var child_process_1 = require("child_process");
var inquirer = require("inquirer");
var isOnline = require("is-online");
var path = require("path");
var pify = require("pify");
var temp = require("temp");
var fs = require("fs");
var zlib = require("zlib");
var request = require("request");
/* UTILS */
temp.track(); // Delete temp files on process exit
var Utils = {
    exec: function (command, options) {
        if (options === void 0) { options = {}; }
        var cwd = path.resolve(__dirname, '..'); // In order to properly call programs under `/node_modules/.bin`
        return pify(child_process_1.exec)(command, _.extend({ cwd: cwd }, options));
    },
    spawn: function (command, options) {
        if (options === void 0) { options = {}; }
        var cwd = path.resolve(__dirname, '..'); // In order to properly call programs under `/node_modules/.bin`
        child_process_1.spawn(command, _.extend({ cwd: cwd, shell: true }, options)); //TSC: can't return
    },
    checkConnection: function () {
        return __awaiter(this, void 0, void 0, function () {
            var online;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, isOnline()];
                    case 1:
                        online = _a.sent();
                        if (!online)
                            throw new Error(chalk.red("Looks like you are offline, try again later.\n"));
                        return [2 /*return*/];
                }
            });
        });
    },
    prompt: {
        confirm: function (message, fallback) {
            if (fallback === void 0) { fallback = false; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, inquirer.prompt({
                                type: 'confirm',
                                name: 'result',
                                message: message,
                                default: fallback
                            })];
                        case 1:
                            result = (_a.sent()).result;
                            return [2 /*return*/, !!result];
                    }
                });
            });
        },
        input: function (message, fallback) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, inquirer.prompt({
                                type: 'input',
                                name: 'result',
                                message: message,
                                default: fallback,
                                validate: function (x) { return !_.isUndefined(fallback) || (_.isString(x) && !!x.trim()); }
                            })];
                        case 1:
                            result = (_a.sent()).result;
                            return [2 /*return*/, result];
                    }
                });
            });
        },
        list: function (message, arr, fallback) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, inquirer.prompt({
                                type: 'list',
                                name: 'result',
                                choices: arr,
                                pageSize: 10,
                                message: message,
                                default: fallback,
                                validate: function (x) { return !_.isUndefined(fallback) || (_.isString(x) && x.trim()); }
                            })];
                        case 1:
                            result = (_a.sent()).result;
                            return [2 /*return*/, result];
                    }
                });
            });
        },
        yesOrNo: function (message, fallback) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Utils.prompt.list(message, ['yes', 'no'], fallback)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result === 'yes'];
                    }
                });
            });
        }
    },
    generateTempFile: function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        temp.open(options, function (err, _a) {
                            var tempFile = _a.path;
                            if (err)
                                return reject(err);
                            return resolve(tempFile);
                        });
                    })];
            });
        });
    },
    downloadGunzip: function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var tempFile;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Utils.generateTempFile()];
                                case 1:
                                    tempFile = _a.sent();
                                    request(url)
                                        .pipe(zlib.createGunzip())
                                        .pipe(fs
                                        .createWriteStream(tempFile)
                                        .on('finish', function () { return resolve(tempFile); })
                                        .on('error', function (err) { return reject(err); }));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLCtDQUEwQztBQUMxQyxtQ0FBcUM7QUFDckMsb0NBQXNDO0FBQ3RDLDJCQUE2QjtBQUM3QiwyQkFBNkI7QUFDN0IsMkJBQTZCO0FBQzdCLHVCQUF5QjtBQUN6QiwyQkFBNkI7QUFDN0IsaUNBQW1DO0FBR25DLFdBQVc7QUFDWCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxvQ0FBb0M7QUFFbEQsSUFBTSxLQUFLLEdBQUc7SUFFWixJQUFJLFlBQUcsT0FBTyxFQUFFLE9BQVk7UUFBWix3QkFBQSxFQUFBLFlBQVk7UUFFMUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQyxnRUFBZ0U7UUFFOUcsTUFBTSxDQUFDLElBQUksQ0FBRyxvQkFBSSxDQUFFLENBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUcsRUFBQyxHQUFHLEtBQUEsRUFBQyxFQUFFLE9BQU8sQ0FBRSxDQUFFLENBQUM7SUFFL0QsQ0FBQztJQUVELEtBQUssWUFBRyxPQUFPLEVBQUUsT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTtRQUUzQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFHLFNBQVMsRUFBRSxJQUFJLENBQUUsQ0FBQyxDQUFDLGdFQUFnRTtRQUU5RyxxQkFBSyxDQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFHLEVBQUMsR0FBRyxLQUFBLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBRSxDQUFFLENBQUMsQ0FBQyxtQkFBbUI7SUFFbkYsQ0FBQztJQUVLLGVBQWU7Ozs7OzRC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