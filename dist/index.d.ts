declare const Watch: {
    wizard(webtorrentOptions?: string[]): Promise<void>;
    lucky(queryOrTorrent: any, webtorrentOptions?: string[]): Promise<void>;
    getTorrents(query: any, rows?: number): Promise<any>;
    getSubtitles(query: any, language: any): Promise<any>;
    stream(torrent: any, webtorrentOptions?: string[]): Promise<void>;
};
export default Watch;
