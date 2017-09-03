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
var child_process_1 = require("child_process");
var inquirer = require("inquirer");
var path = require("path");
var pify = require("pify");
/* UTILS */
var Utils = {
    exec: function (command) {
        var cwd = path.resolve(__dirname, '..'); // In order to properly call programs under `/node_modules/.bin`
        return pify(child_process_1.exec)(command, { cwd: cwd });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsK0NBQW1DO0FBQ25DLG1DQUFxQztBQUNyQywyQkFBNkI7QUFDN0IsMkJBQTZCO0FBRTdCLFdBQVc7QUFFWCxJQUFNLEtBQUssR0FBRztJQUVaLElBQUksWUFBRyxPQUFPO1FBRVosSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQyxnRUFBZ0U7UUFFOUcsTUFBTSxDQUFDLElBQUksQ0FBRyxvQkFBSSxDQUFFLENBQUUsT0FBTyxFQUFFLEVBQUMsR0FBRyxLQUFBLEVBQUMsQ0FBRSxDQUFDO0lBRXpDLENBQUM7SUFFRCxNQUFNLEVBQUU7UUFFQSxPQUFPLFlBQUcsT0FBZSxFQUFFLFFBQWdCO1lBQWhCLHlCQUFBLEVBQUEsZ0JBQWdCOzs7OztnQ0FFOUIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTtnQ0FDdEMsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsT0FBTyxTQUFBO2dDQUNQLE9BQU8sRUFBRSxRQUFROzZCQUNsQixDQUFDLEVBQUE7O3FDQUxlLENBQUEsU0FLZixDQUFBOzRCQUVGLHNCQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUM7Ozs7U0FFakI7UUFFSyxLQUFLLFlBQUcsT0FBTyxFQUFFLFFBQVM7Ozs7O2dDQUViLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUU7Z0NBQ3RDLElBQUksRUFBRSxPQUFPO2dDQUNiLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sU0FBQTtnQ0FDUCxPQUFPLEVBQUUsUUFBUTtnQ0FDakIsUUFBUSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFHLFFBQVEsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRyxDQUFFLEVBQWxFLENBQWtFOzZCQUNsRixDQUFDLEVBQUE7O3FDQU5lLENBQUEsU0FNZixDQUFBOzRCQUVGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUVmO1FBRUssSUFBSSxZQUFHLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUzs7Ozs7Z0NBRWpCLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUU7Z0NBQ3RDLElBQUksRUFBRSxNQUFNO2dDQUNaLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sRUFBRSxHQUFHO2dDQUNaLE9BQU8sU0FBQTtnQ0FDUCxPQUFPLEVBQUUsUUFBUTtnQ0FDakIsUUFBUSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFHLFFBQVEsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFHLENBQUUsRUFBaEUsQ0FBZ0U7NkJBQ2hGLENBQUMsRUFBQTs7cUNBUGUsQ0FBQSxTQU9mLENBQUE7NEJBRUYsc0JBQU8sTUFBTSxFQUFDOzs7O1NBRWY7S0FFRjtDQUVGLENBQUM7QUFFRixZQUFZO0FBRVosa0JBQWUsS0FBSyxDQUFDIn0=