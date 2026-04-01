import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import { ForbiddenError, InternalServerError } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class DocumentService {
  public async extractText(
    fileBuffer: Buffer,
    mimetype: string,
  ): Promise<string> {
    try {
      if (mimetype === "application/pdf") {
        const parser = new PDFParse({ data: fileBuffer });
        const data = await parser.getText();
        return data.text;
      } else if (
        mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        mimetype === "application/msword"
      ) {
        const data = await mammoth.extractRawText({ buffer: fileBuffer });
        return data.value;
      } else {
        throw new ForbiddenError(
          "Unsupported file type. Please upload a PDF or DOCX file.",
        );
      }
    } catch (error: any) {
      throw new InternalServerError(
        `Failed to extract text from document: ${error.message}`,
      );
    }
  }
}
