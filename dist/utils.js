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
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLG9DQUFzQztBQUN0Qyx1Q0FBeUM7QUFDekMsZ0RBQWtEO0FBQ2xELG1DQUFxQztBQUNyQyxvQ0FBc0M7QUFDdEMsdUNBQXlDO0FBQ3pDLG1DQUE4QjtBQUU5QixXQUFXO0FBRVgsSUFBTSxLQUFLLEdBQUc7SUFFTixlQUFlOzs7Ozs0QkFFSixxQkFBTSxRQUFRLEVBQUcsRUFBQTs7d0JBQTFCLE1BQU0sR0FBRyxTQUFpQjt3QkFFaEMsRUFBRSxDQUFDLENBQUUsQ0FBQyxNQUFPLENBQUM7NEJBQUMsTUFBTSxJQUFJLEtBQUssQ0FBRyxLQUFLLENBQUMsR0FBRyxDQUFHLGdEQUFnRCxDQUFFLENBQUUsQ0FBRTs7Ozs7S0FFcEc7SUFFRCxNQUFNLEVBQUU7UUFFQSxPQUFPLFlBQUcsT0FBZSxFQUFFLFFBQWdCO1lBQWhCLHlCQUFBLEVBQUEsZ0JBQWdCOzs7OztnQ0FFOUIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTtnQ0FDdEMsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsT0FBTyxTQUFBO2dDQUNQLE9BQU8sRUFBRSxRQUFROzZCQUNsQixDQUFDLEVBQUE7OzRCQUxLLE1BQU0sR0FBSSxDQUFBLFNBS2YsQ0FBQSxPQUxXOzRCQU9iLHNCQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUM7Ozs7U0FFakI7UUFFSyxLQUFLLFlBQUcsT0FBTyxFQUFFLFFBQVM7Ozs7O2dDQUViLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUU7Z0NBQ3RDLElBQUksRUFBRSxPQUFPO2dDQUNiLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sU0FBQTtnQ0FDUCxPQUFPLEVBQUUsUUFB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