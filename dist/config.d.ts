declare const Config: {
    localConfigPath: string;
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
        rows: number;
    };
};
export default Config;
