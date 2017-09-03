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
var config_1 = require("./config");
var utils_1 = require("./utils");
/* WATCH */
var Watch = {
    wizard: function (webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var query, titles, title, index, magnet, output;
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
                        if (!!webtorrentOptions.length) return [3 /*break*/, 6];
                        return [4 /*yield*/, utils_1.default.prompt.list('Which app?', config_1.default.outputs)];
                    case 5:
                        output = _a.sent();
                        webtorrentOptions = ["--" + output.toLowerCase()];
                        _a.label = 6;
                    case 6:
                        Watch.stream(magnet, webtorrentOptions);
                        return [2 /*return*/];
                }
            });
        });
    },
    getTitles: function (query, rows) {
        if (rows === void 0) { rows = config_1.default.rows; }
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
        if (rows === void 0) { rows = config_1.default.rows; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.default.exec("./node_modules/.bin/magnet --rows " + rows + " \"" + query + "\" " + index)];
            });
        });
    },
    stream: function (magnet, webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!webtorrentOptions.length) {
                    webtorrentOptions = ["--" + config_1.default.output.toLowerCase()];
                }
                return [2 /*return*/, utils_1.default.spawn('./node_modules/.bin/webtorrent', ['download', magnet].concat(webtorrentOptions), { stdio: 'inherit' })];
            });
        });
    },
    lucky: function (query, webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var magnet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Watch.getMagnet(query)];
                    case 1:
                        magnet = _a.sent();
                        if (!magnet)
                            return [2 /*return*/, console.error("No magnet found for \"" + query + "\"")];
                        return [2 /*return*/, Watch.stream(magnet, webtorrentOptions)];
                }
            });
        });
    }
};
/* EXPORT */
exports.default = Watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsbUNBQThCO0FBQzlCLGlDQUE0QjtBQUU1QixXQUFXO0FBRVgsSUFBTSxLQUFLLEdBQUc7SUFFTixNQUFNLFlBQUcsaUJBQWdDO1FBQWhDLGtDQUFBLEVBQUEsc0JBQWdDOzs7Ozs0QkFFL0IscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsNEJBQTRCLENBQUUsRUFBQTs7Z0NBQXpELFNBQXlEO3dCQUN4RCxxQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFHLEtBQUssQ0FBRSxFQUFBOztpQ0FBL0IsU0FBK0I7d0JBRTlDLEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTSxDQUFDLE1BQU8sQ0FBQzs0QkFBQyxNQUFNLGdCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsMkJBQXdCLEtBQUssT0FBRyxDQUFFLEVBQUM7d0JBRWxFLHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFHLGNBQWMsRUFBRSxNQUFNLENBQUUsRUFBQTs7Z0NBQWxELFNBQWtELFVBQ2xELE1BQU0sQ0FBQyxTQUFTLENBQUcsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsQ0FBRTt3QkFDcEMscUJBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFFLEVBQUE7O2lDQUF0QyxTQUFzQzt3QkFFckQsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFHLDJCQUF3QixLQUFLLE9BQUcsQ0FBRSxFQUFDOzZCQUVwRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBekIsd0JBQXlCO3dCQUViLHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFHLFlBQVksRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBRSxFQUFBOztpQ0FBeEQsU0FBd0Q7d0JBRXZFLGlCQUFpQixHQUFHLENBQUMsT0FBSyxNQUFNLENBQUMsV0FBVyxFQUFLLENBQUMsQ0FBQzs7O3dCQUlyRCxLQUFLLENBQUMsTUFBTSxDQUFHLE1BQU0sRUFBRSxpQkFBaUIsQ0FBRSxDQUFDOzs7OztLQUU1QztJQUVLLFNBQVMsWUFBRyxLQUFLLEVBQUUsSUFBa0I7UUFBbEIscUJBQUEsRUFBQSxPQUFPLGdCQUFNLENBQUMsSUFBSTs7Ozs7NEJBRTFCLHFCQUFNLGVBQUssQ0FBQyxJQUFJLENBQUcsdUNBQXFDLElBQUksV0FBSyxLQUFLLE9BQUcsQ0FBRSxFQUFBOztpQ0FBM0UsU0FBMkU7d0JBRTFGLHNCQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUcsSUFBSSxDQUFFO2lDQUNkLE1BQU0sQ0FBRyxDQUFDLENBQUMsUUFBUSxDQUFFO2lDQUNyQixHQUFHLENBQUcsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFHLFNBQVMsRUFBRSxFQUFFLENBQUUsRUFBL0IsQ0FBK0IsQ0FBRSxFQUFDOzs7O0tBRWhFO0lBRUssU0FBUyxZQUFHLEtBQUssRUFBRSxLQUFTLEVBQUUsSUFBa0I7UUFBN0Isc0JBQUEsRUFBQSxTQUFTO1FBQUUscUJBQUEsRUFBQSxPQUFPLGdCQUFNLENBQUMsSUFBSTs7O2dCQUVwRCxzQkFBTyxlQUFLLENBQUMsSUFBSSxDQUFHLHVDQUFxQyxJQUFJLFdBQUssS0FBSyxXQUFLLEtBQU8sQ0FBRSxFQUFDOzs7S0FFdkY7SUFFSyxNQUFNLFlBQUcsTUFBTSxFQUFFLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7O2dCQUVyRCxFQUFFLENBQUMsQ0FBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7b0JBRWhDLGlCQUFpQixHQUFHLENBQUMsT0FBSyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUssQ0FBQyxDQUFDO2dCQUU1RCxDQUFDO2dCQUVELHNCQUFPLGVBQUssQ0FBQyxLQUFLLENBQUcsZ0NBQWdDLEdBQUcsVUFBVSxFQUFFLE1BQU0sU0FBSyxpQkFBaUIsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBRSxFQUFDOzs7S0FFM0g7SUFFSyxLQUFLLFlBQUcsS0FBSyxFQUFFLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7Ozs7NEJBRXBDLHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQUcsS0FBSyxDQUFFLEVBQUE7O2lDQUEvQixTQUErQjt3QkFFOUMsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFHLDJCQUF3QixLQUFLLE9BQUcsQ0FBRSxFQUFDO3dCQUV6RSxzQkFBTyxLQUFLLENBQUMsTUFBTSxDQUFHLE1BQU0sRUFBRSxpQkFBaUIsQ0FBRSxFQUFDOzs7O0tBRW5EO0NBRUYsQ0FBQztBQUVGLFlBQVk7QUFFWixrQkFBZSxLQUFLLENBQUMifQ==