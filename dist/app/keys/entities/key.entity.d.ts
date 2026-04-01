import { IKeys } from "../input/key.interface";
import { BaseEntity } from "../../../global/common";
export declare class Keys extends BaseEntity implements IKeys {
    userId: string;
    openai: string | null;
    gemini: string | null;
    password: string;
}
