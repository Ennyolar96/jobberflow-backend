import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { OnModuleInit, OnModuleDestroy } from "../../global/utils";
export declare function interviewRoom(interviewId: string): string;
export declare function userRoom(userId: string): string;
export declare function socketRoom(socketId: string): string;
export declare class WebSocketService implements OnModuleInit, OnModuleDestroy {
    private readonly server;
    private io;
    constructor(server: HttpServer);
    onModuleInit(): void;
    onModuleDestroy(): void;
    emit(event: string, data: unknown): void;
    emitToRoom(room: string, event: string, data: unknown): void;
    emitToSocket(socketId: string, event: string, data: unknown): void;
    emitToUser(userId: string, event: string, data: unknown): void;
    getAllSocketIds(): string[];
    getUserSocketIds(userId: string): Promise<string[]>;
    getIo(): SocketIOServer;
}
