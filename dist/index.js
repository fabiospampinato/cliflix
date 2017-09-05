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
var opensubtitles = require("subtitler");
/* WATCH */
var Watch = {
    wizard: function (webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var query, titles, title, index, magnet, useSubtitles, subtitleFile, subtitleLang, output;
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
                        return [4 /*yield*/, utils_1.default.prompt.yesOrNo('Do you want to watch with subtitles?')];
                    case 5:
                        useSubtitles = _a.sent();
                        subtitleFile = '';
                        if (!useSubtitles) return [3 /*break*/, 8];
                        return [4 /*yield*/, utils_1.default.prompt.input('What language do you want your subtitles to be in?')];
                    case 6:
                        subtitleLang = _a.sent();
                        return [4 /*yield*/, Watch.getSubtitles(title, subtitleLang)];
                    case 7:
                        // check if lang is correct
                        subtitleFile = _a.sent();
                        if (!subtitleFile)
                            return [2 /*return*/, console.error("No subtitles found for \"" + title + "\"")];
                        _a.label = 8;
                    case 8:
                        if (!!webtorrentOptions.length) return [3 /*break*/, 10];
                        return [4 /*yield*/, utils_1.default.prompt.list('Which app?', config_1.default.outputs)];
                    case 9:
                        output = _a.sent();
                        webtorrentOptions = ["--" + output.toLowerCase()];
                        _a.label = 10;
                    case 10:
                        Watch.stream(magnet, webtorrentOptions, subtitleFile);
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
    getSubtitles: function (movieName, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var token, results, subtitleDownloadLink, subtitlesFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, opensubtitles.api.login()];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, opensubtitles.api.searchForTitle(token, lang, movieName)];
                    case 2:
                        results = _a.sent();
                        if (results.length === 0 || !results[0].SubDownloadLink)
                            return [2 /*return*/, ''];
                        subtitleDownloadLink = results[0].SubDownloadLink;
                        return [4 /*yield*/, utils_1.default.downloadGunzip(subtitleDownloadLink)];
                    case 3:
                        subtitlesFile = _a.sent();
                        return [2 /*return*/, subtitlesFile];
                }
            });
        });
    },
    stream: function (magnet, webtorrentOptions, subtitleFile) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!webtorrentOptions.length) {
                    webtorrentOptions = ["--" + config_1.default.output.toLowerCase()];
                }
                if (subtitleFile)
                    webtorrentOptions.push("--subtitles \"" + subtitleFile + "\"");
                return [2 /*return*/, utils_1.default.spawn("./node_modules/.bin/webtorrent \"" + magnet.replace('\n', '') + "\" " + webtorrentOptions.join(' '), { stdio: 'inherit' })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsbUNBQThCO0FBQzlCLGlDQUE0QjtBQUM1Qix5Q0FBMkM7QUFFM0MsV0FBVztBQUVYLElBQU0sS0FBSyxHQUFHO0lBRU4sTUFBTSxZQUFHLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7bUVBY3pDLFlBQVk7Ozs0QkFaRixxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyw0QkFBNEIsQ0FBRSxFQUFBOztnQ0FBekQsU0FBeUQ7d0JBQ3hELHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQUcsS0FBSyxDQUFFLEVBQUE7O2lDQUEvQixTQUErQjt3QkFFOUMsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTyxDQUFDOzRCQUFDLE1BQU0sZ0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRywyQkFBd0IsS0FBSyxPQUFHLENBQUUsRUFBQzt3QkFFbEUscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUcsY0FBYyxFQUFFLE1BQU0sQ0FBRSxFQUFBOztnQ0FBbEQsU0FBa0QsVUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxLQUFLLEVBQVgsQ0FBVyxDQUFFO3dCQUNwQyxxQkFBTSxLQUFLLENBQUMsU0FBUyxDQUFHLEtBQUssRUFBRSxLQUFLLENBQUUsRUFBQTs7aUNBQXRDLFNBQXNDO3dCQUVyRCxFQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU8sQ0FBQzs0QkFBQyxNQUFNLGdCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsMkJBQXdCLEtBQUssT0FBRyxDQUFFLEVBQUM7d0JBRXBELHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMs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