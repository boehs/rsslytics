export interface LogEntry {
    date: number;
    readerId: string;
    ip: string;
    feedUrl: string;
    feedId: string | null;
    subscriberCount: number | null;
    readerName: string | null;
    readerVersion: string | null;
    userAgent: string;
}
export declare function countRss(userAgent: string, feedUrl: any, ip: string): void;
