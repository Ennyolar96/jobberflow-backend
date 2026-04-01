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
exports.WebSocketService = void 0;
exports.interviewRoom = interviewRoom;
exports.userRoom = userRoom;
exports.socketRoom = socketRoom;
const typedi_1 = require("typedi");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const utils_1 = require("../../global/utils");
function interviewRoom(interviewId) {
    return `interview:${interviewId}`;
}
function userRoom(userId) {
    return `user:${userId}`;
}
function socketRoom(socketId) {
    return `socket:${socketId}`;
}
let WebSocketService = class WebSocketService {
    constructor(server) {
        this.server = server;
    }
    onModuleInit() {
        this.io = new socket_io_1.Server(this.server, {
            cors: { origin: "*", methods: ["GET", "POST"] },
            path: "/socket.io",
        });
        this.io.on("connection", (socket) => {
            utils_1.logger.info(`WebSocket Client connected: ${socket.id}`);
            socket.on("join-interview", (interviewId) => {
                const id = interviewId?.trim();
                if (!id)
                    return;
                void socket.join(interviewRoom(id));
                utils_1.logger.info(`Socket ${socket.id} joined ${interviewRoom(id)}`);
            });
            socket.on("join-user", (userId) => {
                const id = userId?.trim();
                if (!id)
                    return;
                void socket.join(userRoom(id));
                utils_1.logger.info(`Socket ${socket.id} joined ${userRoom(id)}`);
            });
            socket.on("disconnect", () => {
                utils_1.logger.info(`WebSocket Client disconnected: ${socket.id}`);
            });
        });
        utils_1.logger.info("WebSocketService initialized");
    }
    onModuleDestroy() {
        if (this.io) {
            this.io.close();
            utils_1.logger.info("WebSocketService destroyed");
        }
    }
    emit(event, data) {
        if (!this.io) {
            utils_1.logger.error("WebSocketService is not initialized but emit was called.");
            return;
        }
        this.io.emit(event, data);
    }
    emitToRoom(room, event, data) {
        if (!this.io) {
            utils_1.logger.error("WSService is not initialized but emitToRoom was called.");
            return;
        }
        this.io.to(room).emit(event, data);
    }
    emitToSocket(socketId, event, data) {
        if (!this.io) {
            utils_1.logger.error("WSService is not initialized but emitToSocket was called.");
            return;
        }
        this.io.to(socketId).emit(event, data);
    }
    emitToUser(userId, event, data) {
        this.emitToRoom(userRoom(userId), event, data);
    }
    getAllSocketIds() {
        if (!this.io)
            return [];
        return Array.from(this.io.sockets.sockets.keys());
    }
    async getUserSocketIds(userId) {
        if (!this.io)
            return [];
        const sockets = await this.io.in(userRoom(userId)).fetchSockets();
        return sockets.map((s) => s.id);
    }
    getIo() {
        return this.io;
    }
};
exports.WebSocketService = WebSocketService;
exports.WebSocketService = WebSocketService = __decorate([
    (0, typedi_1.Service)(),
    (0, utils_1.Lifecycle)(),
    __param(0, (0, typedi_1.Inject)("http.Server")),
    __metadata("design:paramtypes", [http_1.Server])
], WebSocketService);
//# sourceMappingURL=websocket.service.js.map