declare const Watch: {
    wizard(webtorrentOptions?: string[]): Promise<void>;
    lucky(queryOrTorrent: any, webtorrentOptions?: string[]): Promise<void>;
    getTitles(query: any, rows?: number): Promise<any>;
    stream(torrent: any, webtorrentOptions?: string[]): Promise<void>;
};
export default Watch;
