declare const Utils: {
    exec(command: any, options?: {}): any;
    spawn(command: any, options?: {}): void;
    checkConnection(): Promise<void>;
    prompt: {
        confirm(message: string, fallback?: boolean): Promise<boolean>;
        input(message: any, fallback?: any): Promise<any>;
        list(message: any, arr: any, fallback?: any): Promise<any>;
        yesOrNo(message: any, fallback?: any): Promise<Boolean>;
    };
    generateTempFile(options?: Object): Promise<string>;
    downloadGunzip(url: string): Promise<string>;
};
export default Utils;
