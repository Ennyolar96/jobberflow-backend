"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMiddlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const os_1 = __importDefault(require("os"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const utils_1 = require("./global/utils");
let compression = require("compression");
const applicationMiddlewares = (app) => {
    const corsSettings = (0, cors_1.default)({
        origin: "*",
        credentials: true,
    });
    const imageRenderSettings = express_1.default.static("images", {
        setHeaders(res) {
            res.set("Cross-Origin-Resource-Policy", "cross-origin");
            res.set("Access-Control-Allow-Origin", "*");
        },
    });
    app.set("trust proxy", 1);
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)({
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
    }));
    app.use(corsSettings);
    app.use(compression());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.disable("x-powered-by");
    app.use("/images", imageRenderSettings);
    app.use((req, res, next) => {
        const isDev = process.env.NODE_ENV === "development";
        console.log(`Incoming Request: ${req.method} ${req.url} ${os_1.default.platform()} ${req.ip}`);
        if (!isDev) {
            const xfProto = (req.headers["x-forwarded-proto"] || "");
            const isForwardedSecure = xfProto.split(",")[0]?.trim() === "https";
            const isSecure = req.secure || isForwardedSecure;
            const host = req.hostname;
            const approve = ["localhost", "127.0.0.1", "::1"];
            const isLocal = approve.includes(host);
            if (!isSecure && !isLocal) {
                return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
            }
        }
        next();
    });
    app.use((req, res, next) => {
        utils_1.logger.info(`[${req.method}] ${req.path}`);
        next();
    });
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, please try again later.",
    });
    app.use(limiter);
    app.get("/health", (req, res) => {
        res.status(200).json({
            status: "OK",
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
        });
    });
    app.get("/", (req, res) => {
        res.send("Hello, Welcome");
    });
};
exports.applicationMiddlewares = applicationMiddlewares;
//# sourceMappingURL=app.module.js.map