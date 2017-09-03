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
var utils_1 = require("./utils");
/* WATCH */
var Watch = {
    rows: 10,
    wizard: function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, titles, title, index, magnet, outputs, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.default.prompt.input('What do you want to watch?')];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, Watch.getTitles(query)];
                    case 2:
                        titles = _a.sent();
                        if (!titles.length)
                            return [2 /*return*/, console.error("No titles found for \"" + query + "\"")];
                        return [4 /*yield*/, utils_1.default.prompt.list('Which title?', titles)];
                    case 3:
                        title = _a.sent(), index = titles.findIndex(function (t) { return t === title; });
                        return [4 /*yield*/, Watch.getMagnet(query, index)];
                    case 4:
                        magnet = _a.sent();
                        if (!magnet)
                            return [2 /*return*/, console.error("No magnet found for \"" + title + "\"")];
                        outputs = ['IINA', 'VLC', 'XBMC'];
                        return [4 /*yield*/, utils_1.default.prompt.list('Which app?', outputs)];
                    case 5:
                        output = _a.sent();
                        Watch.stream(magnet, output);
                        return [2 /*return*/];
                }
            });
        });
    },
    getTitles: function (query, rows) {
        if (rows === void 0) { rows = Watch.rows; }
        return __awaiter(this, void 0, void 0, function () {
            var titles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.default.exec("./node_modules/.bin/magnet --rows " + rows + " \"" + query + "\"")];
                    case 1:
                        titles = _a.sent();
                        return [2 /*return*/, titles.split('\n')
                                .filter(_.identity)
                                .map(function (title) { return title.replace(/\d+:\s+/, ''); })];
                }
            });
        });
    },
    getMagnet: function (query, index, rows) {
        if (index === void 0) { index = 1; }
        if (rows === void 0) { rows = Watch.rows; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.default.exec("./node_modules/.bin/magnet --rows " + rows + " \"" + query + "\" " + index)];
            });
        });
    },
    stream: function (magnet, output) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.default.exec("./node_modules/.bin/webtorrent download \"" + magnet + "\" --" + output.toLowerCase())];
            });
        });
    },
    lucky: function (query, output) {
        if (output === void 0) { output = 'IINA'; }
        return __awaiter(this, void 0, void 0, function () {
            var magnet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Watch.getMagnet(query)];
                    case 1:
                        magnet = _a.sent();
                        if (!magnet)
                            return [2 /*return*/, console.error("No magnet found for \"" + query + "\"")];
                        return [2 /*return*/, Watch.stream(magnet, output)];
                }
            });
        });
    }
};
/* EXPORT */
exports.default = Watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsaUNBQTRCO0FBRTVCLFdBQVc7QUFFWCxJQUFNLEtBQUssR0FBRztJQUVaLElBQUksRUFBRSxFQUFFO0lBRUYsTUFBTTs7Ozs7NEJBRUkscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsNEJBQTRCLENBQUUsRUFBQTs7Z0NBQXpELFNBQXlEO3dCQUN4RCxxQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFHLEtBQUssQ0FBRSxFQUFBOztpQ0FBL0IsU0FBK0I7d0JBRTlDLEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTSxDQUFDLE1BQU8sQ0FBQzs0QkFBQyxNQUFNLGdCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsMkJBQXdCLEtBQUssT0FBRyxDQUFFLEVBQUM7d0JBRWxFLHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFHLGNBQWMsRUFBRSxNQUFNLENBQUUsRUFBQTs7Z0NBQWxELFNBQWtELFVBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsQ0FBRTt3QkFDcEMscUJBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFFLEVBQUE7O2lDQUF0QyxTQUFzQzt3QkFFckQsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFHLDJCQUF3QixLQUFLLE9BQUcsQ0FBRSxFQUFDO2tDQUd6RCxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO3dCQUN4QixxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRyxZQUFZLEVBQUUsT0FBTyxDQUFFLEVBQUE7O2lDQUFqRCxTQUFpRDt3QkFFaEUsS0FBSyxDQUFDLE1BQU0sQ0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Ozs7O0tBRWpDO0lBRUssU0FBUyxZQUFHLEtBQUssRUFBRSxJQUFpQjtRQUFqQixxQkFBQSxFQUFBLE9BQU8sS0FBSyxDQUFDLElBQUk7Ozs7OzRCQUV6QixxQkFBTSxlQUFLLENBQUMsSUFBSSxDQUFHLHVDQUFxQyxJQUFJLFdBQUssS0FBSyxPQUFHLENBQUUsRUFBQTs7aUNBQTNFLFNBQTJFO3dCQUUxRixzQkFBTyxNQUFNLENBQUMsS0FBSyxDQUFHLElBQUksQ0FBRTtpQ0FDZCxNQUFNLENBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBRTtpQ0FDckIsR0FBRyxDQUFHLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBRyxTQUFTLEVBQUUsRUFBRSxDQUFFLEVBQS9CLENBQStCLENBQUUsRUFBQzs7OztLQUVoRTtJQUVLLFNBQVMsWUFBRyxLQUFLLEVBQUUsS0FBUyxFQUFFLElBQWlCO1FBQTVCLHNCQUFBLEVBQUEsU0FBUztRQUFFLHFCQUFBLEVBQUEsT0FBTyxLQUFLLENBQUMsSUFBSTs7O2dCQUVuRCxzQkFBTyxlQUFLLENBQUMsSUFBSSxDQUFHLHVDQUFxQyxJQUFJLFdBQUssS0FBSyxXQUFLLEtBQU8sQ0FBRSxFQUFDOzs7S0FFdkY7SUFFSyxNQUFNLFlBQUcsTUFBTSxFQUFFLE1BQU07OztnQkFFM0Isc0JBQU8sZUFBSyxDQUFDLElBQUksQ0FBRywrQ0FBNEMsTUFBTSxhQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUssQ0FBRSxFQUFDOzs7S0FFeEc7SUFFSyxLQUFLLFlBQUcsS0FBSyxFQUFFLE1BQWU7UUFBZix1QkFBQSxFQUFBLGVBQWU7Ozs7OzRCQUVuQixxQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFHLEtBQUssQ0FBRSxFQUFBOztpQ0FBL0IsU0FBK0I7d0JBRTlDLEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTyxDQUFDOzRCQUFDLE1BQU0sZ0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRywyQkFBd0IsS0FBSyxPQUFHLENBQUUsRUFBQzt3QkFFekUsc0JBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFFLEVBQUM7Ozs7S0FFeEM7Q0FFRixDQUFDO0FBRUYsWUFBWTtBQUVaLGtCQUFlLEtBQUssQ0FBQyJ9