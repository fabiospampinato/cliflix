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
var _ = require("lodash");
var chalk = require("chalk");
var filesizeParser = require("filesize-parser");
var inquirer = require("inquirer");
var inquirer_helpers_1 = require("inquirer-helpers");
var isOnline = require("is-online");
var prettySize = require("prettysize");
var request = require("request-promise-native");
var temp = require("temp");
var config_1 = require("./config");
/* UTILS */
var Utils = {
    clear: function () {
        process.stdout.write('\x1bc\x1b[H\x1b[2J');
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
        parseList: function (list, favorites) {
            if (favorites === void 0) { favorites = []; }
            list = _.difference(list, favorites);
            if (!list.length)
                return favorites;
            if (!favorites.length)
                return list;
            return favorites.concat([new inquirer.Separator()], list); //FIXME: Proper separator width
        },
        title: function (message, titles) {
            return __awaiter(this, void 0, void 0, function () {
                var table, colors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            table = [];
                            titles.forEach(function (title) {
                                var row = [];
                                row.push(Utils.torrent.parseTitle(title.title));
                                if (config_1.default.torrents.details.seeders)
                                    row.push(title.seeds);
                                if (config_1.default.torrents.details.leechers)
                                    row.push(title.peers);
                                if (config_1.default.torrents.details.size)
                                    row.push(Utils.torrent.parseSize(title.size));
                                if (config_1.default.torrents.details.time)
                                    row.push(title.time);
                                table.push(row);
                            });
                            colors = [undefined, 'green', 'red', 'yellow', 'magenta'];
                            return [4 /*yield*/, inquirer_helpers_1.default.table(message, table, titles, colors)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        subtitles: function (message, subtitlesAll) {
            return __awaiter(this, void 0, void 0, function () {
                var table, colors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            table = [];
                            subtitlesAll.forEach(function (subtitles) {
                                var row = [];
                                row.push(Utils.subtitles.parseTitle(subtitles.filename));
                                if (config_1.default.subtitles.details.downloads)
                                    row.push(subtitles.downloads);
                                table.push(row);
                            });
                            colors = [undefined, 'green'];
                            return [4 /*yield*/, inquirer_helpers_1.default.table(message, table, subtitlesAll, colors)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
    },
    torrent: {
        parseTitle: function (title) {
            return title.replace(/\d+(\.\d+)? ?[k|m|g|t]b/gi, '') // Size info
                .replace(/\s\s+/g, ' ') // Multiple spaces
                .replace(/- -/g, '-') // Empty blocks between dashes
                .replace(/\s*-$/, ''); // Ending dash
        },
        parseSize: function (size) {
            try {
                var bytes = filesizeParser(size);
                return prettySize(bytes, true, true, 1);
            }
            catch (e) {
                return size;
            }
        }
    },
    subtitles: {
        parseTitle: function (title) {
            return title.replace(/\.srt$/i, ''); // Extension
        },
        download: function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var content, stream;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request(url)];
                        case 1:
                            content = _a.sent(), stream = temp.createWriteStream();
                            stream.write(content);
                            stream.end();
                            return [2 /*return*/, stream];
                    }
                });
            });
        }
    },
    webtorrent: {
        options: {
            appRe: new RegExp("^--(" + config_1.default.outputs.supported.join('|') + ")$", 'i'),
            outRe: /^--(o|out)$/i,
            subtitlesRe: /^--subtitles$/i,
            isOptionSet: function (options, regex) {
                return !!options.find(function (option) { return !!option.match(regex); });
            },
            isAppSet: function (options) {
                return Utils.webtorrent.options.isOptionSet(options, Utils.webtorrent.options.appRe);
            },
            isSubtitlesSet: function (options) {
                return Utils.webtorrent.options.isOptionSet(options, Utils.webtorrent.options.subtitlesRe);
            },
            isOutSet: function (options) {
                return Utils.webtorrent.options.isOptionSet(options, Utils.webtorrent.options.outRe);
            },
            setApp: function (options, app) {
                options.push("--" + app.toLowerCase());
                return options;
            },
            setSubtitles: function (options, subtitles) {
                options.push('--subtitles', subtitles);
                return options;
            },
            setOut: function (options, output) {
                options.push('--out', output);
                return options;
            },
            parse: function (dynamics, defaults) {
                /* ENSURING NO DUPLICATE --APP SWITCH */
                if (defaults === void 0) { defaults = []; }
                if (Utils.webtorrent.options.isAppSet(dynamics) && Utils.webtorrent.options.isAppSet(defaults)) {
                    defaults = defaults.filter(function (option) { return !option.match(Utils.webtorrent.options.appRe); });
                }
                /* OPTIONS */
                var options = defaults.concat(dynamics);
                /* ENSURING --APP SWITCH */
                if ((config_1.default.outputs.available.length || config_1.default.outputs.favorites.length) && !Utils.webtorrent.options.isAppSet(dynamics)) {
                    options = Utils.webtorrent.options.setApp(dynamics, config_1.default.outputs.favorites[0] || config_1.default.outputs.available[0]);
                }
                /* ENSURING --OUT SETTING */
                if (!Utils.webtorrent.options.isOutSet(options)) {
                    var outPath = config_1.default.downloads.save ? config_1.default.downloads.path : temp.mkdirSync('cliflix-');
                    options = Utils.webtorrent.options.setOut(options, outPath);
                }
                /* RETURN */
                return options;
            }
        }
    },
    language: {
        codes: ['afr', 'alb', 'ara', 'arm', 'ast', 'aze', 'baq', 'bel', 'ben', 'bos', 'bre', 'bul', 'bur', 'cat', 'chi', 'zht', 'zhe', 'hrv', 'cze', 'dan', 'dut', 'eng', 'epo', 'est', 'ext', 'fin', 'fre', 'glg', 'geo', 'ger', 'ell', 'heb', 'hin', 'hun', 'ice', 'ind', 'ita', 'jpn', 'kan', 'kaz', 'khm', 'kor', 'kur', 'lav', 'lit', 'ltz', 'mac', 'may', 'mal', 'mni', 'mon', 'mne', 'nor', 'oci', 'per', 'pol', 'por', 'pob', 'pom', 'rum', 'rus', 'scc', 'sin', 'slo', 'slv', 'spa', 'swa', 'swe', 'syr', 'tgl', 'tam', 'tel', 'tha', 'tur', 'ukr', 'urd', 'vie'],
        names: ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Asturian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chinese (simplified)', 'Chinese (traditional)', 'Chinese bilingual', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Extremaduran', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malay', 'Malayalam', 'Manipuri', 'Mongolian', 'Montenegrin', 'Norwegian', 'Occitan', 'Persian', 'Polish', 'Portuguese', 'Portuguese (BR)', 'Portuguese (MZ)', 'Romanian', 'Russian', 'Serbian', 'Sinhalese', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Syriac', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'],
        getCode: function (name) {
            var _a = Utils.language, codes = _a.codes, names = _a.names;
            return codes[_.indexOf(names, name)];
        },
        getName: function (code) {
            var _a = Utils.language, codes = _a.codes, names = _a.names;
            return names[_.indexOf(codes, code)];
        }
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLGdEQUFrRDtBQUNsRCxtQ0FBcUM7QUFDckMscURBQXNDO0FBQ3RDLG9DQUFzQztBQUN0Qyx1Q0FBeUM7QUFDekMsZ0RBQWtEO0FBQ2xELDJCQUE2QjtBQUM3QixtQ0FBOEI7QUFFOUIsV0FBVztBQUVYLElBQU0sS0FBSyxHQUFHO0lBRVosS0FBSztRQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFHLG9CQUFvQixDQUFFLENBQUM7SUFFaEQsQ0FBQztJQUVLLGVBQWU7Ozs7OzRCQUVKLHFCQUFNLFFBQVEsRUFBRyxFQUFBOzt3QkFBMUIsTUFBTSxHQUFHLFNBQWlCO3dCQUVoQyxFQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU8sQ0FBQzs0QkFBQyxNQUFNLElBQUksS0FBSyxDQUFHLEtBQUssQ0FBQyxHQUFHLENBQUcsZ0RBQWdELENBQUUsQ0FBRSxDQUFFOzs7OztLQUVwRztJQUVELE1BQU0sRUFBRTtRQUVOLFNBQVMsWUFBRyxJQUFjLEVBQUUsU0FBd0I7WUFBeEIsMEJBQUEsRUFBQSxjQUF3QjtZQUVsRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFFLENBQUM7WUFFeEMsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFckMsTUFBTSxDQUFLLFNBQVMsU0FBRSxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUcsR0FBSyxJQUFJLEVBQUUs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