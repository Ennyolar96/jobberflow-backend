"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSingle = exports.loadAny = void 0;
const middlewares_1 = require("../middlewares");
exports.loadAny = middlewares_1.upload.any();
exports.loadSingle = middlewares_1.upload.single("file");
//# sourceMappingURL=global.interface.js.map