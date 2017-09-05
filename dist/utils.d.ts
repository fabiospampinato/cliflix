declare const Utils: {
    checkConnection(): Promise<void>;
    prompt: {
        confirm(message: string, fallback?: boolean): Promise<boolean>;
        input(message: any, fallback?: any): Promise<any>;
        list(message: any, arr: any, fallback?: any): Promise<any>;
        title(message: any, titles: any): Promise<any>;
        yesOrNo(message: any, fallback?: any): Promise<Boolean>;
    };
    torrent: {
        parseTitle(title: any): any;
        parseSize(size: any): any;
    };
    webtorrent: {
        options: {
            isAppSet(options: string[]): boolean;
            setApp(options: string[], app: string): string[];
            parse(options: string[]): string[];
        };
    };
    generateTempFile(options?: Object): Promise<string>;
    downloadGunzip(url: string): Promise<string>;
};
export default Utils;
