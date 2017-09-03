declare const Utils: {
    exec(command: any, options?: {}): any;
    spawn(command: any, args?: string[], options?: {}): void;
    checkConnection(): Promise<void>;
    prompt: {
        confirm(message: string, fallback?: boolean): Promise<boolean>;
        input(message: any, fallback?: any): Promise<any>;
        list(message: any, arr: any, fallback?: any): Promise<any>;
    };
};
export default Utils;
