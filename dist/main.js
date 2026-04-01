"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const app_module_1 = require("./app.module");
const utils_1 = require("./global/utils");
const http_1 = require("http");
const config_1 = require("./config");
dotenv_1.default.config({ quiet: true });
(0, routing_controllers_1.useContainer)(typedi_1.Container);
async function bootstrap() {
    try {
        await (0, config_1.initializeDatabase)();
        const app = (0, express_1.default)();
        (0, app_module_1.applicationMiddlewares)(app);
        (0, routing_controllers_1.useExpressServer)(app, {
            routePrefix: "/api",
            validation: {
                whitelist: true,
                validationError: { target: false, value: false },
                forbidNonWhitelisted: true,
                enableDebugMessages: true,
                skipMissingProperties: false,
            },
            defaultErrorHandler: false,
            development: process.env.ENVIRONMENT === "development",
            classTransformer: true,
            controllers: [path_1.default.join(__dirname, "app/**/*.controller.{ts,js}")],
            middlewares: [path_1.default.join(__dirname, "global/**/*.middleware.{ts,js}")],
        });
        const server = (0, http_1.createServer)(app);
        typedi_1.Container.set("http.Server", server);
        await (0, utils_1.runModuleInit)();
        const PORT = process.env.PORT || 4005;
        server.listen(PORT, () => {
            utils_1.logger.info(`=================================`);
            utils_1.logger.info(`======= ENV: ${process.env.NODE_ENV} =======`);
            utils_1.logger.info(`🚀 App listening on the port ${PORT}`);
            utils_1.logger.info(`=================================`);
        });
        const gracefulShutdown = async () => {
            console.log("Shutting down gracefully...");
            await (0, utils_1.runModuleDestroy)();
            process.exit(0);
        };
        process.on("SIGINT", gracefulShutdown);
        process.on("SIGTERM", gracefulShutdown);
    }
    catch (error) {
        console.log("Error initializing app", error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map