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
/* UTILS */
var Utils = {
    exec: function (command, options) {
        if (options === void 0) { options = {}; }
        var cwd = path.resolve(__dirname, '..'); // In order to properly call programs under `/node_modules/.bin`
        return pify(child_process_1.exec)(command, _.extend({ cwd: cwd }, options));
    },
    spawn: function (command, args, options) {
        if (args === void 0) { args = []; }
        if (options === void 0) { options = {}; }
        var cwd = path.resolve(__dirname, '..'); // In order to properly call programs under `/node_modules/.bin`
        child_process_1.spawn(command, args, _.extend({ cwd: cwd }, options)); //TSC: can't return
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
        }
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLCtDQUEwQztBQUMxQyxtQ0FBcUM7QUFDckMsb0NBQXNDO0FBQ3RDLDJCQUE2QjtBQUM3QiwyQkFBNkI7QUFFN0IsV0FBVztBQUVYLElBQU0sS0FBSyxHQUFHO0lBRVosSUFBSSxZQUFHLE9BQU8sRUFBRSxPQUFZO1FBQVosd0JBQUEsRUFBQSxZQUFZO1FBRTFCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUcsU0FBUyxFQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsZ0VBQWdFO1FBRTlHLE1BQU0sQ0FBQyxJQUFJLENBQUcsb0JBQUksQ0FBRSxDQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFHLEVBQUMsR0FBRyxLQUFBLEVBQUMsRUFBRSxPQUFPLENBQUUsQ0FBRSxDQUFDO0lBRS9ELENBQUM7SUFFRCxLQUFLLFlBQUcsT0FBTyxFQUFFLElBQW1CLEVBQUUsT0FBWTtRQUFqQyxxQkFBQSxFQUFBLFNBQW1CO1FBQUUsd0JBQUEsRUFBQSxZQUFZO1FBRWhELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUcsU0FBUyxFQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsZ0VBQWdFO1FBRTlHLHFCQUFLLENBQUcsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFHLEVBQUMsR0FBRyxLQUFBLEVBQUMsRUFBRSxPQUFPLENBQUUsQ0FBRSxDQUFDLENBQUMsbUJBQW1CO0lBRTNFLENBQUM7SUFFSyxlQUFlOzs7Ozs0QkFFSixxQkFBTSxRQUFRLEVBQUcsRUFBQTs7aUNBQWpCLFNBQWlCO3dCQUVoQyxFQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU8sQ0FBQzs0QkFBQyxNQUFNLElBQUksS0FBSyxDQUFHLEtBQUssQ0FBQyxHQUFHLENBQUcsZ0RBQWdELENBQUUsQ0FBRSxDQUFFOzs7OztLQUVwRztJQUVELE1BQU0sRUFBRTtRQUVBLE9BQU8sWUFBRyxPQUFlLEVBQUUsUUFBZ0I7WUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7Ozs7O2dDQUU5QixxQkFBTSxRQUFRLENBQUMsTUFBTSxDQUFFO2dDQUN0QyxJQUFJLEVBQUUsU0FBUztnQ0FDZixJQUFJLEVBQUUsUUFBUTtnQ0FDZCxPQUFPLFNBQUE7Z0NBQ1AsT0FBTyxFQUFFLFFBQVE7NkJBQ2xCLENBQUMsRUFBQTs7cUNBTGUsQ0FBQSxTQUtmLENBQUE7NEJBRUYsc0JBQU8sQ0FBQyxDQUFDLE1BQU0sRUFBQzs7OztTQUVqQjtRQUVLLEtBQUssWUFBRyxPQUFPLEVBQUUsUUFBUzs7Ozs7Z0NBRWIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTtnQ0FDdEMsSUFBSSxFQUFFLE9BQU87Z0NBQ2IsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsT0FBTyxTQUFBO2dDQUNQLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixRQUFRLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUcsUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsUUFBUSxDQUFHLENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFHLENBQUUsRUFBbEUsQ0FBa0U7NkJBQ2xGLENBQUMsRUFBQTs7cUNBTmUsQ0FBQSxTQU1mLENBQUE7NEJBRUYsc0JBQU8sTUFBTSxFQUFDOzs7O1NBRWY7UUFFSyxJQUFJLFlBQUcsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFTOzs7OztnQ0FFakIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTtnQ0FDdEMsSUFBSSxFQUFFLE1BQU07Z0NBQ1osSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsT0FBTyxFQUFFLEdBQUc7Z0NBQ1osUUFBUSxFQUFFLEVBQUU7Z0NBQ1osT0FBTyxTQUFBO2dDQUNQLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixRQUFRLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUcsUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsUUFBUSxDQUFHLENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUcsQ0FBRSxFQUFoRSxDQUFnRTs2QkFDaEYsQ0FBQyxFQUFBOztxQ0FSZSxDQUFBLFNBUWYsQ0FBQTs0QkFFRixzQkFBTyxNQUFNLEVBQUM7Ozs7U0FFZjtLQUVGO0NBRUYsQ0FBQztBQUVGLFlBQVk7QUFFWixrQkFBZSxLQUFLLENBQUMifQ==