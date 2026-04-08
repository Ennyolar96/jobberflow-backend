import { Service } from "typedi";
import { createHash } from "crypto";
import { CacheService } from "@/global/services";
import { logger } from "@/global/utils";
import { JobPosting, JobSearchQuery } from "./job.types";
import { fetchRemoteOkJobs } from "./sources/remoteok.source";
import { fetchRemotiveJobs } from "./sources/remotive.source";

export type JobSearchResult = {
  query: JobSearchQuery;
  jobs: JobPosting[];
  newJobs: JobPosting[];
};

@Service()
export class JobSearchAgent {
  constructor(private readonly cache: CacheService) {}

  public async run(query: JobSearchQuery): Promise<JobSearchResult> {
    const normalized: JobSearchQuery = {
      query: query.query?.trim() || "",
      location: query.location?.trim() || undefined,
      limit: query.limit ?? 20,
    };

    const [remoteOk, remotive] = await Promise.allSettled([
      fetchRemoteOkJobs(normalized),
      fetchRemotiveJobs(normalized),
    ]);

    const jobs = [
      ...(remoteOk.status === "fulfilled" ? remoteOk.value : []),
      ...(remotive.status === "fulfilled" ? remotive.value : []),
    ];

    // Dedup by applyUrl (stable) + title/company
    const map = new Map<string, JobPosting>();
    for (const j of jobs) {
      const key = `${j.applyUrl}|${j.title}|${j.company}`.toLowerCase();
      if (!map.has(key)) map.set(key, j);
    }
    const deduped = [...map.values()];

    const newJobs = this.filterNewJobs(deduped, normalized);
    logger.info(
      `JobSearchAgent: found ${deduped.length} jobs, ${newJobs.length} new`,
    );

    return { query: normalized, jobs: deduped, newJobs };
  }

  private filterNewJobs(jobs: JobPosting[], query: JobSearchQuery): JobPosting[] {
    const cacheKey = this.cache.generateKey("job-search-seen", {
      query: query.query,
      location: query.location || "",
    });

    const seen = this.cache.getQuery<Record<string, true>>(cacheKey) || {};
    const fresh: JobPosting[] = [];

    for (const j of jobs) {
      const id = stableJobId(j);
      if (!seen[id]) {
        fresh.push(j);
        seen[id] = true;
      }
    }

    // keep “seen” for 7 days
    this.cache.setQuery(cacheKey, seen, 60 * 60 * 24 * 7);
    return fresh;
  }
}

function stableJobId(job: JobPosting): string {
  const h = createHash("sha256");
  h.update(job.source);
  h.update("|");
  h.update(job.applyUrl);
  h.update("|");
  h.update(job.title);
  h.update("|");
  h.update(job.company);
  return h.digest("hex").slice(0, 32);
}

