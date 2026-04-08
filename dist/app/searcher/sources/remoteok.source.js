"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRemoteOkJobs = fetchRemoteOkJobs;
async function fetchRemoteOkJobs(input) {
    const res = await fetch("https://remoteok.com/api", {
        headers: { "User-Agent": "jobberflow/1.0 (+https://example.local)" },
    });
    if (!res.ok)
        return [];
    const data = (await res.json());
    const jobs = data
        .slice(1)
        .filter(Boolean)
        .map((j) => j)
        .filter((j) => j.position && j.company && (j.url || j.apply_url));
    const q = input.query.trim().toLowerCase();
    const filtered = q
        ? jobs.filter((j) => {
            const hay = `${j.position} ${j.company} ${(j.tags || []).join(" ")}`.toLowerCase();
            return hay.includes(q);
        })
        : jobs;
    const limit = Math.max(1, Math.min(input.limit ?? 20, 50));
    return filtered.slice(0, limit).map((j) => ({
        source: "remoteok",
        title: j.position,
        company: j.company,
        location: j.location,
        postedAt: j.date,
        description: j.description,
        tags: j.tags || [],
        salary: j.salary,
        jobUrl: j.url,
        applyUrl: j.apply_url || j.url,
    }));
}
//# sourceMappingURL=remoteok.source.js.map