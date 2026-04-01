"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = exports.Templates = exports.Template = void 0;
const classic_template_1 = require("./classic.template");
const classic_creative_template_1 = require("./classic_creative.template");
const classic_minimalist_template_1 = require("./classic_minimalist.template");
const classic_professional_template_1 = require("./classic_professional.template");
const creative_template_1 = require("./creative.template");
const creative_minimalist_template_1 = require("./creative_minimalist.template");
const minimalist_template_1 = require("./minimalist.template");
const modern_template_1 = require("./modern.template");
const modern_classic_template_1 = require("./modern_classic.template");
const modern_creative_template_1 = require("./modern_creative.template");
const modern_minimalist_template_1 = require("./modern_minimalist.template");
const modern_professional_template_1 = require("./modern_professional.template");
const professional_template_1 = require("./professional.template");
const professional_creative_template_1 = require("./professional_creative.template");
const professional_minimalist_template_1 = require("./professional_minimalist.template");
var Template;
(function (Template) {
    Template["modern"] = "modern";
    Template["classic"] = "classic";
    Template["professional"] = "professional";
    Template["creative"] = "creative";
    Template["minimalist"] = "minimalist";
    Template["modern_classic"] = "modern_classic";
    Template["modern_professional"] = "modern_professional";
    Template["modern_creative"] = "modern_creative";
    Template["modern_minimalist"] = "modern_minimalist";
    Template["classic_professional"] = "classic_professional";
    Template["classic_creative"] = "classic_creative";
    Template["classic_minimalist"] = "classic_minimalist";
    Template["professional_creative"] = "professional_creative";
    Template["professional_minimalist"] = "professional_minimalist";
    Template["creative_minimalist"] = "creative_minimalist";
})(Template || (exports.Template = Template = {}));
exports.Templates = {
    [Template.modern]: modern_template_1.modernTemplate,
    [Template.classic]: classic_template_1.classicTemplate,
    [Template.professional]: professional_template_1.professionalTemplate,
    [Template.creative]: creative_template_1.creativeTemplate,
    [Template.minimalist]: minimalist_template_1.minimalistTemplate,
    [Template.modern_classic]: modern_classic_template_1.modernClassicTemplate,
    [Template.modern_professional]: modern_professional_template_1.modernProfessionalTemplate,
    [Template.modern_creative]: modern_creative_template_1.modernCreativeTemplate,
    [Template.modern_minimalist]: modern_minimalist_template_1.modernMinimalistTemplate,
    [Template.classic_professional]: classic_professional_template_1.classicProfessionalTemplate,
    [Template.classic_creative]: classic_creative_template_1.classicCreativeTemplate,
    [Template.classic_minimalist]: classic_minimalist_template_1.classicMinimalistTemplate,
    [Template.professional_creative]: professional_creative_template_1.professionalCreativeTemplate,
    [Template.professional_minimalist]: professional_minimalist_template_1.professionalMinimalistTemplate,
    [Template.creative_minimalist]: creative_minimalist_template_1.creativeMinimalistTemplate,
};
const getTemplate = (templateName) => {
    const templateFn = exports.Templates[templateName] || modern_template_1.modernTemplate;
    return templateFn();
};
exports.getTemplate = getTemplate;
//# sourceMappingURL=index.js.map