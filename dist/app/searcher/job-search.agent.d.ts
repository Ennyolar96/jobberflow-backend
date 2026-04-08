import { CacheService } from "../../global/services";
import { JobPosting, JobSearchQuery } from "./job.types";
export type JobSearchResult = {
    query: JobSearchQuery;
    jobs: JobPosting[];
    newJobs: JobPosting[];
};
export declare class JobSearchAgent {
    private readonly cache;
    constructor(cache: CacheService);
    run(query: JobSearchQuery): Promise<JobSearchResult>;
    private filterNewJobs;
}
