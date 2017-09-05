/// <reference types="node" />
import * as child_process from 'child_process';
declare const Watch: {
    wizard(webtorrentOptions?: string[]): Promise<void>;
    lucky(queryOrTorrent: any, webtorrentOptions?: string[]): Promise<void | child_process.ChildProcess>;
    getTitles(query: any, rows?: number): Promise<any>;
    getSubtitles(movieName: any, lang: any): Promise<string>;
    stream(torrent: any, webtorrentOptions?: string[]): Promise<child_process.ChildProcess>;
};
export default Watch;
