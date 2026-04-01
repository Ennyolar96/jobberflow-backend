import {} from "multer";
import { upload } from "../middlewares";

export type uploadFile = Express.Multer.File;

declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
    }
  }
}

export const loadAny = upload.any();
export const loadSingle = upload.single("file");

export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
