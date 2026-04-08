import { SearchService } from "./search.service";
import { JobSearchQuery } from "./job.types";
export declare class SearcherController {
    private readonly searchService;
    constructor(searchService: SearchService);
    runOnce(body: JobSearchQuery): Promise<import("./job-search.agent").JobSearchResult>;
}
