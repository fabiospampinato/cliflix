# CLIFlix

Watch anything instantaneously, just write its name.

It searches a torrent for you and streams it using [WebTorrent](https://github.com/fabiospampinato/webtorrent-cli/tree/iina-pip) to your favorite app. It supports subtitles too.

> **Warning**: If you don't know what a torrent is, or are unsure about the legality of the torrents you're downloading you shouldn't use `cliflix`.

## Install

```shell
$ npm install -g cliflix
```

## Usage

#### Wizard

Execute `cliflix` to run a wizard, it'll ask you everything it needs: a search query, which torrent to stream, and which app to use. If you want it may also search for subtitles for you.

<p align="center">
	<img src="resources/wizard.gif" width="631" alt="Wizard">
</p>

#### I'm Feeling Lucky

If you're feeling lucky, just run something like this to automatically pick the first result:

```shell
cliflix Sintel
```

#### Manual

You can also directly pass any of the valid torrent identifiers supported by [parse-torrent](https://github.com/webtorrent/parse-torrent) to stream it:

```shell
cliflix "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent"
```

#### WebTorrent Options

You can pass arbitrary options to [WebTorrent](https://github.com/fabiospampinato/webtorrent-cli/tree/iina-pip), read more about them [here](https://github.com/fabiospampinato/webtorrent-cli/tree/iina-pip). Just write them after the special `--` argument:

```shell
cliflix -- --iina --pip
cliflix -- --vlc --port 1234
cliflix Sintel -- --vlc --port 1234
```

## Configuration

You can customize `cliflix` to your likings via a `~/.cliflix.json` file.

These are the settings available:

```js
{
  "downloads": { // Downloads-related settings
    "path": "~/Downloads", // If saving them, put them here
    "save": true // Save the downloaded torrents or delete them upon exit
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
      "available": ["1337x", "ThePirateBay", "ExtraTorrent", "Rarbg", "Torrent9", "KickassTorrents", "TorrentProject", "Torrentz2"], // Providers to list if none is active
      "active": "1337x" // Active provider
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
  }
}
```

## License

MIT © Fabio Spampinato
