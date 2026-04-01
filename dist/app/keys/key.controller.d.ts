import { CreateKey, VerifyPassword } from "./input";
import { KeyService } from "./key.service";
export declare class KeyController {
    private readonly keyService;
    constructor(keyService: KeyService);
    createKey(input: CreateKey): Promise<import("./entities").Keys>;
    getKeys(userId: string): Promise<{
        openai: string | null;
        gemini: string | null;
    }>;
    verifyPassword(input: VerifyPassword): Promise<boolean>;
}
