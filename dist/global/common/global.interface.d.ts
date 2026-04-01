export type uploadFile = Express.Multer.File;
declare global {
    namespace Express {
        interface Request {
            rawBody?: Buffer;
        }
    }
}
export declare const loadAny: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const loadSingle: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export interface IBaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
