export declare enum Template {
    modern = "modern",
    classic = "classic",
    professional = "professional",
    creative = "creative",
    minimalist = "minimalist",
    modern_classic = "modern_classic",
    modern_professional = "modern_professional",
    modern_creative = "modern_creative",
    modern_minimalist = "modern_minimalist",
    classic_professional = "classic_professional",
    classic_creative = "classic_creative",
    classic_minimalist = "classic_minimalist",
    professional_creative = "professional_creative",
    professional_minimalist = "professional_minimalist",
    creative_minimalist = "creative_minimalist"
}
export declare const Templates: Record<Template, () => string>;
export declare const getTemplate: (templateName: Template | string) => string;
