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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const key_service_1 = require("./key.service");
let KeyController = class KeyController {
    constructor(keyService) {
        this.keyService = keyService;
    }
    async createKey(input) {
        return this.keyService.createkey(input);
    }
    async getKeys(userId) {
        return this.keyService.getKeys(userId);
    }
    async verifyPassword(input) {
        return this.keyService.verifyPassword(input.userId, input.password);
    }
};
exports.KeyController = KeyController;
__decorate([
    (0, routing_controllers_1.Post)("key"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.CreateKey]),
    __metadata("design:returntype", Promise)
], KeyController.prototype, "createKey", null);
__decorate([
    (0, routing_controllers_1.Get)("key/:userId"),
    __param(0, (0, routing_controllers_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KeyController.prototype, "getKeys", null);
__decorate([
    (0, routing_controllers_1.Post)("key/verify"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.VerifyPassword]),
    __metadata("design:returntype", Promise)
], KeyController.prototype, "verifyPassword", null);
exports.KeyController = KeyController = __decorate([
    (0, routing_controllers_1.Controller)("/"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [key_service_1.KeyService])
], KeyController);
//# sourceMappingURL=key.controller.js.map