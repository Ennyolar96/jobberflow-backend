import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import hpp from "hpp";
import os from "os";
import rateLimit from "express-rate-limit";
import { logger } from "@/global/utils";
let compression = require("compression");

export const applicationMiddlewares = (app: Application) => {
  const corsSettings = cors({
    origin: "*",
    credentials: true,
  });

  const imageRenderSettings = express.static("images", {
    setHeaders(res: Response) {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
      res.set("Access-Control-Allow-Origin", "*");
    },
  });

  app.set("trust proxy", 1);
  app.use(hpp());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    }),
  );
  app.use(corsSettings);
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.disable("x-powered-by");
  app.use("/images", imageRenderSettings);
  app.use((req: Request, res: Response, next: NextFunction) => {
    const isDev = process.env.NODE_ENV === "development";
    console.log(
      `Incoming Request: ${req.method} ${req.url} ${os.platform()} ${req.ip}`,
    );

    if (!isDev) {
      const xfProto = (req.headers["x-forwarded-proto"] || "") as string;
      const isForwardedSecure = xfProto.split(",")[0]?.trim() === "https";
      const isSecure = req.secure || isForwardedSecure;

      const host = req.hostname;
      const approve = ["localhost", "127.0.0.1", "::1"];
      const isLocal = approve.includes(host);

      if (!isSecure && !isLocal) {
        return res.redirect(
          301,
          `https://${req.headers.host}${req.originalUrl}`,
        );
      }
    }

    next();
  });
  app.use((req, res, next) => {
    logger.info(`[${req.method}] ${req.path}`);
    next();
  });

  // Rate Limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  app.use(limiter);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    });
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Welcome");
  });
};
