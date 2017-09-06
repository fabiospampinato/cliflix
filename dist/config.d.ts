declare const Config: {
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
        enabled: boolean;
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
    prompt: {
        rows: number;
    };
};
export default Config;
