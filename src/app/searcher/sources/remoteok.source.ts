import { JobPosting, JobSearchQuery } from "../job.types";

type RemoteOkApiJob = {
  id?: number;
  position?: string;
  company?: string;
  location?: string;
  tags?: string[];
  salary?: string;
  date?: string;
  description?: string;
  url?: string;
  apply_url?: string;
};

export async function fetchRemoteOkJobs(
  input: JobSearchQuery,
): Promise<JobPosting[]> {
  const res = await fetch("https://remoteok.com/api", {
    headers: { "User-Agent": "jobberflow/1.0 (+https://example.local)" },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as any[];

  // first item is metadata
  const jobs = data
    .slice(1)
    .filter(Boolean)
    .map((j) => j as RemoteOkApiJob)
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
    title: j.position!,
    company: j.company!,
    location: j.location,
    postedAt: j.date,
    description: j.description,
    tags: j.tags || [],
    salary: j.salary,
    jobUrl: j.url,
    applyUrl: j.apply_url || j.url!,
  }));
}

