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
var execa = require("execa");
var OpenSubtitles = require("opensubtitles-api");
var parseTorrent = require("parse-torrent");
var path = require("path");
var inquirer_helpers_1 = require("inquirer-helpers");
var TorrentSearch = require("torrent-search-api");
var config_1 = require("./config");
var utils_1 = require("./utils");
/* WATCH */
var Watch = {
    wizard: function (webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var query, titles, magnet, subbed, languageName, languageCode, subtitlesAll, okay, subtitles, stream, app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_helpers_1.default.input('What do you want to watch?')];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, Watch.getTorrents(query)];
                    case 2:
                        titles = _a.sent();
                        if (!titles.length)
                            return [2 /*return*/, console.error("No titles found for \"" + query + "\"")];
                        return [4 /*yield*/, utils_1.default.prompt.title('Which title?', titles)];
                    case 3:
                        magnet = (_a.sent()).magnet;
                        if (!(config_1.default.subtitles.enabled && !utils_1.default.webtorrent.options.isSubtitlesSet(webtorrentOptions))) return [3 /*break*/, 11];
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes('Do you want subtitles?')];
                    case 4:
                        subbed = _a.sent();
                        if (!subbed) return [3 /*break*/, 11];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which language?', utils_1.default.prompt.parseList(config_1.default.subtitles.languages.available, config_1.default.subtitles.languages.favorites))];
                    case 5:
                        languageName = _a.sent(), languageCode = utils_1.default.language.getCode(languageName);
                        return [4 /*yield*/, Watch.getSubtitles(query, languageCode)];
                    case 6:
                        subtitlesAll = _a.sent();
                        if (!!subtitlesAll.length) return [3 /*break*/, 8];
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes("No subtitles found for \"" + languageName + "\", play it anyway?")];
                    case 7:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, utils_1.default.prompt.subtitles('Which subtitles?', subtitlesAll)];
                    case 9:
                        subtitles = _a.sent();
                        return [4 /*yield*/, utils_1.default.subtitles.download(subtitles.url)];
                    case 10:
                        stream = _a.sent();
                        utils_1.default.webtorrent.options.setSubtitles(webtorrentOptions, stream.path);
                        _a.label = 11;
                    case 11:
                        if (!!utils_1.default.webtorrent.options.isAppSet(webtorrentOptions)) return [3 /*break*/, 13];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which app?', utils_1.default.prompt.parseList(config_1.default.outputs.available, config_1.default.outputs.favorites))];
                    case 12:
                        app = _a.sent();
                        webtorrentOptions = utils_1.default.webtorrent.options.setApp(webtorrentOptions, app);
                        _a.label = 13;
                    case 13:
                        Watch.stream(magnet, webtorrentOptions);
                        return [2 /*return*/];
                }
            });
        });
    },
    lucky: function (queryOrTorrent, webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var torrent, e_1, torrents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 3]);
                        parseTorrent(queryOrTorrent);
                        torrent = queryOrTorrent;
                        return [3 /*break*/, 3];
                    case 1:
                        e_1 = _a.sent();
                        return [4 /*yield*/, Watch.getTorrents(queryOrTorrent, 1)];
                    case 2:
                        torrents = _a.sent();
                        if (!torrents.length)
                            return [2 /*return*/, console.error("No titles found for \"" + queryOrTorrent + "\"")];
                        torrent = torrents[0].magnet;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, Watch.stream(torrent, webtorrentOptions)];
                }
            });
        });
    },
    getTorrents: function (query, rows) {
        if (rows === void 0) { rows = config_1.default.torrents.limit; }
        return __awaiter(this, void 0, void 0, function () {
            var TS, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        TS = new TorrentSearch();
                        TS.enableProvider('ThePirateBay');
                        return [4 /*yield*/, TS.search(query, 'Video', rows)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getSubtitles: function (query, language) {
        return __awaiter(this, void 0, void 0, function () {
            var OS, results, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        OS = new OpenSubtitles(config_1.default.subtitles.opensubtitles);
                        return [4 /*yield*/, OS.search({
                                sublanguageid: language,
                                limit: config_1.default.subtitles.limit,
                                query: query
                            })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results[Object.keys(results)[0]] || []];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    stream: function (torrent, webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var execArgs, execOpts;
            return __generator(this, function (_a) {
                webtorrentOptions = utils_1.default.webtorrent.options.parse(webtorrentOptions);
                execArgs = ['download', torrent].concat(webtorrentOptions), execOpts = {
                    cwd: path.resolve(__dirname, '..'),
                    stdio: 'inherit'
                };
                execa.sync('webtorrent', execArgs, execOpts);
                return [2 /*return*/];
            });
        });
    }
};
/* EXPORT */
exports.default = Watch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw2QkFBK0I7QUFDL0IsaURBQW1EO0FBQ25ELDRDQUE4QztBQUM5QywyQkFBNkI7QUFDN0IscURBQXNDO0FBQ3RDLGtEQUFvRDtBQUNwRCxtQ0FBOEI7QUFDOUIsaUNBQTRCO0FBRTVCLFdBQVc7QUFFWCxJQUFNLEtBQUssR0FBRztJQUVOLE1BQU0sWUFBRyxpQkFBZ0M7UUFBaEMsa0NBQUEsRUFBQSxzQkFBZ0M7Ozs7OzRCQUUvQixxQkFBTSwwQkFBTSxDQUFDLEtBQUssQ0FBRyw0QkFBNEIsQ0FBRSxFQUFBOzt3QkFBM0QsS0FBSyxHQUFHLFNBQW1EO3dCQUNsRCxxQkFBTSxLQUFLLENBQUMsV0FBVyxDQUFHLEtBQUssQ0FBRSxFQUFBOzt3QkFBMUMsTUFBTSxHQUFHLFNBQWlDO3dCQUVoRCxFQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFHLDJCQUF3QixLQUFLLE9BQUcsQ0FBRSxFQUFDO3dCQUUvRCxxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxjQUFjLEVBQUUsTUFBTSxDQUFFLEVBQUE7O3dCQUE3RCxNQUFNLEdBQUksQ0FBQSxTQUFtRCxDQUFBLE9BQXZEOzZCQUVSLENBQUEsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsZUFBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFHLGlCQUFpQixDQUFFLENBQUEsRUFBMUYseUJBQTBGO3dCQUU5RSxxQkFBTSwwQkFBTSxDQUFDLEtBQUssQ0FBRyx3QkFBd0IsQ0FBRSxFQUFBOzt3QkFBeEQsTUFBTSxHQUFHLFNBQStDOzZCQUV6RCxNQUFN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