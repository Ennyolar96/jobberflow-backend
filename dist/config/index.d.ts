import { DataSource } from "typeorm";
export declare const CREDENTIALS: boolean;
export declare const NODE_ENV: string, ENCRYPTION_KEY: string, ALGO_KEY: string;
export declare const ai: import("genkit").Genkit;
export declare const createProvider: (apiKey: string, provider: "openai" | "gemini") => import("genkit").Genkit;
export declare const AppDataSource: DataSource;
export declare const initializeDatabase: (maxRetries?: number, delay?: number) => Promise<DataSource>;
