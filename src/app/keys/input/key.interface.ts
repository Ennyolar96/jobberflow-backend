import { IBaseEntity } from "@/global/common";

export interface IKeys extends IBaseEntity {
  userId: string;
  openai: string | null;
  gemini: string | null;
  password: string;
}

export type IKeysCreate = Omit<IKeys, "id" | "createdAt" | "updatedAt">;
