import multer from "multer";
import { UnprocessableEntityError } from "routing-controllers";

const storage = multer.memoryStorage();

const ALLOWED_MIME = [
  ".wav",
  "audio/wav",
  "audio/m4a",
  "audio/x-m4a",
  "audio/mp4",
  "audio/mpeg",
  "audio/3gpp",
  "audio/webm",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true); // accept
  } else {
    cb(
      new UnprocessableEntityError(
        "Invalid file type. Only WAV, M4A, MP4, MP3, 3GP, DOCX, DOC, or PDF are allowed",
      ),
    ); // reject
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
