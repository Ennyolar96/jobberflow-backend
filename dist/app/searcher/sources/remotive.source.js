"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRemotiveJobs = fetchRemotiveJobs;
async function fetchRemotiveJobs(input) {
    const query = input.query?.trim() || "";
    const url = new URL("https://remotive.com/api/remote-jobs");
    if (query)
        url.searchParams.set("search", query);
    const res = await fetch(url.toString(), {
        headers: { "User-Agent": "jobberflow/1.0 (+https://example.local)" },
    });
    if (!res.ok)
        return [];
    const data = (await res.json());
    const jobs = (data.jobs || []).filter((j) => j?.title && j?.company_name);
    const limit = Math.max(1, Math.min(input.limit ?? 20, 50));
    return jobs.slice(0, limit).map((j) => ({
        source: "remotive",
        title: j.title,
        company: j.company_name,
        location: j.candidate_required_location,
        postedAt: j.publication_date,
        description: j.description,
        tags: j.tags || [j.category, j.job_type].filter(Boolean),
        salary: j.salary,
        jobUrl: j.url,
        applyUrl: j.url,
    }));
}
//# sourceMappingURL=remotive.source.js.map