"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var localeCode = require("locale-code");
var osLocale = require("os-locale");
var inquirer_helpers_1 = require("inquirer-helpers");
/* CONFIG */
var Config = {
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
        enabled: true,
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
initPrompt();
initLocale();
/* EXPORT */
exports.default = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsWUFBWTs7QUFFWiwwQkFBNEI7QUFDNUIsd0NBQTBDO0FBQzFDLG9DQUFzQztBQUN0QyxxREFBc0M7QUFFdEMsWUFBWTtBQUVaLElBQU0sTUFBTSxHQUFHO0lBQ2IsT0FBTyxFQUFFO1FBQ1AsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBQ3RHLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDckYsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ25CO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsS0FBSztTQUNaO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFO1lBQ1AsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQztZQUNuN0IsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7U0FDL0c7UUFDRCxhQUFhLEVBQUU7WUFDYixTQUFTLEVBQUUscUJBQXFCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsSUFBSTtTQUNWO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsRUFBRTtLQUNUO0NBQ0YsQ0FBQztBQUVGLFVBQVU7QUFFVjtJQUVFLDBCQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBRXhDLENBQUM7QUFFRDtJQUVFLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUcsQ0FBQyxPQUFPLENBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBRSxFQUM5QyxZQUFZLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBRyxNQUFNLENBQUUsRUFDcEQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUcsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsVUFBVSxDQUFHLFlBQVksQ0FBRSxFQUFwQyxDQUFvQyxDQUFFLENBQUM7SUFFaEgsRUFBRSxDQUFDLENBQUUsQ0FBQyxRQUFTLENBQUM7UUFBQyxNQUFNLENBQUM7SUFFeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUksUUFBUSxTQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRyxDQUFDO0FBRXhHLENBQUM7QUFFRCxVQUFVLEVBQUcsQ0FBQztBQUNkLFVBQVUsRUFBRyxDQUFDO0FBRWQsWUFBWTtBQUVaLGtCQUFlLE1BQU0sQ0FBQyJ9