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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSession = exports.MAX_INTERVIEW_TURNS = void 0;
const common_1 = require("../../../global/common");
const typeorm_1 = require("typeorm");
exports.MAX_INTERVIEW_TURNS = 20;
let InterviewSession = class InterviewSession extends common_1.BaseEntity {
    getTurns() {
        try {
            return JSON.parse(this.turns);
        }
        catch {
            return [];
        }
    }
    setTurns(turns) {
        const capped = turns.slice(-exports.MAX_INTERVIEW_TURNS);
        this.turns = JSON.stringify(capped);
    }
    toHistoryString() {
        return this.getTurns()
            .map((t) => `${t.speaker}: ${t.text}`)
            .join("\n")
            .concat(this.getTurns().length > 0 ? "\n" : "");
    }
};
exports.InterviewSession = InterviewSession;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], InterviewSession.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", default: "[]" }),
    __metadata("design:type", String)
], InterviewSession.prototype, "turns", void 0);
exports.InterviewSession = InterviewSession = __decorate([
    (0, typeorm_1.Entity)("interview_sessions")
], InterviewSession);
//# sourceMappingURL=interview-session.entity.js.map