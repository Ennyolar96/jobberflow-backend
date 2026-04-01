"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyService = void 0;
const services_1 = require("../../global/services");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
const entities_1 = require("./entities");
const config_1 = require("../../config");
let KeyService = class KeyService {
    constructor(securityService, cacheService) {
        this.securityService = securityService;
        this.cacheService = cacheService;
        this.keyRepository = config_1.AppDataSource.getRepository(entities_1.Keys);
    }
    async createkey(payload) {
        try {
            const cacheKey = this.cacheService.generateKey("keys", {
                userId: payload.userId,
            });
            const existingKey = await this.keyRepository.findOne({
                where: { userId: payload.userId },
            });
            this.cacheService.delQuery(cacheKey);
            if (existingKey) {
                const password = await this.securityService.decrypt(existingKey.password, config_1.ENCRYPTION_KEY);
                if (password !== payload.password) {
                    throw new routing_controllers_1.BadRequestError("incorrect credientials");
                }
            }
            const aiProviders = ["openai", "gemini"];
            const encryptionTasks = aiProviders.map(async (field) => {
                const value = payload[field];
                if (value && typeof value === "string") {
                    payload[field] = await this.securityService.encrypt(value, payload.password);
                }
            });
            const [encryptedPassword] = await Promise.all([
                this.securityService.encrypt(payload.password, config_1.ENCRYPTION_KEY),
                ...encryptionTasks,
            ]);
            const key = this.keyRepository.create({
                ...(existingKey || {}),
                ...payload,
                password: encryptedPassword,
            });
            return this.keyRepository.save(key);
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                throw new routing_controllers_1.InternalServerError("Database error occurred while saving keys");
            }
            throw error;
        }
    }
    async getKeys(userId) {
        try {
            const cacheKey = this.cacheService.generateKey("keys", { userId });
            const cachedKeys = this.cacheService.getQuery(cacheKey);
            if (cachedKeys)
                return cachedKeys;
            const key = await this.keyRepository.findOne({
                where: { userId },
            });
            if (!key)
                return { openai: null, gemini: null };
            const password = await this.securityService.decrypt(key.password, config_1.ENCRYPTION_KEY);
            const [openai, gemini] = await Promise.all([
                key.openai
                    ? this.securityService.decrypt(key.openai, password)
                    : Promise.resolve(null),
                key.gemini
                    ? this.securityService.decrypt(key.gemini, password)
                    : Promise.resolve(null),
            ]);
            this.cacheService.setQuery(cacheKey, { openai, gemini });
            return { openai, gemini };
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                throw new routing_controllers_1.InternalServerError("Database error occurred while fetching keys");
            }
            throw error;
        }
    }
    async verifyPassword(userId, password) {
        try {
            const key = await this.keyRepository.findOne({
                where: { userId },
            });
            if (!key)
                return false;
            const decryptedPassword = await this.securityService.decrypt(key.password, config_1.ENCRYPTION_KEY);
            return decryptedPassword === password;
        }
        catch (error) {
            if (error instanceof typeorm_1.TypeORMError) {
                throw new routing_controllers_1.InternalServerError("Database error occurred while verifying password");
            }
            throw error;
        }
    }
};
exports.KeyService = KeyService;
exports.KeyService = KeyService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [services_1.SecurityService,
        services_1.CacheService])
], KeyService);
//# sourceMappingURL=key.service.js.map