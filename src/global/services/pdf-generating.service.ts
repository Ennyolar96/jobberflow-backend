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

      // @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
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

      // Set content and add style
      await page.setContent(htmlContent, {
        waitUntil: "networkidle2",
      });

      await page.addStyleTag({ content: enhancedCSS });

      // Explicitly wait for fonts to be ready
      await page.evaluateHandle("document.fonts.ready");

      // Clean up any empty space and fix top margins via DOM manipulation
      await page.evaluate(() => {
        // 1. Remove empty elements like <p><br></p> or standalone <br> at the very top
        let el = document.body.firstElementChild;
        while (el) {
          const isEmptyText =
            el.textContent?.trim() === "" && el.children.length === 0;
          if (el.tagName === "BR" || isEmptyText) {
            const next = el.nextElementSibling;
            el.remove();
            el = next;
          } else {
            break;
          }
        }

        // 2. Remove margin-top from the first visible hierarchy of elements
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
        // Margin is controlled via CSS @page above to avoid double/uneven margins.
        margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
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
