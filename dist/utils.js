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
                        case 0:
                            temp.track();
                            return [4 /*yield*/, request(url)];
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
            isOptionSet: function (options, regex) {
                return !!options.find(function (option) { return !!option.match(regex); });
            },
            isAppSet: function (options) {
                var appRe = new RegExp("^--(" + config_1.default.outputs.supported.join('|') + ")$", 'i');
                return Utils.webtorrent.options.isOptionSet(options, appRe);
            },
            isSubtitlesSet: function (options) {
                var subtitlesRe = /--subtitles/i;
                return Utils.webtorrent.options.isOptionSet(options, subtitlesRe);
            },
            setApp: function (options, app) {
                options.push("--" + app.toLowerCase());
                return options;
            },
            setSubtitles: function (options, subtitles) {
                options.push("--subtitles", subtitles);
                return options;
            },
            parse: function (options) {
                /* ENSURING --APP SWITCH */
                if (!Utils.webtorrent.options.isAppSet(options)) {
                    options = Utils.webtorrent.options.setApp(options, config_1.default.outputs.favorites[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLGdEQUFrRDtBQUNsRCxtQ0FBcUM7QUFDckMscURBQXNDO0FBQ3RDLG9DQUFzQztBQUN0Qyx1Q0FBeUM7QUFDekMsZ0RBQWtEO0FBQ2xELDJCQUE2QjtBQUM3QixtQ0FBOEI7QUFFOUIsV0FBVztBQUVYLElBQU0sS0FBSyxHQUFHO0lBRU4sZUFBZTs7Ozs7NEJBRUoscUJBQU0sUUFBUSxFQUFHLEVBQUE7O3dCQUExQixNQUFNLEdBQUcsU0FBaUI7d0JBRWhDLEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTyxDQUFDOzRCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBRyxnREFBZ0QsQ0FBRSxDQUFFLENBQUU7Ozs7O0tBRXBHO0lBRUQsTUFBTSxFQUFFO1FBRU4sU0FBUyxZQUFHLElBQWMsRUFBRSxTQUF3QjtZQUF4QiwwQkFBQSxFQUFBLGNBQXdCO1lBRWxELElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFHLElBQUksRUFBRSxTQUFTLENBQUUsQ0FBQztZQUV4QyxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxNQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQyxNQUFPLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUVyQyxNQUFNLENBQUssU0FBUyxTQUFFLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRyxHQUFLLElBQUksRUFBRSxDQUFDLCtCQUErQjtRQUU1RixDQUFDO1FBRUssS0FBSyxZQUFHLE9BQU8sRUFBRSxNQUFNOzs7Ozs7NEJBSXZCLEtBQUssR0FB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QUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDbGlCLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDO1FBRS82QixPQUFPLFlBQUcsSUFBSTtZQUVOLElBQUEsbUJBQStCLEVBQTlCLGdCQUFLLEVBQUUsZ0JBQUssQ0FBbUI7WUFFdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFHLEtBQUssRUFBRSxJQUFJLENBQUUsQ0FBQyxDQUFDO1FBRTFDLENBQUM7UUFFRCxPQUFPLFlBQUcsSUFBSTtZQUVOLElBQUEsbUJBQStCLEVBQTlCLGdCQUFLLEVBQUUsZ0JBQUssQ0FBbUI7WUFFdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFHLEtBQUssRUFBRSxJQUFJLENBQUUsQ0FBQyxDQUFDO1FBRTFDLENBQUM7S0FFRjtDQUVGLENBQUM7QUFFRixZQUFZO0FBRVosa0JBQWUsS0FBSyxDQUFDIn0=