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
var caporal = require("caporal");
var readPkg = require("read-pkg-up");
var updateNotifier = require("update-notifier");
var utils_1 = require("./utils");
var _1 = require(".");
/* CLI */
function CLI() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var pkg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readPkg({ cwd: __dirname })];
                case 1:
                    pkg = (_a.sent()).pkg;
                    caporal
                        .version(pkg.version)
                        .argument('[title|torrent]', 'Video title or torrent identifier')
                        .argument('[-- webtorrent options...]', 'WebTorrent options')
                        .action(function (args) { return __awaiter(_this, void 0, void 0, function () {
                        var doubleDashIndex, hasWebtorrentOptions, queryOrTorrent, webtorrentOptions;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, utils_1.default.checkConnection()];
                                case 1:
                                    _a.sent();
                                    updateNotifier({ pkg: pkg }).notify();
                                    args = _.castArray(args.titleTorrent || []).concat(args.webtorrentOptions);
                                    doubleDashIndex = args.findIndex(function (x) { return x === '--'; }), hasWebtorrentOptions = (doubleDashIndex >= 0), queryOrTorrent = hasWebtorrentOptions ? args.slice(0, doubleDashIndex).join(' ') : args.join(' '), webtorrentOptions = hasWebtorrentOptions ? args.slice(doubleDashIndex + 1) : [];
                                    if (!queryOrTorrent)
                                        return [2 /*return*/, _1.default.wizard(webtorrentOptions)];
                                    return [2 /*return*/, _1.default.lucky(queryOrTorrent, webtorrentOptions)];
                            }
                        });
                    }); });
                    caporal.parse(process.argv);
                    return [2 /*return*/];
            }
        });
    });
}
/* EXPORT */
exports.default = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaLDBCQUE0QjtBQUM1QixpQ0FBbUM7QUFDbkMscUNBQXVDO0FBQ3ZDLGdEQUFrRDtBQUNsRCxpQ0FBNEI7QUFDNUIsc0JBQXdCO0FBRXhCLFNBQVM7QUFFVDs7Ozs7O3dCQUVnQixxQkFBTSxPQUFPLENBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBQTs7b0JBQXpDLEdBQUcsR0FBSSxDQUFBLFNBQWtDLENBQUEsSUFBdEM7b0JBRVYsT0FBTzt5QkFDSixPQUFPLENBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBRTt5QkFDdkIsUUFBUSxDQUFHLGlCQUFpQixFQUFFLG1DQUFtQyxDQUFFO3lCQUNuRSxRQUFRLENBQUcsNEJBQTRCLEVBQUUsb0JBQW9CLENBQUU7eUJBQy9ELE1BQU0sQ0FBRyxVQUFRLElBQUk7Ozs7d0NBRXBCLHFCQUFNLGVBQUssQ0FBQyxlQUFlLEVBQUcsRUFBQTs7b0NBQTlCLFNBQThCLENBQUM7b0NBRS9CLGNBQWMsQ0FBRSxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUcsQ0FBQztvQ0FFbkMsSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUUsQ0FBQyxNQUFNLENBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFFLENBQUM7b0NBRTNFLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFHLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLElBQUksRUFBVixDQUFVLENBQUUsRUFDcEQsb0JBQW9CLEdBQUcsQ0FBRSxlQUFlLElBQUksQ0FBQyxDQUFFLEVBQy9DLGNBQWMsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFHLENBQUMsRUFBRSxlQUFlLENBQUUsQ0FBQyxJQUFJLENBQUcsR0FBRyxDQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBRyxHQUFHLENBQUUsRUFDMUcsaUJBQWlCLEdBQUcsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxDQUFDO29DQUV6RixFQUFFLENBQUMsQ0FBRSxDQUFDLGNBQWUsQ0FBQzt3Q0FBQyxNQUFNLGdCQUFDLFVBQU8sQ0FBQyxNQUFNLENBQUcsaUJBQWlCLENBQUUsRUFBQztvQ0FFbkUsc0JBQU8sVUFBTyxDQUFDLEtBQUssQ0FBRyxjQUFjLEVBQUUsaUJBQWlCLENBQUUsRUFBQzs7O3lCQUU1RCxDQUFDLENBQUM7b0JBRUwsT0FBTyxDQUFDLEtBQUssQ0FBRyxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUM7Ozs7O0NBRWhDO0FBRUQsWUFBWTtBQUVaLGtCQUFlLEdBQUcsQ0FBQyJ9