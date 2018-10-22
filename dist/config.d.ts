declare const Config: {
    localConfigPath: string;
    downloads: {
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
        providers: {
            available: string[];
            active: string;
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
        options: string[];
    };
    prompt: {
        fullscreen: boolean;
        rows: number;
    };
};
export default Config;
