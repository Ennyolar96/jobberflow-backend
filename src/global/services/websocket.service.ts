import { Service, Inject } from "typedi";
import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import {
  Lifecycle,
  logger,
  OnModuleInit,
  OnModuleDestroy,
} from "@/global/utils";

/** Room for interview transcript / progress streams: `interview:{interviewId}` */
export function interviewRoom(interviewId: string): string {
  return `interview:${interviewId}`;
}

/** Room for a logged-in user (all tabs): `user:{userId}` */
export function userRoom(userId: string): string {
  return `user:${userId}`;
}

/** Room for reaching a specific individual connection: `socket:${socketId}` */
export function socketRoom(socketId: string): string {
  return `socket:${socketId}`;
}

@Service()
@Lifecycle()
export class WebSocketService implements OnModuleInit, OnModuleDestroy {
  private io!: SocketIOServer;

  constructor(@Inject("http.Server") private readonly server: HttpServer) {}

  public onModuleInit(): void {
    this.io = new SocketIOServer(this.server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
      path: "/socket.io",
    });

    this.io.on("connection", (socket) => {
      logger.info(`WebSocket Client connected: ${socket.id}`);

      socket.on("join-interview", (interviewId?: string) => {
        const id = interviewId?.trim();
        if (!id) return;
        void socket.join(interviewRoom(id));
        logger.info(`Socket ${socket.id} joined ${interviewRoom(id)}`);
      });

      socket.on("join-user", (userId: string) => {
        const id = userId?.trim();
        if (!id) return;
        void socket.join(userRoom(id));
        logger.info(`Socket ${socket.id} joined ${userRoom(id)}`);
      });

      socket.on("disconnect", () => {
        logger.info(`WebSocket Client disconnected: ${socket.id}`);
      });
    });

    logger.info("WebSocketService initialized");
  }

  public onModuleDestroy(): void {
    if (this.io) {
      this.io.close();
      logger.info("WebSocketService destroyed");
    }
  }

  /** Broadcast to every connected client. */
  public emit(event: string, data: unknown): void {
    if (!this.io) {
      logger.error("WebSocketService is not initialized but emit was called.");
      return;
    }
    this.io.emit(event, data);
  }

  /** Deliver to everyone in a Socket.IO room (e.g. interview or user room). */
  public emitToRoom(room: string, event: string, data: unknown): void {
    if (!this.io) {
      logger.error("WSService is not initialized but emitToRoom was called.");
      return;
    }
    this.io.to(room).emit(event, data);
  }

  /** One-to-one: a single connection by Socket.IO socket id. */
  public emitToSocket(socketId: string, event: string, data: unknown): void {
    if (!this.io) {
      logger.error("WSService is not initialized but emitToSocket was called.");
      return;
    }
    this.io.to(socketId).emit(event, data);
  }

  /** One-to-one (by user id): all connections that called `join-user` with this id. */
  public emitToUser(userId: string, event: string, data: unknown): void {
    this.emitToRoom(userRoom(userId), event, data);
  }

  /** Returns a list of all currently connected socket IDs. */
  public getAllSocketIds(): string[] {
    if (!this.io) return [];
    return Array.from(this.io.sockets.sockets.keys());
  }

  /** Gets all socket IDs for a specific user (all their active tabs/devices). */
  public async getUserSocketIds(userId: string): Promise<string[]> {
    if (!this.io) return [];
    const sockets = await this.io.in(userRoom(userId)).fetchSockets();
    return sockets.map((s) => s.id);
  }

  public getIo(): SocketIOServer {
    return this.io;
  }
}
