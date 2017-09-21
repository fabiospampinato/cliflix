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
            var query, titles, _a, title, magnet, subbed, languageName, languageCode, subtitlesAll, okay, subtitles, stream, app;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!titles || !titles.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, inquirer_helpers_1.default.input('What do you want to watch?')];
                    case 1:
                        query = _b.sent();
                        return [4 /*yield*/, CLIFlix.getTorrents(query)];
                    case 2:
                        titles = _b.sent();
                        if (!titles.length)
                            console.error("No titles found for \"" + query + "\", try again.");
                        return [3 /*break*/, 0];
                    case 3: return [4 /*yield*/, utils_1.default.prompt.title('Which title?', titles)];
                    case 4:
                        _a = _b.sent(), title = _a.title, magnet = _a.magnet;
                        if (!((config_1.default.subtitles.languages.available.length || config_1.default.subtitles.languages.favorites.length) && !utils_1.default.webtorrent.options.isSubtitlesSet(webtorrentOptions))) return [3 /*break*/, 12];
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes('Do you want subtitles?')];
                    case 5:
                        subbed = _b.sent();
                        if (!subbed) return [3 /*break*/, 12];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which language?', utils_1.default.prompt.parseList(config_1.default.subtitles.languages.available, config_1.default.subtitles.languages.favorites))];
                    case 6:
                        languageName = _b.sent(), languageCode = utils_1.default.language.getCode(languageName);
                        return [4 /*yield*/, CLIFlix.getSubtitles(title, languageCode)];
                    case 7:
                        subtitlesAll = _b.sent();
                        if (!!subtitlesAll.length) return [3 /*break*/, 9];
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes("No subtitles found for \"" + languageName + "\", play it anyway?")];
                    case 8:
                        okay = _b.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, utils_1.default.prompt.subtitles('Which subtitles?', subtitlesAll)];
                    case 10:
                        subtitles = _b.sent();
                        return [4 /*yield*/, utils_1.default.subtitles.download(subtitles)];
                    case 11:
                        stream = _b.sent();
                        utils_1.default.webtorrent.options.setSubtitles(webtorrentOptions, stream.path);
                        _b.label = 12;
                    case 12:
                        if (!((config_1.default.outputs.available.length || config_1.default.outputs.favorites.length) && !utils_1.default.webtorrent.options.isAppSet(webtorrentOptions))) return [3 /*break*/, 14];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which app?', utils_1.default.prompt.parseList(config_1.default.outputs.available, config_1.default.outputs.favorites))];
                    case 13:
                        app = _b.sent();
                        webtorrentOptions = utils_1.default.webtorrent.options.setApp(webtorrentOptions, app);
                        _b.label = 14;
                    case 14:
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
    getTorrents: function (query, rows, provider) {
        if (rows === void 0) { rows = config_1.default.torrents.limit; }
        if (provider === void 0) { provider = config_1.default.torrents.providers.active; }
        return __awaiter(this, void 0, void 0, function () {
            var categories, category, TS, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!provider) return [3 /*break*/, 2];
                        return [4 /*yield*/, inquirer_helpers_1.default.list('Which torrents provider?', config_1.default.torrents.providers.available)];
                    case 1:
                        provider = _a.sent();
                        _a.label = 2;
                    case 2:
                        categories = {
                            ThePirateBay: 'Video',
                            TorrentProject: 'Video'
                        }, category = categories[provider] || 'All';
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        TS = new TorrentSearch();
                        TS.enableProvider(provider);
                        return [4 /*yield*/, TS.search(query, category, rows)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_2 = _a.sent();
                        return [2 /*return*/, []];
                    case 6: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw2QkFBK0I7QUFDL0IsaURBQW1EO0FBQ25ELDRDQUE4QztBQUM5QywyQkFBNkI7QUFDN0IscURBQXNDO0FBQ3RDLGtEQUFvRDtBQUNwRCxtQ0FBOEI7QUFDOUIsaUNBQTRCO0FBQzVCLGtCQUFnQjtBQUVoQixZQUFZO0FBRVosSUFBTSxPQUFPLEdBQUc7SUFFUixNQUFNLFlBQUcsaUJBQWdDO1FBQWhDLGtDQUFBLEVBQUEsc0JBQWdDOzs7Ozs7NkJBSXJDLENBQUEsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO3dCQUV2QixxQkFBTSwwQkFBTSxDQUFDLEtBQUssQ0FBRyw0QkFBNEIsQ0FBRSxFQUFBOzt3QkFBM0QsS0FBSyxHQUFHLFNBQW1ELENBQUM7d0JBQ25ELHFCQUFNLE9BQU8sQ0FBQyxXQUFXLENBQUcsS0FBSyxDQUFFLEVBQUE7O3dCQUE1QyxNQUFNLEdBQUcsU0FBbUMsQ0FBQzt3QkFFN0MsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUcsMkJBQXdCLEtBQUssbUJBQWUsQ0FBRSxDQUFDOzs0QkFJL0QscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsY0FBYyxFQUFFLE1BQU0sQ0FBRSxFQUFBOzt3QkFBckUsS0FBa0IsU0FBbUQsRUFBcEUsS0FBSyxXQUFBLEVBQUUsTUFBTSxZQUFBOzZCQUVmLENBQUEsQ0FBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsZUFBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFHLGlCQUFpQixDQUFFLENBQUEsRUFBaEsseUJBQWdLO3dCQUVwSixxQkFBTSwwQkFBTSxDQUFDLEtBQUssQ0FBRyx3QkFBd0IsQ0FBRSxFQUFBOzt3QkFBeEQsTUFBTSxHQUFHLFNBQStDOzZCQUV6RCxNQUFNLEVBQU4seUJBQU07d0JBRVkscUJBQU0sMEJBQU0sQ0FBQyxJQUFJLENBQUcsaUJBQWlCLEVBQUUsZUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUcsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFFLENBQUUsRUFBQTs7d0JBQTdKLFlBQVksR0FBRyxTQUE4SSxFQUM3SixZQUFZLEdBQUcsZUFBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUcsWUFBWSxDQUFFO3dCQUN2QyxxQkFBTSxPQUFPLENBQUMsWUFBWSxDQUFHLEtBQUssRUFBRSxZQUFZLENBQUUsRUFBQTs7d0JBQWpFLFlBQVksR0FBRyxTQUFrRDs2QkFFbEUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFwQix3QkFBb0I7d0JBRVYscUJBQU0sMEJBQU0sQ0FBQyxLQUFLLENBQUcsOEJBQTJCLFlBQVksd0JBQW9CLENBQUUsRUFBQTs7d0JBQXpGLElBQUksR0FBRyxTQUFrRjt3QkFFL0YsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFLLENBQUM7NEJBQUMsTUFBTSxnQkFBQzs7NEJBSUYscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUcsa0JBQWtCLEVBQUUsWUFBWSxDQUFFLEVBQUE7O3dCQUE3RSxTQUFTLEdBQUcsU0FBaUU7d0JBQ3BFLHFCQUFNLGVBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFHLFNBQVMsQ0FBRSxFQUFBOzt3QkFBckQsTUFBTSxHQUFHLFNBQTRDO3dCQUUzRCxlQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUcsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFDOzs7NkJBUTFFLENBQUEsQ0FBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLGdCQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLGVBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBRyxpQkFBaUIsQ0FBRSxDQUFBLEVBQWxJLHlCQUFrSTt3QkFFekgscUJBQU0sMEJBQU0sQ0FBQyxJQUFJLENBQUcsWUFBWSxFQUFFLGVBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUUsQ0FBRSxFQUFBOzt3QkFBdkgsR0FBRyxHQUFHLFNBQWlIO3dCQUU3SCxpQkFBaUIsR0FBRyxlQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUcsaUJBQWlCLEVBQUUsR0FBRyxDQUFFLENBQUM7Ozt3QkFJakYsT0FBTyxDQUFDLE1BQU0sQ0FBRyxNQUFNLEVBQUUsaUJBQWlCLENBQUUsQ0FBQzs7Ozs7S0FFOUM7SUFFSyxLQUFLLFlBQUcsY0FBYyxFQUFFLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7Ozs7Ozt3QkFNMUQsWUFBWSxDQUFHLGNBQWMsQ0FBRSxDQUFDO3dCQUVoQyxPQUFPLEdBQUcsY0FBYyxDQUFDOzs7O3dCQUlSLHFCQUFNLE9BQU8sQ0FBQyxXQUFXLENBQUcsY0FBYyxFQUFFLENBQUMsQ0FBRSxFQUFBOzt3QkFBMUQsUUFBUSxHQUFHLFNBQStDO3dCQUVoRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFFBQVEsQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxnQkFBQyxPQUFPLENBQUMsS0FBSyxDQUFHLDJCQUF3QixjQUFjLE9BQUcsQ0FBRSxFQUFDO3dCQUUzRixPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7NEJBSS9CLHNCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUcsT0FBTyxFQUFFLGlCQUFpQixDQUFFLEVBQUM7Ozs7S0FFdEQ7SUFFSyxXQUFXLFlBQUcsS0FBSyxFQUFFLElBQTRCLEVBQUUsUUFBMkM7UUFBekUscUJBQUEsRUFBQSxPQUFPLGdCQUFNLENBQUMsUUFBUSxDQUFDLEtBQUs7UUFBRSx5QkFBQSxFQUFBLFdBQVcsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU07Ozs7Ozs2QkFFN0YsQ0FBQyxRQUFRLEVBQVQsd0JBQVM7d0JBRUQscUJBQU0sMEJBQU0sQ0FBQyxJQUFJLENBQUcsMEJBQTBCLEVBQUUsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBRSxFQUFBOzt3QkFBaEcsUUFBUSxHQUFHLFNBQXFGLENBQUM7Ozt3QkFJN0YsVUFBVSxHQUFHOzRCQUNYLFlBQVksRUFBRSxPQUFPOzRCQUNyQixjQUFjLEVBQUUsT0FBTzt5QkFDeEIsRUFDRCxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQzs7Ozt3QkFJdkMsRUFBRSxHQUFHLElBQUksYUFBYSxFQUFHLENBQUM7d0JBRWhDLEVBQUUsQ0FBQyxjQUFjLENBQUcsUUFBUSxDQUFFLENBQUM7d0JBRXhCLHFCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUUsRUFBQTs0QkFBaEQsc0JBQU8sU0FBeUMsRUFBQzs7O3dCQUlqRCxzQkFBTyxFQUFFLEVBQUM7Ozs7O0tBSWI7SUFFSyxZQUFZLFlBQUcsS0FBSyxFQUFFLFFBQVE7Ozs7Ozs7d0JBSTFCLEVBQUUsR0FBRyxJQUFJLGFBQWEsQ0FBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUUsQ0FBQzt3QkFDaEQscUJBQU0sRUFBRSxDQUFDLE1BQU0sQ0FBRTtnQ0FDL0IsYUFBYSxFQUFFLFFBQVE7Z0NBQ3ZCLEtBQUssRUFBRSxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLO2dDQUM3QixLQUFLLE9BQUE7NkJBQ04sQ0FBQyxFQUFBOzt3QkFKSSxPQUFPLEdBQUcsU0FJZDt3QkFFRixzQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQzs7O3dCQUlqRCxzQkFBTyxFQUFFLEVBQUM7Ozs7O0tBSWI7SUFFSyxNQUFNLFlBQUcsT0FBTyxFQUFFLGlCQUFnQztRQUFoQyxrQ0FBQSxFQUFBLHNCQUFnQzs7OztnQkFFdEQsaUJBQWlCLEdBQUcsZUFBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFHLGlCQUFpQixFQUFFLGdCQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBRSxDQUFDO2dCQUU5RixRQUFRLElBQUksVUFBVSxFQUFFLE9BQU8sU0FBSyxpQkFBaUIsQ0FBQyxFQUN0RCxRQUFRLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUcsU0FBUyxFQUFFLElBQUksQ0FBRTtvQkFDckMsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCLENBQUM7Z0JBRVIsS0FBSyxDQUFDLElBQUksQ0FBRyxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBRSxDQUFDOzs7O0tBRWpEO0NBRUYsQ0FBQztBQUVGLFlBQVk7QUFFWixrQkFBZSxPQUFPLENBQUMifQ==