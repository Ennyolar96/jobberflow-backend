"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const typedi_1 = require("typedi");
const puppeteer_1 = __importDefault(require("puppeteer"));
const HttpException_1 = require("../exceptions/HttpException");
let PdfService = class PdfService {
    constructor() {
        this.generatePDF = async (htmlContent) => {
            try {
                const browser = await puppeteer_1.default.launch({
                    headless: true,
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                });
                const page = await browser.newPage();
                const enhancedCSS = `
      @page {
        size: A4;
        margin: 20mm 5mm;
      }

      @page :first {
        margin: 10mm 5mm;
      }
        
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      line-height: 1.6;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
    }

    body > *:first-child {
      margin-top: 0;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #000;
      font-weight: 700;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.2;
    }

    h1 { font-size: 24pt; border-bottom: 2px solid #eee; padding-bottom: 8px; }
    h2 { font-size: 18pt; margin-top: 2em; }
    h3 { font-size: 14pt; }

    p, li {
      font-size: 11pt;
      margin-bottom: 1em;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5em 0;
      page-break-inside: auto;
    }

    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    th, td {
      padding: 12px 10px;
      border: 1px solid #e2e8f0;
      text-align: left;
      font-size: 10pt;
    }

    th {
      background-color: #f8fafc;
      font-weight: 600;
      color: #334155;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em auto;
    }
    
    ul {
      list-style-type: none;
      padding-left: 20px;
      margin-bottom: 10px;
    }
    
    ol {
      list-style-type: none;
      padding-left: 20px;
      margin-bottom: 10px;
    }

    .page-break {
      page-break-before: always;
    }
  `;
                await page.setContent(htmlContent, {
                    waitUntil: "networkidle2",
                });
                await page.addStyleTag({ content: enhancedCSS });
                await page.evaluateHandle("document.fonts.ready");
                await page.evaluate(() => {
                    let el = document.body.firstElementChild;
                    while (el) {
                        const isEmptyText = el.textContent?.trim() === "" && el.children.length === 0;
                        if (el.tagName === "BR" || isEmptyText) {
                            const next = el.nextElementSibling;
                            el.remove();
                            el = next;
                        }
                        else {
                            break;
                        }
                    }
                    let curr = document.body.firstElementChild;
                    while (curr) {
                        if (curr instanceof HTMLElement) {
                            curr.style.setProperty("margin-top", "0", "important");
                            curr.style.setProperty("padding-top", "0", "important");
                        }
                        curr = curr.firstElementChild;
                    }
                });
                const pdfBuffer = await page.pdf({
                    format: "A4",
                    printBackground: true,
                    preferCSSPageSize: true,
                    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
                });
                await browser.close();
                return {
                    success: true,
                    message: "PDF Generated Successfully",
                    document: pdfBuffer,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Network error",
                    document: null,
                };
            }
        };
    }
    async generatePdfFromHtml(html) {
        try {
            const browser = await puppeteer_1.default.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: "networkidle0" });
            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
            });
            await browser.close();
            return Buffer.from(pdfBuffer);
        }
        catch (error) {
            throw new HttpException_1.HttpException(500, `PDF generation failed: ${error.message}`);
        }
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, typedi_1.Service)()
], PdfService);
//# sourceMappingURL=pdf-generating.service.js.map