import { DocumentService, PdfService } from "../../global/services";
import { ResumeInput } from "./input";
import { KeyService } from "../keys/key.service";
export declare class ResumeService {
    private readonly documentService;
    private readonly pdfService;
    private readonly keyService;
    constructor(documentService: DocumentService, pdfService: PdfService, keyService: KeyService);
    extractText: (file: Express.Multer.File) => Promise<string>;
    rewriteResume: (payload: ResumeInput) => Promise<string>;
    downloadResume: (payload: {
        html: string;
    }) => Promise<{
        success: boolean;
        message: string;
        document: Uint8Array<ArrayBufferLike> | null;
    }>;
    private provider;
    private executeFlow;
    private provideSwitch;
}
