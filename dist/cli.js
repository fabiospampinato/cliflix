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
var caporal = require("caporal");
var readPkg = require("read-pkg-up");
var _1 = require(".");
/* CLI */
function CLI() {
    return __awaiter(this, void 0, void 0, function () {
        var pkg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readPkg({ cwd: __dirname })];
                case 1:
                    pkg = (_a.sent()).pkg;
                    caporal
                        .version(pkg.version)
                        .argument('[title]', 'Item title')
                        .option('--app <app>', 'App to open')
                        .action(function (args, options) {
                        if (!args.title)
                            return _1.default.wizard();
                        return _1.default.lucky(args.title, options.app);
                    });
                    caporal.parse(process.argv);
                    return [2 /*return*/];
            }
        });
    });
}
/* EXPORT */
exports.default = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaLGlDQUFtQztBQUNuQyxxQ0FBdUM7QUFDdkMsc0JBQXNCO0FBRXRCLFNBQVM7QUFFVDs7Ozs7d0JBRWdCLHFCQUFNLE9BQU8sQ0FBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFBOzswQkFBbEMsQ0FBQSxTQUFrQyxDQUFBO29CQUVoRCxPQUFPO3lCQUNKLE9BQU8sQ0FBRyxHQUFHLENBQUMsT0FBTyxDQUFFO3lCQUN2QixRQUFRLENBQUcsU0FBUyxFQUFFLFlBQVksQ0FBRTt5QkFDcEMsTUFBTSxDQUFHLGFBQWEsRUFBRSxhQUFhLENBQUU7eUJBQ3ZDLE1BQU0sQ0FBRyxVQUFFLElBQUksRUFBRSxPQUFPO3dCQUN2QixFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUM7NEJBQUMsTUFBTSxDQUFDLFVBQUssQ0FBQyxNQUFNLEVBQUcsQ0FBQzt3QkFDMUMsTUFBTSxDQUFDLFVBQUssQ0FBQyxLQUFLLENBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUM7b0JBQ2pELENBQUMsQ0FBQyxDQUFDO29CQUVMLE9BQU8sQ0FBQyxLQUFLLENBQUcsT0FBTyxDQUFDLElBQUksQ0FBRSxDQUFDOzs7OztDQUVoQztBQUVELFlBQVk7QUFFWixrQkFBZSxHQUFHLENBQUMifQ==