declare const Watch: {
    wizard(webtorrentOptions?: string[]): Promise<void>;
    getTitles(query: any, rows?: number): Promise<any>;
    getMagnet(query: any, index?: number, rows?: number): Promise<any>;
    stream(magnet: any, webtorrentOptions?: string[]): Promise<void>;
    lucky(query: any, webtorrentOptions?: string[]): Promise<void>;
};
export default Watch;
