import { z } from "genkit";
export declare const assistanceInputSchema: z.ZodObject<{
    userId: z.ZodString;
    transcript: z.ZodString;
    history: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    cvText: z.ZodString;
    jobDescription: z.ZodString;
    role: z.ZodString;
    company: z.ZodString;
    tone: z.ZodEnum<["confident", "hunble", "assertive"]>;
    provider: z.ZodDefault<z.ZodOptional<z.ZodEnum<["openai", "gemini", "auto"]>>>;
}, "strip", z.ZodTypeAny, {
    userId?: string;
    cvText?: string;
    transcript?: string;
    jobDescription?: string;
    role?: string;
    company?: string;
    tone?: "confident" | "hunble" | "assertive";
    history?: string;
    provider?: "openai" | "gemini" | "auto";
}, {
    userId?: string;
    cvText?: string;
    transcript?: string;
    jobDescription?: string;
    role?: string;
    company?: string;
    tone?: "confident" | "hunble" | "assertive";
    history?: string;
    provider?: "openai" | "gemini" | "auto";
}>;
export type assistanceInput = z.infer<typeof assistanceInputSchema>;
export declare const assistanceOutputSchema: z.ZodObject<{
    response: z.ZodString;
}, "strip", z.ZodTypeAny, {
    response?: string;
}, {
    response?: string;
}>;
export type assistanceOutput = z.infer<typeof assistanceOutputSchema>;
export declare const assistancePrompt: {
    name: string;
    input: {
        schema: z.ZodObject<{
            userId: z.ZodString;
            transcript: z.ZodString;
            history: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            cvText: z.ZodString;
            jobDescription: z.ZodString;
            role: z.ZodString;
            company: z.ZodString;
            tone: z.ZodEnum<["confident", "hunble", "assertive"]>;
            provider: z.ZodDefault<z.ZodOptional<z.ZodEnum<["openai", "gemini", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            userId?: string;
            cvText?: string;
            transcript?: string;
            jobDescription?: string;
            role?: string;
            company?: string;
            tone?: "confident" | "hunble" | "assertive";
            history?: string;
            provider?: "openai" | "gemini" | "auto";
        }, {
            userId?: string;
            cvText?: string;
            transcript?: string;
            jobDescription?: string;
            role?: string;
            company?: string;
            tone?: "confident" | "hunble" | "assertive";
            history?: string;
            provider?: "openai" | "gemini" | "auto";
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
    prompt: (input: assistanceInput) => {
        text: string;
    }[];
};
export declare const interviewPrompt: {
    name: string;
    input: {
        schema: z.ZodObject<{
            userId: z.ZodString;
            transcript: z.ZodString;
            history: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            cvText: z.ZodString;
            jobDescription: z.ZodString;
            role: z.ZodString;
            company: z.ZodString;
            tone: z.ZodEnum<["confident", "hunble", "assertive"]>;
            provider: z.ZodDefault<z.ZodOptional<z.ZodEnum<["openai", "gemini", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            userId?: string;
            cvText?: string;
            transcript?: string;
            jobDescription?: string;
            role?: string;
            company?: string;
            tone?: "confident" | "hunble" | "assertive";
            history?: string;
            provider?: "openai" | "gemini" | "auto";
        }, {
            userId?: string;
            cvText?: string;
            transcript?: string;
            jobDescription?: string;
            role?: string;
            company?: string;
            tone?: "confident" | "hunble" | "assertive";
            history?: string;
            provider?: "openai" | "gemini" | "auto";
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
    prompt: (input: assistanceInput) => {
        text: string;
    }[];
};
