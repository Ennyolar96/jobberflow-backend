import { Service } from "typedi";
import { JobSearchAgent } from "./job-search.agent";
import { JobSearchQuery } from "./job.types";

@Service()
export class SearchService {
  constructor(private readonly agent: JobSearchAgent) {}

  public async runOnce(query: JobSearchQuery) {
    return this.agent.run(query);
  }
}