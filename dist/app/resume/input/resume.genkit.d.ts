import { z } from "genkit";
export declare const resumeInputSchema: z.ZodObject<{
    userId: z.ZodString;
    resume: z.ZodString;
    jobDescription: z.ZodString;
    template: z.ZodDefault<z.ZodOptional<z.ZodEnum<["modern", "classic", "minimal"]>>>;
    provider: z.ZodDefault<z.ZodOptional<z.ZodEnum<["openai", "gemini", "auto"]>>>;
    referenceTemplate: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    resume?: string;
    userId?: string;
    jobDescription?: string;
    provider?: "openai" | "gemini" | "auto";
    referenceTemplate?: string;
    template?: "modern" | "classic" | "minimal";
}, {
    resume?: string;
    userId?: string;
    jobDescription?: string;
    provider?: "openai" | "gemini" | "auto";
    referenceTemplate?: string;
    template?: "modern" | "classic" | "minimal";
}>;
export type ResumeInput = z.infer<typeof resumeInputSchema>;
export declare const resumeOutputSchema: z.ZodObject<{
    response: z.ZodString;
}, "strip", z.ZodTypeAny, {
    response?: string;
}, {
    response?: string;
}>;
export type ResumeOutput = z.infer<typeof resumeOutputSchema>;
export declare const Resume_Rewrite_Prompt = "\n    Act as an elite, ATS-optimized Resume Strategist. Your mission is to transform the provided candidate's resume into a high-impact, professional version tailored specifically for the Job Description provided.\n\n    ### CRITICAL ANALYSIS:\n    - **Identify Key Competencies**: Extract the top 5-7 skills/requirements from the Job Description and ensure they are prominently featured in the rewritten resume.\n    - **Align Achievements**: Match the candidate's history to the job requirements, emphasizing similar projects, tools, and impacts.\n    - **Quantify Impact**: Transform passive job descriptions into achievement-oriented bullet points using metrics, data, and hard numbers (e.g., \"Managed $2M budget,\" \"Led a team of 10,\" \"Reduced latency by 40%\").\n\n    ### CONTENT STRUCTURE:\n    1. **Professional Summary**: A compelling, 3-4 sentence \"elevator pitch\" highlighting their value proposition for THIS specific role.\n    2. **Core Competencies**: A list of key technical and soft skills, prioritized by relevance to the Job Description.\n    3. **Professional Experience**: Reverse-chronological history. Start every bullet with a powerful action verb (Spearheaded, Orchestrated, Optimized, etc.).\n    4. **Education & Certifications**: Clear and concise entries at the end.\n\n    ### INPUT DATA:\n    - **JOB DESCRIPTION**:\n    \"\"\"\n    {{jobDescription}}\n    \"\"\"\n\n    - **CANDIDATE'S ORIGINAL RESUME**:\n    \"\"\"\n    {{resume}}\n    \"\"\"\n\n    ### FORMATTING & HTML OUTPUT REQUIREMENTS:\n    Generate the rewritten resume as a **self-contained, premium HTML document**.\n    - **No standard Boilerplate**: DO NOT include <html>, <head>, or <body> tags. Start with a <div class=\"resume-wrapper\">.\n    - **Inline CSS Styling**: Include a <style> block at the top of the HTML string to define the layout, fonts (use Google Fonts like Inter, Roboto, or Serif stacks), and colors.\n    - **Consistency**: Follow the structural pattern and styling philosophy of the provided REFERENCE TEMPLATE.\n    \n    ### REFERENCE TEMPLATE:\n    Below is a sample of the style and structure you must emulate:\n    \"\"\"\n    {{referenceTemplate}}\n    \"\"\"\n\n    ### RESPONSE FORMAT:\n    Provide the complete, styled HTML resume content as the \"response\" property in the output JSON.\n    ";
export declare const resumePrompt: {
    name: string;
    input: {
        schema: z.ZodObject<{
            userId: z.ZodString;
            resume: z.ZodString;
            jobDescription: z.ZodString;
            template: z.ZodDefault<z.ZodOptional<z.ZodEnum<["modern", "classic", "minimal"]>>>;
            provider: z.ZodDefault<z.ZodOptional<z.ZodEnum<["openai", "gemini", "auto"]>>>;
            referenceTemplate: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            resume?: string;
            userId?: string;
            jobDescription?: string;
            provider?: "openai" | "gemini" | "auto";
            referenceTemplate?: string;
            template?: "modern" | "classic" | "minimal";
        }, {
            resume?: string;
            userId?: string;
            jobDescription?: string;
            provider?: "openai" | "gemini" | "auto";
            referenceTemplate?: string;
            template?: "modern" | "classic" | "minimal";
        }>;
    };
    output: {
        schema: z.ZodObject<{
            response: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            response?: string;
        }, {
            response?: string;
        }>;
    };
    prompt: string;
};
