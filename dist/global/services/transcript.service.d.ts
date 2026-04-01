export declare class OpenAIService {
    constructor();
    transcribeAudio(fileBuffer: Buffer, openAiKey: string): Promise<string>;
    convertToMp3(buffer: Buffer): Promise<string>;
    convertToWav(buffer: Buffer): Promise<string>;
}
