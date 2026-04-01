"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const routing_controllers_1 = require("routing-controllers");
const storage = multer_1.default.memoryStorage();
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
const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new routing_controllers_1.UnprocessableEntityError("Invalid file type. Only WAV, M4A, MP4, MP3, 3GP, DOCX, DOC, or PDF are allowed"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});
//# sourceMappingURL=upload.middleware.js.map