import { CacheService, SecurityService } from "../../global/services";
import { IKeysCreate } from "./input";
import { Keys } from "./entities";
export declare class KeyService {
    private readonly securityService;
    private readonly cacheService;
    private readonly keyRepository;
    constructor(securityService: SecurityService, cacheService: CacheService);
    createkey(payload: IKeysCreate): Promise<Keys>;
    getKeys(userId: string): Promise<{
        openai: string | null;
        gemini: string | null;
    }>;
    verifyPassword(userId: string, password: string): Promise<boolean>;
}
