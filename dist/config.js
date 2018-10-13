"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var chalk_1 = require("chalk");
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
    downloads: {
        path: path.join(os.homedir(), 'Downloads'),
        save: true
    },
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
        },
        providers: {
            available: ['1337x', 'ThePirateBay', 'ExtraTorrent', 'Rarbg', 'Torrent9', 'KickassTorrents', 'TorrentProject', 'Torrentz2'],
            active: '1337x'
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
            useragent: 'PlayMe v1',
            username: null,
            password: null,
            ssl: true
        }
    },
    webtorrent: {
        options: []
    },
    prompt: {
        fullscreen: true,
        rows: 10
    }
};
/* INIT */
function initPrompt() {
    inquirer_helpers_1.default.FULLSCREEN = Config.prompt.fullscreen;
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
            console.error(chalk_1.default.red("Error reading the configuration file (" + chalk_1.default.bold(Config.localConfigPath) + "). Is it properly formatted JSON?"));
        }
        else {
            _.mergeWith(Config, localConfig, function (prev, next) {
                if (!_.isArray(prev) || !_.isArray(next))
                    return;
                return next;
            });
        }
    }
    catch (e) { }
}
initLocale();
initLocalConfig();
initPrompt();
/* EXPORT */
exports.default = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsWUFBWTs7QUFFWiwwQkFBNEI7QUFDNUIsK0JBQTBCO0FBQzFCLHVCQUF5QjtBQUN6Qiw2QkFBK0I7QUFDL0Isd0NBQTBDO0FBQzFDLHVCQUF5QjtBQUN6QixvQ0FBc0M7QUFDdEMsMkJBQTZCO0FBQzdCLHFEQUFzQztBQUV0QyxZQUFZO0FBRVosSUFBTSxNQUFNLEdBQUc7SUFDYixlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRyxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsZUFBZSxDQUFFO0lBQzdELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUcsRUFBRSxXQUFXLENBQUU7UUFDOUMsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQztRQUN0RyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3JGLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNSLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLEtBQUs7U0FDWjtRQUNELFNBQVMsRUFBRTtZQUNULFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFj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