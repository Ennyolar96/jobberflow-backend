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
    query: string;
    location?: string;
    limit?: number;
};
