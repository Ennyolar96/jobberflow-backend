import { IKeysCreate } from "./key.interface";
export declare class CreateKey implements IKeysCreate {
    userId: string;
    openai: string;
    gemini: string;
    deepgram: string;
    password: string;
}
export declare class VerifyPassword {
    userId: string;
    password: string;
}
