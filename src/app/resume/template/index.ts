import { classicTemplate } from "./classic.template";
import { classicCreativeTemplate } from "./classic_creative.template";
import { classicMinimalistTemplate } from "./classic_minimalist.template";
import { classicProfessionalTemplate } from "./classic_professional.template";
import { creativeTemplate } from "./creative.template";
import { creativeMinimalistTemplate } from "./creative_minimalist.template";
import { minimalistTemplate } from "./minimalist.template";
import { modernTemplate } from "./modern.template";
import { modernClassicTemplate } from "./modern_classic.template";
import { modernCreativeTemplate } from "./modern_creative.template";
import { modernMinimalistTemplate } from "./modern_minimalist.template";
import { modernProfessionalTemplate } from "./modern_professional.template";
import { professionalTemplate } from "./professional.template";
import { professionalCreativeTemplate } from "./professional_creative.template";
import { professionalMinimalistTemplate } from "./professional_minimalist.template";

export enum Template {
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
  creative_minimalist = "creative_minimalist",
}

export const Templates: Record<Template, () => string> = {
  [Template.modern]: modernTemplate,
  [Template.classic]: classicTemplate,
  [Template.professional]: professionalTemplate,
  [Template.creative]: creativeTemplate,
  [Template.minimalist]: minimalistTemplate,
  [Template.modern_classic]: modernClassicTemplate,
  [Template.modern_professional]: modernProfessionalTemplate,
  [Template.modern_creative]: modernCreativeTemplate,
  [Template.modern_minimalist]: modernMinimalistTemplate,
  [Template.classic_professional]: classicProfessionalTemplate,
  [Template.classic_creative]: classicCreativeTemplate,
  [Template.classic_minimalist]: classicMinimalistTemplate,
  [Template.professional_creative]: professionalCreativeTemplate,
  [Template.professional_minimalist]: professionalMinimalistTemplate,
  [Template.creative_minimalist]: creativeMinimalistTemplate,
};

export const getTemplate = (templateName: Template | string): string => {
  const templateFn = Templates[templateName as Template] || modernTemplate;
  return templateFn();
};
