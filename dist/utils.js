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
var cliWidth = require("cli-width");
var truncate = require("cli-truncate");
var filesizeParser = require("filesize-parser");
var inquirer = require("inquirer");
var isOnline = require("is-online");
var prettySize = require("prettysize");
var temp = require("temp");
var fs = require("fs");
var zlib = require("zlib");
var request = require("request");
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
                        case 0:
                            if (arr.length > config_1.default.listNr)
                                arr.push(new inquirer.Separator('\n'));
                            return [4 /*yield*/, inquirer.prompt({
                                    type: 'list',
                                    name: 'result',
                                    choices: arr,
                                    pageSize: config_1.default.listNr,
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
        },
        title: function (message, titles) {
            return __awaiter(this, void 0, void 0, function () {
                var maxWidth, table, maxLenghts_1, overflowColumn, maxColumn_1, colors_1, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            maxWidth = cliWidth() - 6;
                            table = [];
                            titles.forEach(function (title) {
                                var row = [];
                                row.push(truncate(Utils.torrent.parseTitle(title.title), maxWidth));
                                if (config_1.default.details.seeders)
                                    row.push("" + title.seeds);
                                if (config_1.default.details.leechers)
                                    row.push("" + title.peers);
                                if (config_1.default.details.size)
                                    row.push(Utils.torrent.parseSize(title.size));
                                if (config_1.default.details.time)
                                    row.push(title.time);
                                table.push(row);
                            });
                            /* FORMATTING */
                            if (table[0].length > 1) {
                                maxLenghts_1 = table[0].map(function (val, index) { return _.max(table.map(function (row) { return row[index].length; })); }), overflowColumn = maxLenghts_1.findIndex(function (length, index) { return (_.sum(maxLenghts_1.slice(0, index + 1)) + (index * 4)) > maxWidth; }), maxColumn_1 = overflowColumn >= 0 ? Math.max(0, overflowColumn - 1) : maxLenghts_1.length - 1;
                                /* FILTERING */
                                table = table.map(function (row) { return row.slice(0, maxColumn_1 + 1); });
                                /* PADDING */
                                table = table.map(function (row) {
                                    return row.map(function (val, index) {
                                        var padFN = index > 0 ? 'padStart' : 'padEnd';
                                        return _[padFN](val, maxLenghts_1[index]);
                                    });
                                });
                                colors_1 = [undefined, 'green', 'red', 'yellow', 'magenta'];
                                table = table.map(function (row) {
                                    return row.map(function (val, index) {
                                        var color = colors_1[index];
                                        if (!color)
                                            return val;
                                        return chalk[color](val);
                                    });
                                });
                            }
                            list = table.map(function (row, index) { return ({
                                name: row.length > 1 ? "| " + row.join(' | ') + " |" : row[0],
                                value: titles[index]
                            }); });
                            return [4 /*yield*/, Utils.prompt.list(message, list)];
                        case 1: 
                        /* INQUIRER */
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        yesOrNo: function (message, fallback) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Utils.prompt.list(message, ['yes', 'no'], fallback)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result === 'yes'];
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
    webtorrent: {
        options: {
            isAppSet: function (options) {
                var appRe = new RegExp("^--(" + config_1.default.outputs.join('|') + ")$", 'i'), isAppSet = !!options.find(function (option) { return !!option.match(appRe); });
                return isAppSet;
            },
            setApp: function (options, app) {
                options.push("--" + app.toLowerCase());
                return options;
            },
            parse: function (options) {
                /* ENSURING --APP SWITCH */
                if (!Utils.webtorrent.options.isAppSet(options)) {
                    options = Utils.webtorrent.options.setApp(options, config_1.default.output);
                }
                /* RETURN */
                return options;
            }
        }
    },
    generateTempFile: function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        temp.open(options, function (err, _a) {
                            var tempFile = _a.path;
                            if (err)
                                return reject(err);
                            return resolve(tempFile);
                        });
                    })];
            });
        });
    },
    downloadGunzip: function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var tempFile;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Utils.generateTempFile()];
                                case 1:
                                    tempFile = _a.sent();
                                    request(url)
                                        .pipe(zlib.createGunzip())
                                        .pipe(fs
                                        .createWriteStream(tempFile)
                                        .on('finish', function () { return resolve(tempFile); })
                                        .on('error', function (err) { return reject(err); }));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLG9DQUFzQztBQUN0Qyx1Q0FBeUM7QUFDekMsZ0RBQWtEO0FBQ2xELG1DQUFxQztBQUNyQyxvQ0FBc0M7QUFDdEMsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3Qix1QkFBeUI7QUFDekIsMkJBQTZCO0FBQzdCLGlDQUFtQztBQUNuQyxtQ0FBOEI7QUFFOUIsV0FBVztBQUVYLElBQU0sS0FBSyxHQUFHO0lBRU4sZUFBZTs7Ozs7NEJBRUoscUJBQU0sUUFBUSxFQUFHLEVBQUE7O3dCQUExQixNQUFNLEdBQUcsU0FBaUI7d0JBRWhDLEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTyxDQUFDOzRCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBRyxnREFBZ0QsQ0FBRSxDQUFFLENBQUU7Ozs7O0tBRXBHO0lBRUQsTUFBTSxFQUFFO1FBRUEsT0FBTyxZQUFHLE9BQWUsRUFBRSxRQUFnQjtZQUFoQix5QkFBQSxFQUFBLGdCQUFnQjs7Ozs7Z0NBRTlCLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUU7Z0NBQ3RDLElBQUksRUFBRSxTQUFTO2dDQUNmLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sU0FBQTtnQ0FDUCxPQUFPLEVBQUUsUUFBUTs2QkFDbEIsQ0FBQyxFQUFBOzs0QkFMSyxNQUFNLEdBQUksQ0FBQSxTQUtmLENBQUEsT0FMVzs0QkFPYixzQkFBTyxDQUFDLENBQUMsTUFBTSxFQUFDOzs7O1NBRWpCO1FBRUssS0FBSyxZQUFHLE9BQU8sRUFBRSxRQUFTOzs7OztnQ0FFYixxQkFBTSxRQUFRLENBQUMsTUFBTSxDQUFFO2dDQUN0QyxJQUFJLEVBQUUsT0FBTztnQ0FD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