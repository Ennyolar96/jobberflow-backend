"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJobsEmailText = formatJobsEmailText;
function formatJobsEmailText(input) {
    const { query, newJobs, jobs } = input;
    const subject = `Job digest: ${query.query} (${newJobs.length} new / ${jobs.length} total)`;
    const lines = [];
    lines.push(`Query: ${query.query}`);
    if (query.location)
        lines.push(`Location: ${query.location}`);
    lines.push("");
    lines.push(`New jobs: ${newJobs.length}`);
    lines.push("");
    for (const j of newJobs) {
        lines.push(`${j.title} — ${j.company}${j.location ? ` (${j.location})` : ""}`);
        lines.push(`Source: ${j.source}`);
        if (j.salary)
            lines.push(`Salary: ${j.salary}`);
        if (j.tags?.length)
            lines.push(`Tags: ${j.tags.join(", ")}`);
        lines.push(`Apply: ${j.applyUrl}`);
        if (j.jobUrl && j.jobUrl !== j.applyUrl)
            lines.push(`Job: ${j.jobUrl}`);
        lines.push("");
    }
    const htmlItems = newJobs
        .map((j) => {
        const meta = [];
        if (j.location)
            meta.push(escapeHtml(j.location));
        if (j.salary)
            meta.push(escapeHtml(j.salary));
        if (j.tags?.length)
            meta.push(escapeHtml(j.tags.join(", ")));
        return `
        <div style="padding:12px 0;border-bottom:1px solid #eee">
          <div style="font-size:16px;font-weight:600">${escapeHtml(j.title)}</div>
          <div style="color:#333">${escapeHtml(j.company)}${meta.length ? ` • <span style="color:#666">${meta.join(" • ")}</span>` : ""}</div>
          <div style="margin-top:6px">
            <a href="${escapeAttr(j.applyUrl)}">Apply link</a>
            ${j.jobUrl && j.jobUrl !== j.applyUrl ? ` • <a href="${escapeAttr(j.jobUrl)}">Job page</a>` : ""}
            • <span style="color:#888">source: ${escapeHtml(j.source)}</span>
          </div>
        </div>
      `;
    })
        .join("");
    const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:720px;margin:0 auto">
      <h2 style="margin:0 0 8px">Job digest</h2>
      <div style="color:#444;margin:0 0 16px">Query: <b>${escapeHtml(query.query)}</b>${query.location ? ` • Location: <b>${escapeHtml(query.location)}</b>` : ""}</div>
      <div style="color:#444;margin:0 0 16px"><b>${newJobs.length}</b> new jobs found (${jobs.length} total scanned).</div>
      ${htmlItems || "<div>No new jobs this run.</div>"}
    </div>
  `.trim();
    return { subject, text: lines.join("\n").trim(), html };
}
function escapeHtml(s) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
function escapeAttr(s) {
    return escapeHtml(s);
}
//# sourceMappingURL=job-email.formatter.js.map