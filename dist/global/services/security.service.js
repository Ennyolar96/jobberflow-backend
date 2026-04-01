"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const config_1 = require("../../config");
const crypto_1 = require("crypto");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const util_1 = require("util");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let SecurityService = class SecurityService {
    async deriveKeys(salt, password) {
        const keyMaterial = await scrypt(password, salt, 64);
        return {
            encKey: keyMaterial.subarray(0, 32),
            macKey: keyMaterial.subarray(32, 64),
        };
    }
    async encrypt(plaintext, password) {
        const salt = (0, crypto_1.randomBytes)(16);
        const iv = (0, crypto_1.randomBytes)(16);
        const { encKey, macKey } = await this.deriveKeys(salt, password);
        const cipher = (0, crypto_1.createCipheriv)(config_1.ALGO_KEY, encKey, iv);
        const ciphertext = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final(),
        ]);
        const mac = (0, crypto_1.createHmac)("sha256", macKey)
            .update(salt)
            .update(iv)
            .update(ciphertext)
            .digest();
        return Buffer.concat([salt, iv, ciphertext, mac]).toString("hex");
    }
    async decrypt(payloadHex, password) {
        const buf = Buffer.from(payloadHex, "hex");
        if (buf.length < 16 + 16 + 32) {
            throw new routing_controllers_1.ForbiddenError("Ciphertext too short");
        }
        const salt = buf.subarray(0, 16);
        const iv = buf.subarray(16, 32);
        const mac = buf.subarray(buf.length - 32);
        const ciphertext = buf.subarray(32, buf.length - 32);
        const { encKey, macKey } = await this.deriveKeys(salt, password);
        const expectedMac = (0, crypto_1.createHmac)("sha256", macKey)
            .update(salt)
            .update(iv)
            .update(ciphertext)
            .digest();
        if (expectedMac.length !== mac.length ||
            !(0, crypto_1.timingSafeEqual)(expectedMac, mac)) {
            throw new routing_controllers_1.ForbiddenError("Authentication failed (MAC mismatch)");
        }
        const decipher = (0, crypto_1.createDecipheriv)(config_1.ALGO_KEY, encKey, iv);
        const plaintext = Buffer.concat([
            decipher.update(ciphertext),
            decipher.final(),
        ]);
        return plaintext.toString("utf8");
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, typedi_1.Service)()
], SecurityService);
//# sourceMappingURL=security.service.js.map