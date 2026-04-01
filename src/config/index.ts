import { googleAI } from "@genkit-ai/google-genai";
import { config } from "dotenv";
import { genkit } from "genkit";
import { gpt4oMini, openAI } from "genkitx-openai";
import Container from "typedi";
import { DataSource } from "typeorm";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });
config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, ENCRYPTION_KEY, ALGO_KEY } = process.env;

export const ai = genkit({
  plugins: [googleAI(), openAI()],
});

export const createProvider = (
  apiKey: string,
  provider: "openai" | "gemini",
) => {
  return genkit({
    plugins: [googleAI({ apiKey }), openAI({ apiKey })],
    model: provider === "openai" ? gpt4oMini : "googleai/gemini-2.5-flash",
  });
};

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: process.env.DATABASE_NAME || "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
});

Container.set(DataSource, AppDataSource);
export const initializeDatabase = async (
  maxRetries = 5,
  delay = 5000,
): Promise<DataSource> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      console.log("Database connection established");

      return AppDataSource;
    } catch (error) {
      console.error(`Connection attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        console.error(`All ${maxRetries} connection attempts failed`);
        throw error;
      }

      console.log(
        `Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("All connection attempts failed");
};
