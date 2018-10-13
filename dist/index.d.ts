import './temp';
declare const CLIFlix: {
    wizard(webtorrentOptions?: string[]): Promise<void>;
    lucky(queryOrTorrent: any, webtorrentOptions?: string[]): Promise<void>;
    getTorrents(query: any, rows?: number, provider?: string, providers?: string[]): any;
    getTorrent(): Promise<any>;
    getMagnet(torrent: any): Promise<any>;
    getSubtitles(query: any, language: any): Promise<any>;
    stream(torrent: any, webtorrentOptions?: string[]): Promise<void>;
};
export default CLIFlix;
