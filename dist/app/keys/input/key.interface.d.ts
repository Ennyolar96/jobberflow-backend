import { IBaseEntity } from "@/global/common";
export interface IKeys extends IBaseEntity {
    userId: string;
    openai: string | null;
    gemini: string | null;
    deepgram: string | null;
    password: string;
}
export type IKeysCreate = Omit<IKeys, "id" | "createdAt" | "updatedAt">;
export type IKeyResponse = Omit<IKeys, "id" | "createdAt" | "updatedAt" | "userId" | "password">;
