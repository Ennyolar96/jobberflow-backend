"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewPrompt = exports.assistancePrompt = exports.assistanceOutputSchema = exports.assistanceInputSchema = void 0;
const genkit_1 = require("genkit");
const nanoid_1 = require("nanoid");
exports.assistanceInputSchema = genkit_1.z.object({
    userId: genkit_1.z.string().describe("User ID of the candidate"),
    transcript: genkit_1.z.string().describe("Transcript of the assistance"),
    history: genkit_1.z
        .string()
        .optional()
        .default("")
        .describe("Full conversation history fetched from DB and injected server-side"),
    cvText: genkit_1.z.string().describe("CV text of the candidate"),
    jobDescription: genkit_1.z.string().describe("Job description of the role"),
    role: genkit_1.z.string().describe("Role of the candidate"),
    company: genkit_1.z.string().describe("Company of the candidate"),
    tone: genkit_1.z
        .enum(["confident", "hunble", "assertive"])
        .describe("Tone of the assistance"),
    provider: genkit_1.z
        .enum(["openai", "gemini", "auto"])
        .optional()
        .default("auto")
        .describe("The AI provider to use for generation."),
});
exports.assistanceOutputSchema = genkit_1.z.object({
    response: genkit_1.z.string().describe("Response of the assistance"),
});
const assistancePromptText = (input) => `
You are a professional Assistant and Career Coach.
Your goal is to support a candidate interviewing for the role of "${input.role}" at "${input.company}" by suggesting the most effective and personalized response to the interviewer's latest question or statement.

INTERVIEWER'S QUESTION/STATEMENT:
"${input.transcript}"

ROLE CONTEXT (Job Description):
"${input.jobDescription}"

CANDIDATE BACKGROUND (CV Content):
"${input.cvText}"

TARGET TONE:
${input.tone}

YOUR TASK:
Generate a high-impact, conversational response that the candidate can use to answer the interviewer.

STRATEGY:
1) Relevance: Map the candidate's specific skills and experiences from their CV directly to the needs outlined in the Job Description.
2) Evidence-Based: Use concrete examples, metrics, or projects from the CV to demonstrate competency.
3) STAR Method: Where appropriate, structure the answer to describe the Situation, Task, Action, and Result.
4) Tone Alignment: Ensure the response sounds ${input.tone}.
5) Authenticity: Make the answer sound natural and spoken, not like a read-out-loud essay.

CONSTRAINTS:
- Provide ONLY the text the candidate should say.
- Do not add any prefixes (e.g., "Candidate:", "Response:", "Interviewer:").
- Keep it concise (approx. 2-4 sentences) so it remains conversational and engaging.
- If the interviewer's statement was a greeting or simple remark, provide a professional and polite acknowledgment that steers the conversation toward the candidate's value proposition.
`.trim();
exports.assistancePrompt = {
    name: `assistance-prompt-${(0, nanoid_1.nanoid)()}`,
    input: { schema: exports.assistanceInputSchema },
    output: { schema: exports.assistanceOutputSchema },
    prompt: (input) => [{ text: assistancePromptText(input) }],
};
const interviewPromptText = (input) => `
You are the interviewer conducting a realistic mock interview for the role of "${input.role}" at "${input.company}".

ROLE DESCRIPTION:
"${input.jobDescription}"

CANDIDATE CV:
"${input.cvText}"

CONVERSATION HISTORY (plain text; may be empty or JSON-looking):
<history>
${input.history ?? ""}
</history>

CANDIDATE'S LATEST RESPONSE:
"${input.transcript}"

TARGET TONE: ${input.tone}

INSTRUCTIONS:
- If history indicates this is the FIRST turn, greet warmly, introduce yourself as the interviewer, and ask the first relevant question. Do NOT provide a RATING or FEEDBACK.
- Otherwise: provide (1) RATING (1-10), (2) brief FEEDBACK, (3) NEXT QUESTION. Never repeat a question already present in the conversation history.
- If the candidate asks for help instead of answering: give a short coaching tip, then ask a relevant question.

OUTPUT FORMAT (exact headings):
RATING: <score>/10
FEEDBACK: <text>
NEXT QUESTION: <question>
`.trim();
exports.interviewPrompt = {
    name: `interview-prompt-${(0, nanoid_1.nanoid)()}`,
    input: { schema: exports.assistanceInputSchema },
    output: { schema: exports.assistanceOutputSchema },
    prompt: (input) => [{ text: interviewPromptText(input) }],
};
//# sourceMappingURL=interview.genkit.js.map