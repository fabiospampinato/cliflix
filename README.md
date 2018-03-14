# CLIFlix

Watch anything instantaneously, just write its name.

It searches a magnet for you and streams it using [WebTorrent](https://github.com/fabiospampinato/webtorrent-cli/tree/iina-support) to your favorite app. It supports subtitles too.

## Install

```shell
$ npm install -g cliflix
```

## Usage

#### Wizard

Execute `cliflix` to run a wizard, it'll ask you everything it needs: a search query, which title to stream, and which app to use. If you want it may also search for subtitles for you.

<p align="center">
	<img src="resources/wizard.gif" width="600" alt="Wizard">
</p>

#### I'm Feeling Lucky

If you're feeling lucky, just run something like this to automatically pick the first result:

```shell
cliflix Star Wreck
```

#### Manual

You can also directly pass any of the valid torrent identifiers supported by [parse-torrent](https://github.com/webtorrent/parse-torrent) to stream it:

```shell
cliflix "magnet:?xt=urn:btih:a2c1adc668fc25bdcb137d43060b76cd043a7fdb&dn=Tears+of+Steel+%282012%29+1080p+mkv&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969"
```

#### WebTorrent Options

You can pass arbitrary options to [WebTorrent](https://github.com/fabiospampinato/webtorrent-cli/tree/iina-support), read more about them [here](https://github.com/fabiospampinato/webtorrent-cli/tree/iina-support). Just write them after the special `--` argument:

```shell
cliflix -- --vlc --port 1234
cliflix Star Wreck -- --vlc --port 1234
```

## Configuration

You can customize `cliflix` to your likings via a `~/.cliflix.json` file. `~` is the path to your home directory.

These are the settings available:

```js
{
  "downloads": { // Downloads-related settings
    "save": true, // Save the downloaded torrents or delete them upon exit
    "path": "~/Downloads" // If saving them, put them here
  },
  "outputs": { // Apps-related settings
    "available": ["Airplay", "Chromecast", "DLNA", "MPlayer", "mpv", "VLC", "IINA", "XBMC"], // Apps to list when asking for the app
    "favorites": ["VLC"] // Favorite apps, they will be listed before the others
  },
  "torrents": { // Torrents-related settings
    "limit": 30, // Number of torrents to show
    "details": { // Extra columns to show
      "seeders": true,
      "leechers": true,
      "size": true,
      "time": false
    },
    "providers": { // Torrents providers-related settings
      "available": ["1337x", "KickassTorrents", "Rarbg", "T411", "ThePirateBay", "Torrent9", "TorrentProject", "Torrentz2"], // Providers to list if none is active
      "active": "ThePirateBay" // Active provider
    }
  },
  "subtitles": { // Subtitles-related settings
    "limit": 30, // Number of subtitles to show
    "details": { // Extra columns to show
      "downloads": true
    },
    "languages": { // Languages-related settings
      "available": ["Afrikaans", "..."], // Languages to list when asking for the subtitles' language
      "favorites": ["English", "..."] // Favorite languages, they will be listed before the others
    },
    "opensubtitles": { // OpenSubtitles-related settings
      "username": null, // Your OpenSubtitles username, required for increasing your IP quota
      "password": null, // Your OpenSubtitles password, required for increasing your IP quota
      "ssl": true
    }
  },
  "webtorrent": { // WebTorrent-related options
    "options": [] // Custom options to always pass to WebTorrent
  },
  "prompt": { // Prompt-related options
    "fullscreen": true, // Display as many lines as possible when asking to pick something
    "rows": 10 // Maximum number of lines to display when asking to pick something, if fullscreen is false
  }
}
```

## License

MIT © Fabio Spampinato
