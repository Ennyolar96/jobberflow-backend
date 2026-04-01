"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumePrompt = exports.Resume_Rewrite_Prompt = exports.resumeOutputSchema = exports.resumeInputSchema = void 0;
const genkit_1 = require("genkit");
const nanoid_1 = require("nanoid");
exports.resumeInputSchema = genkit_1.z.object({
    userId: genkit_1.z.string().describe("User ID of the candidate"),
    resume: genkit_1.z.string().describe("Resume text of the candidate"),
    jobDescription: genkit_1.z.string().describe("Job description of the role"),
    template: genkit_1.z
        .enum(["modern", "classic", "minimal"])
        .optional()
        .default("modern")
        .describe("Template of the resume"),
    provider: genkit_1.z
        .enum(["openai", "gemini", "auto"])
        .optional()
        .default("auto")
        .describe("The AI provider to use for generation."),
    referenceTemplate: genkit_1.z
        .string()
        .optional()
        .default("")
        .describe("Reference template for the resume"),
});
exports.resumeOutputSchema = genkit_1.z.object({
    response: genkit_1.z.string().describe("Response of the resume"),
});
exports.Resume_Rewrite_Prompt = `
    Act as an elite, ATS-optimized Resume Strategist. Your mission is to transform the provided candidate's resume into a high-impact, professional version tailored specifically for the Job Description provided.

    ### CRITICAL ANALYSIS:
    - **Identify Key Competencies**: Extract the top 5-7 skills/requirements from the Job Description and ensure they are prominently featured in the rewritten resume.
    - **Align Achievements**: Match the candidate's history to the job requirements, emphasizing similar projects, tools, and impacts.
    - **Quantify Impact**: Transform passive job descriptions into achievement-oriented bullet points using metrics, data, and hard numbers (e.g., "Managed $2M budget," "Led a team of 10," "Reduced latency by 40%").

    ### CONTENT STRUCTURE:
    1. **Professional Summary**: A compelling, 3-4 sentence "elevator pitch" highlighting their value proposition for THIS specific role.
    2. **Core Competencies**: A list of key technical and soft skills, prioritized by relevance to the Job Description.
    3. **Professional Experience**: Reverse-chronological history. Start every bullet with a powerful action verb (Spearheaded, Orchestrated, Optimized, etc.).
    4. **Education & Certifications**: Clear and concise entries at the end.

    ### INPUT DATA:
    - **JOB DESCRIPTION**:
    """
    {{jobDescription}}
    """

    - **CANDIDATE'S ORIGINAL RESUME**:
    """
    {{resume}}
    """

    ### FORMATTING & HTML OUTPUT REQUIREMENTS:
    Generate the rewritten resume as a **self-contained, premium HTML document**.
    - **No standard Boilerplate**: DO NOT include <html>, <head>, or <body> tags. Start with a <div class="resume-wrapper">.
    - **Inline CSS Styling**: Include a <style> block at the top of the HTML string to define the layout, fonts (use Google Fonts like Inter, Roboto, or Serif stacks), and colors.
    - **Consistency**: Follow the structural pattern and styling philosophy of the provided REFERENCE TEMPLATE.
    
    ### REFERENCE TEMPLATE:
    Below is a sample of the style and structure you must emulate:
    """
    {{referenceTemplate}}
    """

    ### RESPONSE FORMAT:
    Provide the complete, styled HTML resume content as the "response" property in the output JSON.
    `;
exports.resumePrompt = {
    name: `resume-prompt-${(0, nanoid_1.nanoid)()}`,
    input: { schema: exports.resumeInputSchema },
    output: { schema: exports.resumeOutputSchema },
    prompt: exports.Resume_Rewrite_Prompt,
};
//# sourceMappingURL=resume.genkit.js.map