import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { applicationMiddlewares } from "./app.module";
import { logger, runModuleDestroy, runModuleInit } from "./global/utils";
import { createServer } from "http";
import { initializeDatabase } from "./config";

// Ensure scheduled/background services are registered (Lifecycle decorators run on import).
import "@/app/searcher/job-scheduler.service";

dotenv.config({ quiet: true });
useContainer(Container);

async function bootstrap() {
  try {
    await initializeDatabase();

    const app: Application = express();
    applicationMiddlewares(app);

    // Create express app with routing-controllers
    useExpressServer(app, {
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
      controllers: [path.join(__dirname, "app/**/*.controller.{ts,js}")],
      middlewares: [path.join(__dirname, "global/**/*.middleware.{ts,js}")],
    });

    // Explicitly create server so we can register it for WebSocket DI
    const server = createServer(app);
    Container.set("http.Server", server);

    await runModuleInit();

    const PORT = process.env.PORT || 4005;
    server.listen(PORT, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${process.env.NODE_ENV} =======`);
      logger.info(`🚀 App listening on the port ${PORT}`);
      logger.info(`=================================`);
    });

    const gracefulShutdown = async () => {
      console.log("Shutting down gracefully...");
      await runModuleDestroy();
      process.exit(0);
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  } catch (error) {
    console.log("Error initializing app", error);
  }
}

bootstrap();
