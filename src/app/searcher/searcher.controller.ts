import { Body, JsonController, Post } from "routing-controllers";
import { SearchService } from "./search.service";
import { Service } from "typedi";
import { JobSearchQuery } from "./job.types";

@Service()
@JsonController("/searcher")
export class SearcherController {
  constructor(private readonly searchService: SearchService) {}

  @Post("/run")
  public async runOnce(@Body() body: JobSearchQuery) {
    return this.searchService.runOnce(body);
  }
}