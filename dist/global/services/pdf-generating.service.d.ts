export declare class PdfService {
    generatePdfFromHtml(html: string): Promise<Buffer>;
    generatePDF: (htmlContent: string) => Promise<{
        success: boolean;
        message: string;
        document: Uint8Array<ArrayBufferLike> | null;
    }>;
}
