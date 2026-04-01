import { Service } from "typedi";
import puppeteer from "puppeteer";
import { HttpException } from "../exceptions/HttpException";

@Service()
export class PdfService {
  public async generatePdfFromHtml(html: string): Promise<Buffer> {
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });

      const page = await browser.newPage();

      await page.setContent(html, { waitUntil: "networkidle0" });

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
      });

      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error: any) {
      throw new HttpException(500, `PDF generation failed: ${error.message}`);
    }
  }

  public generatePDF = async (
    htmlContent: string,
  ): Promise<{
    success: boolean;
    message: string;
    document: Uint8Array<ArrayBufferLike> | null;
  }> => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      const enhancedCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    @page {
      size: A4;
      margin: 20mm 15mm;
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

      // Set content and add style
      await page.setContent(htmlContent, {
        waitUntil: "networkidle2",
      });

      await page.addStyleTag({ content: enhancedCSS });

      // Explicitly wait for fonts to be ready
      await page.evaluateHandle("document.fonts.ready");

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: "20mm",
          bottom: "20mm",
          left: "15mm",
          right: "15mm",
        },
      });

      await browser.close();
      return {
        success: true,
        message: "PDF Generated Successfully",
        document: pdfBuffer,
      };
    } catch (error) {
      return {
        success: false,
        message: "Network error",
        document: null,
      };
    }
  };
}
