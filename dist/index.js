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
require("./temp");
/* CLIFIX */
var CLIFlix = {
    wizard: function (webtorrentOptions) {
        if (webtorrentOptions === void 0) { webtorrentOptions = []; }
        return __awaiter(this, void 0, void 0, function () {
            var query, titles, magnet, subbed, languageName, languageCode, subtitlesAll, okay, subtitles, stream, app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_helpers_1.default.input('What do you want to watch?')];
                    case 1:
                        query = _a.sent();
                        return [4 /*yield*/, CLIFlix.getTorrents(query)];
                    case 2:
                        titles = _a.sent();
                        if (!titles.length)
                            return [2 /*return*/, console.error("No titles found for \"" + query + "\"")];
                        return [4 /*yield*/, utils_1.default.prompt.title('Which title?', titles)];
                    case 3:
                        magnet = (_a.sent()).magnet;
                        if (!((config_1.default.subtitles.languages.available.length || config_1.default.subtitles.languages.favorites.length) && !utils_1.default.webtorrent.options.isSubtitlesSet(webtorrentOptions))) return [3 /*break*/, 11];
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes('Do you want subtitles?')];
                    case 4:
                        subbed = _a.sent();
                        if (!subbed) return [3 /*break*/, 11];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which language?', utils_1.default.prompt.parseList(config_1.default.subtitles.languages.available, config_1.default.subtitles.languages.favorites))];
                    case 5:
                        languageName = _a.sent(), languageCode = utils_1.default.language.getCode(languageName);
                        return [4 /*yield*/, CLIFlix.getSubtitles(query, languageCode)];
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
                        if (!((config_1.default.outputs.available.length || config_1.default.outputs.favorites.length) && !utils_1.default.webtorrent.options.isAppSet(webtorrentOptions))) return [3 /*break*/, 13];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which app?', utils_1.default.prompt.parseList(config_1.default.outputs.available, config_1.default.outputs.favorites))];
                    case 12:
                        app = _a.sent();
                        webtorrentOptions = utils_1.default.webtorrent.options.setApp(webtorrentOptions, app);
                        _a.label = 13;
                    case 13:
                        CLIFlix.stream(magnet, webtorrentOptions);
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
                        return [4 /*yield*/, CLIFlix.getTorrents(queryOrTorrent, 1)];
                    case 2:
                        torrents = _a.sent();
                        if (!torrents.length)
                            return [2 /*return*/, console.error("No titles found for \"" + queryOrTorrent + "\"")];
                        torrent = torrents[0].magnet;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, CLIFlix.stream(torrent, webtorrentOptions)];
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
                webtorrentOptions = utils_1.default.webtorrent.options.parse(webtorrentOptions, config_1.default.webtorrent.options);
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
exports.default = CLIFlix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw2QkFBK0I7QUFDL0IsaURBQW1EO0FBQ25ELDRDQUE4QztBQUM5QywyQkFBNkI7QUFDN0IscURBQXNDO0FBQ3RDLGtEQUFvRDtBQUNwRCxtQ0FBOEI7QUFDOUIsaUNBQTRCO0FBQzVCLGtCQUFnQjtBQUVoQixZQUFZO0FBRVosSUFBTSxPQUFPLEdBQUc7SUFFUixNQUFNLFlBQUcsaUJBQWdDO1FBQWhDLGtDQUFBLEVBQUEsc0JBQWdDOzs7Ozs0QkFFL0IscUJBQU0sMEJBQU0sQ0FBQyxLQUFLLENBQUcsNEJBQTRCLENBQUUsRUFBQTs7d0JBQTNELEtBQUssR0FBRyxTQUFtRDt3QkFDbEQscUJBQU0sT0FBTyxDQUFDLFdBQVcsQ0FBRyxLQUFLLENBQUUsRUFBQTs7d0JBQTVDLE1BQU0sR0FBRyxTQUFtQzt3QkFFbEQsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTyxDQUFDOzRCQUFDLE1BQU0sZ0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRywyQkFBd0IsS0FBSyxPQUFHLENBQUUsRUFBQzt3QkFFL0QscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsY0FBYyxFQUFFLE1BQU0sQ0FBRSxFQUFBOzt3QkFBN0QsTUFBTSxHQUFJLENBQUEsU0FBbUQsQ0FBQSxPQUF2RDs2QkFFUixDQUFBLENBQUUsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksZ0JBQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLGVBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBRyxpQkFBaUIsQ0FBRSxDQUFBLEVBQWhL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