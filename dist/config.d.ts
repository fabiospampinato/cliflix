declare const Config: {
    localConfigPath: string;
    download: {
        path: string;
        save: boolean;
    };
    outputs: {
        supported: string[];
        available: string[];
        favorites: string[];
    };
    torrents: {
        limit: number;
        details: {
            seeders: boolean;
            leechers: boolean;
            size: boolean;
            time: boolean;
        };
    };
    subtitles: {
        limit: number;
        details: {
            downloads: boolean;
        };
        languages: {
            available: string[];
            favorites: string[];
        };
        opensubtitles: {
            useragent: string;
            username: null;
            password: null;
            ssl: boolean;
        };
    };
    webtorrent: {
        options: never[];
    };
    prompt: {
        fullscreen: boolean;
        rows: number;
    };
};
export default Config;
