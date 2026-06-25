import { CreateKey, VerifyPassword } from "./input";
import { KeyService } from "./key.service";
export declare class KeyController {
    private readonly keyService;
    constructor(keyService: KeyService);
    createKey(input: CreateKey): Promise<import("./entities").Keys>;
    getKeys(userId: string): Promise<import("./input").IKeyResponse>;
    verifyPassword(input: VerifyPassword): Promise<boolean>;
}
