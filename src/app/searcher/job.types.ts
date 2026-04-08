export type JobPosting = {
  source: string;
  title: string;
  company: string;
  location?: string;
  postedAt?: string;
  description?: string;
  tags?: string[];
  salary?: string;
  applyUrl: string;
  jobUrl?: string;
};

export type JobSearchQuery = {
  /** Keyword query, e.g. "node", "backend", "devops". */
  query: string;
  /** Optional filters some sources may use. */
  location?: string;
  limit?: number;
};

