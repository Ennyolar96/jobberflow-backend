import NodeCache from "node-cache";
import { Service } from "typedi";

@Service()
export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600,
      checkperiod: 600,
      useClones: false,
    });
  }

  generateKey(prefix: string, params: Record<string, any>): string {
    return `${prefix}:${JSON.stringify(params)}`;
  }

  setQuery(key: string, value: any, ttl = 3600): boolean {
    return this.cache.set(key, value, ttl);
  }

  getQuery<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  delQuery(key: string): number {
    return this.cache.del(key);
  }

  flushAllQuery(): void {
    this.cache.flushAll();
  }
}
