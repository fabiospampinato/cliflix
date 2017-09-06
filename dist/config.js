"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var chalk = require("chalk");
var fs = require("fs");
var JSON5 = require("json5");
var localeCode = require("locale-code");
var os = require("os");
var osLocale = require("os-locale");
var path = require("path");
var inquirer_helpers_1 = require("inquirer-helpers");
/* CONFIG */
var Config = {
    localConfigPath: path.join(os.homedir(), '.cliflix.json'),
    outputs: {
        supported: ['Airplay', 'Chromecast', 'DLNA', 'MPlayer', 'mpv', 'omx', 'VLC', 'IINA', 'XBMC', 'stdout'],
        available: ['Airplay', 'Chromecast', 'DLNA', 'MPlayer', 'mpv', 'VLC', 'IINA', 'XBMC'],
        favorites: ['VLC']
    },
    torrents: {
        limit: 30,
        details: {
            seeders: true,
            leechers: true,
            size: true,
            time: false
        }
    },
    subtitles: {
        limit: 30,
        details: {
            downloads: true
        },
        languages: {
            available: ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Asturian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chinese (simplified)', 'Chinese (traditional)', 'Chinese bilingual', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Extremaduran', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malay', 'Malayalam', 'Manipuri', 'Mongolian', 'Montenegrin', 'Norwegian', 'Occitan', 'Persian', 'Polish', 'Portuguese', 'Portuguese (BR)', 'Portuguese (MZ)', 'Romanian', 'Russian', 'Serbian', 'Sinhalese', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Syriac', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'],
            favorites: ['English', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Portuguese', 'Russian', 'Spanish']
        },
        opensubtitles: {
            useragent: 'My Application v0.1',
            username: null,
            password: null,
            ssl: true
        }
    },
    webtorrent: {
        options: []
    },
    prompt: {
        rows: 10
    }
};
/* INIT */
function initPrompt() {
    inquirer_helpers_1.default.PAGE_SIZE = Config.prompt.rows;
}
function initLocale() {
    var locale = osLocale.sync().replace('_', '-'), languageName = localeCode.getLanguageName(locale), language = Config.subtitles.languages.available.find(function (language) { return language.startsWith(languageName); });
    if (!language)
        return;
    Config.subtitles.languages.favorites = _.uniq([language].concat(Config.subtitles.languages.favorites));
}
function initLocalConfig() {
    try {
        var content = fs.readFileSync(Config.localConfigPath, { encoding: 'utf8' }).toString();
        if (!content || !content.trim())
            return;
        var localConfig = _.attempt(JSON5.parse, content);
        if (_.isError(localConfig)) {
            console.error(chalk.red("Error reading the configuration file (" + Config.localConfigPath + "). Is it properly formatted JSON?"));
        }
        else {
            _.merge(Config, localConfig);
        }
    }
    catch (e) { }
}
initPrompt();
initLocale();
initLocalConfig();
/* EXPORT */
exports.default = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsWUFBWTs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLHVCQUF5QjtBQUN6Qiw2QkFBK0I7QUFDL0Isd0NBQTBDO0FBQzFDLHVCQUF5QjtBQUN6QixvQ0FBc0M7QUFDdEMsMkJBQTZCO0FBQzdCLHFEQUFzQztBQUV0QyxZQUFZO0FBRVosSUFBTSxNQUFNLEdBQUc7SUFDYixlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRyxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsZUFBZSxDQUFFO0lBQzdELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztRQUN0RyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3JGLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLEtBQUs7U0FDWjtLQUNGO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFV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