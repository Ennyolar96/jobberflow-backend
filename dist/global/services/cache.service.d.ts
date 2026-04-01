export declare class CacheService {
    private cache;
    constructor();
    generateKey(prefix: string, params: Record<string, any>): string;
    setQuery(key: string, value: any, ttl?: number): boolean;
    getQuery<T>(key: string): T | undefined;
    delQuery(key: string): number;
    flushAllQuery(): void;
}
