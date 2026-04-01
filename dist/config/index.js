"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = exports.createProvider = exports.ai = exports.ALGO_KEY = exports.ENCRYPTION_KEY = exports.NODE_ENV = exports.CREDENTIALS = void 0;
const google_genai_1 = require("@genkit-ai/google-genai");
const dotenv_1 = require("dotenv");
const genkit_1 = require("genkit");
const genkitx_openai_1 = require("genkitx-openai");
const typedi_1 = __importDefault(require("typedi"));
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || "development"}.local` });
(0, dotenv_1.config)();
exports.CREDENTIALS = process.env.CREDENTIALS === "true";
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.ENCRYPTION_KEY = _a.ENCRYPTION_KEY, exports.ALGO_KEY = _a.ALGO_KEY;
exports.ai = (0, genkit_1.genkit)({
    plugins: [(0, google_genai_1.googleAI)(), (0, genkitx_openai_1.openAI)()],
});
const createProvider = (apiKey, provider) => {
    return (0, genkit_1.genkit)({
        plugins: [(0, google_genai_1.googleAI)({ apiKey }), (0, genkitx_openai_1.openAI)({ apiKey })],
        model: provider === "openai" ? genkitx_openai_1.gpt4oMini : "googleai/gemini-2.5-flash",
    });
};
exports.createProvider = createProvider;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "better-sqlite3",
    database: process.env.DATABASE_NAME || "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
});
typedi_1.default.set(typeorm_1.DataSource, exports.AppDataSource);
const initializeDatabase = async (maxRetries = 5, delay = 5000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            if (!exports.AppDataSource.isInitialized) {
                await exports.AppDataSource.initialize();
            }
            console.log("Database connection established");
            return exports.AppDataSource;
        }
        catch (error) {
            console.error(`Connection attempt ${attempt} failed:`, error);
            if (attempt === maxRetries) {
                console.error(`All ${maxRetries} connection attempts failed`);
                throw error;
            }
            console.log(`Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    throw new Error("All connection attempts failed");
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=index.js.map