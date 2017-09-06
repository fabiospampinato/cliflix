declare const Utils: {
    checkConnection(): Promise<void>;
    prompt: {
        parseList(list: string[], favorites?: string[]): any[];
        title(message: any, titles: any): Promise<any>;
        subtitles(message: any, subtitlesAll: any): Promise<any>;
    };
    torrent: {
        parseTitle(title: any): any;
        parseSize(size: any): any;
    };
    subtitles: {
        parseTitle(title: any): any;
        download(url: any): Promise<any>;
    };
    webtorrent: {
        options: {
            isOptionSet(options: string[], regex: any): boolean;
            isAppSet(options: string[]): boolean;
            isSubtitlesSet(options: string[]): boolean;
            setApp(options: string[], app: string): string[];
            setSubtitles(options: string[], subtitles: string): string[];
            parse(options: string[]): string[];
        };
    };
    language: {
        codes: string[];
        names: string[];
        getCode(name: any): string;
        getName(code: any): string;
    };
};
export default Utils;
