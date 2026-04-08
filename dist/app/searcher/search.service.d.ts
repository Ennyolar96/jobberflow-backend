import { JobSearchAgent } from "./job-search.agent";
import { JobSearchQuery } from "./job.types";
export declare class SearchService {
    private readonly agent;
    constructor(agent: JobSearchAgent);
    runOnce(query: JobSearchQuery): Promise<import("./job-search.agent").JobSearchResult>;
}
