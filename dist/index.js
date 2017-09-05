"use strict";
/* IMPORT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var parseTorrent = require("parse-torrent");
var path = require("path");
var TorrentSearch = require("torrent-search-api");
var opensubtitles = require("subtitler");
var config_1 = require("./config");
var utils_1 = require("./utils");
var child_process = require("child_process");
/* WATCH */
var Watch = {
    wizard: function (webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var query, titles, _a, magnet, title, useSubtitles, subtitleFile, subtitleLang, app;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, utils_1.default.prompt.input('What do you want to watch?')];
                    case 1:
                        query = _b.sent();
                        return [4 /*yield*/, Watch.getTitles(query)];
                    case 2:
                        titles = _b.sent();
                        if (!titles.length)
                            return [2 /*return*/, console.error("No titles found for \"" + query + "\"")];
                        return [4 /*yield*/, utils_1.default.prompt.title('Which title?', titles)];
                    case 3:
                        _a = _b.sent(), magnet = _a.magnet, title = _a.title;
                        return [4 /*yield*/, utils_1.default.prompt.yesOrNo('Do you want to watch with subtitles?')];
                    case 4:
                        useSubtitles = _b.sent();
                        subtitleFile = '';
                        if (!useSubtitles) return [3 /*break*/, 7];
                        return [4 /*yield*/, utils_1.default.prompt.input('What language do you want your subtitles to be in?')];
                    case 5:
                        subtitleLang = _b.sent();
                        return [4 /*yield*/, Watch.getSubtitles(title, subtitleLang)];
                    case 6:
                        // check if lang is correct
                        subtitleFile = _b.sent();
                        if (!subtitleFile)
                            return [2 /*return*/, console.error("No subtitles found for \"" + title + "\"")];
                        webtorrentOptions.push("--subtitles " + subtitleFile);
                        _b.label = 7;
                    case 7:
                        if (!!utils_1.default.webtorrent.options.isAppSet(webtorrentOptions)) return [3 /*break*/, 9];
                        return [4 /*yield*/, utils_1.default.prompt.list('Which app?', config_1.default.outputs)];
                    case 8:
                        app = _b.sent();
                        webtorrentOptions = utils_1.default.webtorrent.options.setApp(webtorrentOptions, app);
                        _b.label = 9;
                    case 9:
                        Watch.stream(magnet, webtorrentOptions);
                        return [2 /*return*/];
                }
            });
        });
    },
    lucky: function (queryOrTorrent, webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var torrent, e_1, titles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        parseTorrent(queryOrTorrent);
                        torrent = queryOrTorrent;
                        return [3 /*break*/, 3];
                    case 1:
                        e_1 = _a.sent();
                        return [4 /*yield*/, Watch.getTitles(queryOrTorrent, 1)];
                    case 2:
                        titles = _a.sent();
                        if (!titles.length)
                            return [2 /*return*/, console.error("No titles found for \"" + queryOrTorrent + "\"")];
                        torrent = titles[0].magnet;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, Watch.stream(torrent, webtorrentOptions)];
                }
            });
        });
    },
    getTitles: function (query, rows) {
        if (rows === void 0) { rows = config_1.default.searchNr; }
        return __awaiter(this, void 0, void 0, function () {
            var ts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ts = new TorrentSearch();
                        ts.enableProvider('ThePirateBay');
                        return [4 /*yield*/, ts.search(query, 'Video', rows)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
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
    stream: function (torrent, webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                webtorrentOptions = utils_1.default.webtorrent.options.parse(webtorrentOptions);
                return [2 /*return*/, child_process.spawn("./node_modules/.bin/webtorrent \"" + torrent.replace('\n', '') + "\" " + webtorrentOptions.join(' '), [], {
                        cwd: path.resolve(__dirname, '..'),
                        shell: true,
                        stdio: 'inherit'
                    })];
            });
        });
    }
};
/* EXPORT */
exports.default = Watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw0Q0FBOEM7QUFDOUMsMkJBQTZCO0FBQzdCLGtEQUFvRDtBQUNwRCx5Q0FBMkM7QUFDM0MsbUNBQThCO0FBQzlCLGlDQUE0QjtBQUM1Qiw2Q0FBK0M7QUFFL0MsV0FBVztBQUVYLElBQU0sS0FBSyxHQUFHO0lBRU4sTUFBTSxZQUFHLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7Ozs7NEJBRS9CLHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLDRCQUE0QixDQUFFLEVBQUE7O3dCQUFqRSxLQUFLLEdBQUcsU0FBeUQ7d0JBQ3hELHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQUcsS0FBSyxDQUFFLEVBQUE7O3dCQUF4QyxNQUFNLEdBQUcsU0FBK0I7d0JBRTlDLEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTSxDQUFDLE1BQU8sQ0FBQzs0QkFBQyxNQUFNLGdCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsMkJBQXdCLEtBQUssT0FBRyxDQUFFLEVBQUM7d0JBRXRELHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLGNBQWMsRUFBRSxNQUFNLENBQUUsRUFBQTs7d0JBQXZFLEtBQW9CLFNBQW1ELEVBQXJFLE1BQU0sWUFBQSxFQUFFLEtBQUssV0FBQTt3QkFFQSxxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFBOzt3QkFBakYsWUFBWSxHQUFHLFNBQWtFO3dCQUNuRixZQUFZLEdBQVcsRUFBRSxDQUFDOzZCQUMxQixZQUFZLEVBQVosd0JBQVk7d0JBQ08scUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsb0RBQW9ELENBQUUsRUFBQTs7d0JBQWhHLFlBQVksR0FBRyxTQUFpRjt3QkFFdkYscUJBQU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUE7O3dCQUQ1RCwyQkFBMkI7d0JBQzNCLFlBQVksR0FBRyxTQUE2QyxDQUFDO3dCQUM3RCxFQUFFLENBQUMsQ0FBRSxDQUFDLFlBQWEsQ0FBQzs0QkFBQyxNQUFNLGdCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsOEJBQTJCLEtBQUssT0FBRyxDQUFFLEVBQUM7d0JBRWxGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBZSxZQUFjLENBQUMsQ0FBQzs7OzZCQUduRCxDQUFDLGVBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBRyxpQkFBaUIsQ0FBRSxFQUF4RCx3QkFBd0Q7d0JBRS9DLHFCQUFNLGVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFHLFlBQVksRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBRSxFQUFBOzt3QkFBOUQsR0FBRyxHQUFHLFNBQXdEO3dCQUVwRSxpQkFBaUIsR0FBRyxlQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUcsaUJBQWlCLEVBQUUsR0FBRyxDQUFFLENBQUM7Ozt3QkFJakYsS0FBSyxDQUFDLE1BQU0sQ0FBRyxNQUFNLEVBQUUsaUJBQWlCLENBQUUsQ0FBQzs7Ozs7S0FFNUM7SUFFSyxLQUFLLFlBQUcsY0FBYyxFQUFFLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7Ozs7Ozt3QkFNMUQsWUFBWSxDQUFHLGNBQWMsQ0FBRSxDQUFDO3dCQUVoQyxPQUFPLEdBQUcsY0FBYyxDQUFDOzs7O3dCQUlWLHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQUcsY0FBYyxFQUFFLENBQUMsQ0FBRSxFQUFBOzt3QkFBcEQsTUFBTSxHQUFHLFNBQTJDO3dCQUUxRCxFQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFHLDJCQUF3QixjQUFjLE9BQUcsQ0FBRSxFQUFDO3dCQUV6RixPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7NEJBSTdCLHNCQUFPLEtBQUssQ0FBQyxNQUFNLENBQUcsT0FBTyxFQUFFLGlCQUFpQixDQUFFLEVBQUM7Ozs7S0FFcEQ7SUFFSyxTQUFTLFlBQUcsS0FBSyxFQUFFLElBQXNCO1FBQXRCLHFCQUFBLEVBQUEsT0FBTyxnQkFBTSxDQUFDLFFBQVE7Ozs7Ozt3QkFFdkMsRUFBRSxHQUFHLElBQUksYUFBYSxFQUFHLENBQUM7d0JBRWhDLEVBQUUsQ0FBQyxjQUFjLENBQUcsY0FBYyxDQUFFLENBQUM7d0JBRTlCLHFCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUUsRUFBQTs0QkFBL0Msc0JBQU8sU0FBd0MsRUFBQzs7OztLQUVqRDtJQUVLLFlBQVksWUFBRSxTQUFTLEVBQUUsSUFBSTs7Ozs7NEJBQ25CLHFCQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUF2QyxLQUFLLEdBQUcsU0FBK0I7d0JBQzdCLHFCQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUE7O3dCQUF4RSxPQUFPLEdBQUcsU0FBOEQ7d0JBRTlFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQzs0QkFBQyxNQUFNLGdCQUFDLEVBQUUsRUFBQzt3QkFFN0Qsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQzt3QkFFbEMscUJBQU0sZUFBSyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBaEUsYUFBYSxHQUFHLFNBQWdEO3dCQUN0RSxzQkFBTyxhQUFhLEVBQUM7Ozs7S0FDdEI7SUFFSyxNQUFNLFlBQUcsT0FBTyxFQUFFLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7O2dCQUV0RCxpQkFBaUIsR0FBRyxlQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsaUJBQWlCLENBQUUsQ0FBQztnQkFFekUsc0JBQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxzQ0FBbUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQUssaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxFQUFFLEVBQUUsRUFBRTt3QkFDN0gsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUcsU0FBUyxFQUFFLElBQUksQ0FBRTt3QkFDckMsS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLFNBQVM7cUJBQ2pCLENBQUMsRUFBQzs7O0tBRUo7Q0FFRixDQUFDO0FBRUYsWUFBWTtBQUVaLGtCQUFlLEtBQUssQ0FBQyJ9