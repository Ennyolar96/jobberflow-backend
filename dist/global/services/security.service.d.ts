export declare class SecurityService {
    private deriveKeys;
    encrypt(plaintext: string, password: string): Promise<string>;
    decrypt(payloadHex: string, password: string): Promise<string>;
}
