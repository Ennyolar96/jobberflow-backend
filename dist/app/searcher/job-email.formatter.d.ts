import { JobPosting, JobSearchQuery } from "./job.types";
export declare function formatJobsEmailText(input: {
    query: JobSearchQuery;
    jobs: JobPosting[];
    newJobs: JobPosting[];
}): {
    subject: string;
    text: string;
    html: string;
};
