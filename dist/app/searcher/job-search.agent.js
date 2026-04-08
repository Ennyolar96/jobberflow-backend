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
exports.JobSearchAgent = void 0;
const typedi_1 = require("typedi");
const crypto_1 = require("crypto");
const services_1 = require("../../global/services");
const utils_1 = require("../../global/utils");
const remoteok_source_1 = require("./sources/remoteok.source");
const remotive_source_1 = require("./sources/remotive.source");
let JobSearchAgent = class JobSearchAgent {
    constructor(cache) {
        this.cache = cache;
    }
    async run(query) {
        const normalized = {
            query: query.query?.trim() || "",
            location: query.location?.trim() || undefined,
            limit: query.limit ?? 20,
        };
        const [remoteOk, remotive] = await Promise.allSettled([
            (0, remoteok_source_1.fetchRemoteOkJobs)(normalized),
            (0, remotive_source_1.fetchRemotiveJobs)(normalized),
        ]);
        const jobs = [
            ...(remoteOk.status === "fulfilled" ? remoteOk.value : []),
            ...(remotive.status === "fulfilled" ? remotive.value : []),
        ];
        const map = new Map();
        for (const j of jobs) {
            const key = `${j.applyUrl}|${j.title}|${j.company}`.toLowerCase();
            if (!map.has(key))
                map.set(key, j);
        }
        const deduped = [...map.values()];
        const newJobs = this.filterNewJobs(deduped, normalized);
        utils_1.logger.info(`JobSearchAgent: found ${deduped.length} jobs, ${newJobs.length} new`);
        return { query: normalized, jobs: deduped, newJobs };
    }
    filterNewJobs(jobs, query) {
        const cacheKey = this.cache.generateKey("job-search-seen", {
            query: query.query,
            location: query.location || "",
        });
        const seen = this.cache.getQuery(cacheKey) || {};
        const fresh = [];
        for (const j of jobs) {
            const id = stableJobId(j);
            if (!seen[id]) {
                fresh.push(j);
                seen[id] = true;
            }
        }
        this.cache.setQuery(cacheKey, seen, 60 * 60 * 24 * 7);
        return fresh;
    }
};
exports.JobSearchAgent = JobSearchAgent;
exports.JobSearchAgent = JobSearchAgent = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [services_1.CacheService])
], JobSearchAgent);
function stableJobId(job) {
    const h = (0, crypto_1.createHash)("sha256");
    h.update(job.source);
    h.update("|");
    h.update(job.applyUrl);
    h.update("|");
    h.update(job.title);
    h.update("|");
    h.update(job.company);
    return h.digest("hex").slice(0, 32);
}
//# sourceMappingURL=job-search.agent.js.map