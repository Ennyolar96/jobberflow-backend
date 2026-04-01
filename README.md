## Overview

This API is designed to be your personal career assistant, helping you stand out in the competitive job market. It takes your existing resume and a specific job description, then uses AI to rewrite and optimize your resume to perfectly match what recruiters are looking for. Beyond just documents, it also provides an interactive mock interview experience with real-time feedback and audio transcription, so you're always prepared and can pinpoint areas for improvement.

## Features

- **AI-Powered Resume Optimization**: Submit your resume and a job description to get an ATS-friendly, tailored resume in various professional templates (modern, classic, minimalist, creative, and more).
- **Document Text Extraction**: Easily extract text from PDF and DOCX files to feed directly into the resume optimizer.
- **Interactive AI Mock Interviews**: Practice your interview skills with an AI interviewer that provides contextual feedback and keeps track of your conversation history.
- **Audio Transcription for Interviews**: Upload audio recordings of your responses during mock interviews, and the AI will transcribe them for processing and feedback.
- **Secure AI Key Management**: Safely store and encrypt your OpenAI and Google Gemini API keys, allowing you to choose your preferred AI provider.
- **Persistent Conversation History**: Your interview sessions are saved, so the AI remembers previous turns and offers continuous, relevant interactions.
- **Dynamic PDF Generation**: Download your newly optimized resumes as professionally formatted PDF documents.
- **Real-time Progress Updates**: Get instant feedback and status updates during audio transcription and AI generation via WebSockets.

## Getting Started

To get this API up and running on your local machine, follow these steps.

### Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/jobberflow-backend.git
    cd jobberflow-backend
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Build the Project**:
    ```bash
    npm run build
    ```

### Environment Variables

You'll need to set up a `.env` file in the root of the project. Here are the required variables and their purposes:

```dotenv
NODE_ENV=development           # or production, test
PORT=4005                      # The port the API will listen on
DATABASE_NAME=database.sqlite  # Name of the SQLite database file
ENCRYPTION_KEY="your_strong_encryption_key_32_chars" # A 32-character (256-bit) key for encrypting sensitive data (e.g., user passwords for API keys)
ALGO_KEY="aes-256-cbc"         # Encryption algorithm (keep as is unless you know what you're doing)
CREDENTIALS=true               # Set to 'true' if your client requires credentials for CORS
```

- **`ENCRYPTION_KEY`**: This is crucial for security. Make sure it's a strong, randomly generated 32-character string. You can generate one using a tool or by running `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## Usage

Once you've installed dependencies and configured your environment variables, you can start the API.

### Running in Development

For development with hot-reloading:

```bash
npm run start:dev
```

The server will typically run on `http://localhost:4005`.

### Running in Production

To run the compiled production build:

```bash
npm start
```

## API Documentation

<!-- The API's base URL is typically `http://localhost:4005/api`. All endpoints are prefixed with `/api`. -->

### Base URL

`http://localhost:4005/api` (adjust port if different in your `.env`)

### Endpoints

#### `POST /api/interview`

Initiates or continues an AI mock interview session.

**Description**: Sends a candidate's response and receives an interviewer's question or feedback, maintaining conversation continuity.

**Request**:

```json
{
  "userId": "some-unique-user-id",
  "cvText": "Full text content of the candidate's resume...",
  "jobDescription": "Full text content of the job description...",
  "role": "Software Engineer",
  "company": "Tech Innovations Inc.",
  "tone": "confident",
  "transcript": "My latest answer to the interviewer's question.",
  "provider": "openai"
}
```

**Response**:

```json
{
  "response": "That's a strong answer. Could you elaborate on a specific project where you applied those skills?"
}
```

**Errors**:

- `400 Bad Request`: Missing or invalid input fields.
- `500 Internal Server Error`: Issue with AI generation or database.

#### `POST /api/transcript`

Transcribes an audio file and processes it for AI assistance.

**Description**: Uploads an audio file (e.g., a candidate's spoken response) to be transcribed and then sends the text for AI feedback/assistance. Real-time updates are sent via WebSockets.

**Request**: (multipart/form-data)

- **Field**: `file` (audio file - WAV, M4A, MP4, MP3, 3GP, WebM)
- **Body Fields** (form-data text fields):
  - `userId`: "some-unique-user-id"
  - `cvText`: "Full text content of the candidate's resume..."
  - `jobDescription`: "Full text content of the job description..."
  - `role`: "Software Engineer"
  - `company`: "Tech Innovations Inc."
  - `tone`: "confident"
  - `provider`: "gemini"

**Response**:

```json
{
  "success": true,
  "message": "Transcription started"
}
```

**WebSocket Events**:

- `assistance-progress`: Emits status updates (`transcribing`, `transcribed`, `generating_response`, `completed`, `error`) and results to the user's room (`user:{userId}`).

**Errors**:

- `400 Bad Request`: No audio file provided or invalid form data.
- `422 Unprocessable Entity`: Invalid file type or file size exceeds 10MB limit.
- `500 Internal Server Error`: Transcription or AI generation failed.

#### `DELETE /api/clear-history/:userid`

Clears a user's mock interview conversation history.

**Description**: Deletes all stored interview turns for a specific user, effectively resetting their mock interview session.

**Request**:

```
DELETE /api/clear-history/some-unique-user-id
```

**Response**:

```json
{
  "success": true,
  "message": "History cleared"
}
```

**Errors**:

- `500 Internal Server Error`: Database error.

#### `POST /api/key`

Creates or updates a user's AI API keys.

**Description**: Allows a user to securely store their OpenAI and/or Google Gemini API keys, encrypted with a master password. If keys already exist for the user, they can be updated.

**Request**:

```json
{
  "userId": "some-unique-user-id",
  "openai": "sk-your-openai-key",
  "gemini": "AIzaSy-your-gemini-key",
  "password": "my-secret-master-password"
}
```

**Response**:

```json
{
  "id": "uuid-of-key-entry",
  "userId": "some-unique-user-id",
  "openai": "encrypted-openai-key-string",
  "gemini": "encrypted-gemini-key-string",
  "password": "encrypted-master-password-string",
  "createdAt": "2023-10-27T10:00:00.000Z",
  "updatedAt": "2023-10-27T10:00:00.000Z"
}
```

**Errors**:

- `400 Bad Request`: Missing or invalid input, or `incorrect credentials` if trying to update an existing key with the wrong master password.
- `500 Internal Server Error`: Database error during saving keys.

#### `GET /api/key/:userId`

Retrieves a user's decrypted AI API keys.

**Description**: Fetches the OpenAI and Gemini API keys associated with a user, decrypting them for immediate use by the client. These keys are cached for performance.

**Request**:

```
GET /api/key/some-unique-user-id
```

**Response**:

```json
{
  "openai": "sk-your-decrypted-openai-key",
  "gemini": "AIzaSy-your-decrypted-gemini-key"
}
```

**Errors**:

- `500 Internal Server Error`: Database error during fetching keys.

#### `POST /api/key/verify`

Verifies a user's master password for their stored API keys.

**Description**: Checks if the provided master password is correct for a given user, without exposing the actual keys.

**Request**:

```json
{
  "userId": "some-unique-user-id",
  "password": "my-secret-master-password"
}
```

**Response**:

```json
{
  "success": true
}
```

(Returns `false` if password verification fails)

**Errors**:

- `500 Internal Server Error`: Database error during verification.

#### `POST /api/optimize`

Rewrites a resume for a specific job description.

**Description**: Takes a candidate's resume text, a job description, and a desired template, then uses AI to generate an optimized, ATS-friendly HTML resume.

**Request**:

```json
{
  "userId": "some-unique-user-id",
  "resume": "Full text of the candidate's original resume...",
  "jobDescription": "Full text of the job description for the target role...",
  "referenceTemplate": "modern",
  "provider": "openai"
}
```

**`referenceTemplate` options**: `"modern"`, `"classic"`, `"professional"`, `"creative"`, `"minimalist"`, `"modern_classic"`, `"modern_professional"`, `"modern_creative"`, `"modern_minimalist"`, `"classic_professional"`, `"classic_creative"`, `"classic_minimalist"`, `"professional_creative"`, `"professional_minimalist"`, `"creative_minimalist"`

**Response**:

```json
{
  "response": "<div class=\"resume-wrapper\"><style>...</style>...</div>"
}
```

**Errors**:

- `400 Bad Request`: Missing or invalid input.
- `500 Internal Server Error`: AI generation failed.

#### `POST /api/extract`

Extracts text content from a document.

**Description**: Uploads a PDF or DOCX file and returns its extracted text content.

**Request**: (multipart/form-data)

- **Field**: `file` (PDF or DOCX file)

**Response**:

```json
{
  "text": "Extracted text content from the document..."
}
```

**Errors**:

- `400 Bad Request`: No document file provided.
- `403 Forbidden`: Unsupported file type (only PDF/DOCX allowed).
- `422 Unprocessable Entity`: File size exceeds 10MB limit.
- `500 Internal Server Error`: Failed to extract text.

#### `POST /api/download`

Generates and downloads a PDF from HTML content.

**Description**: Converts provided HTML content (e.g., a generated resume) into a PDF file and sends it as a download.

**Request**:

```json
{
  "html": "<!DOCTYPE html><html lang=\"en\">... (full HTML document string) ..."
}
```

**Response**: (file download, `Content-Type: application/pdf`)

```
(Binary PDF content)
```

**Errors**:

- `500 Internal Server Error`: Failed to generate PDF.

## Technologies Used

| Technology             | Description                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------- |
| **TypeScript**         | Superset of JavaScript providing type safety.                                                   |
| **Node.js**            | JavaScript runtime environment.                                                                 |
| **Express.js**         | Minimalist web framework for Node.js.                                                           |
| **TypeORM**            | ORM for TypeScript and JavaScript (supports multiple databases).                                |
| **SQLite3**            | Lightweight, file-based relational database.                                                    |
| **Genkit AI**          | AI framework for building generative AI applications, abstracting LLMs (Google Gemini, OpenAI). |
| **OpenAI API**         | AI models for text generation and Whisper for speech-to-text.                                   |
| **Socket.IO**          | Real-time bidirectional event-based communication.                                              |
| **Puppeteer**          | Headless Chrome Node.js library for PDF generation.                                             |
| **Winston**            | Production-ready logging library.                                                               |
| **TypeDI**             | Dependency injection container.                                                                 |
| **Class-Validator**    | Decorator-based validation for classes.                                                         |
| **Class-Transformer**  | Decorator-based object transformation.                                                          |
| **Multer**             | Middleware for handling `multipart/form-data` (file uploads).                                   |
| **Helmet**             | Security middleware for Express apps.                                                           |
| **HPP**                | Protects against HTTP Parameter Pollution attacks.                                              |
| **Compression**        | Response compression middleware.                                                                |
| **Express Rate Limit** | Basic rate-limiting middleware.                                                                 |
| **Dotenv**             | Loads environment variables from a `.env` file.                                                 |
| **Mammoth.js**         | Converts `.docx` documents to HTML (used for text extraction).                                  |
| **PDF-Parse**          | Extracts text from PDF files.                                                                   |
| **Fluent-FFMPEG**      | Node.js wrapper for `ffmpeg` (used for audio conversion).                                       |
| **Node-Cache**         | A simple caching module.                                                                        |

## Contributing

We welcome contributions! If you're interested in improving this project, please consider the following:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
3.  **Make your changes**.
4.  **Write clear and concise commit messages**.
5.  **Push your branch** to your forked repository.
6.  **Open a Pull Request** to the `main` branch of this repository, describing your changes in detail.

## License

This project is licensed under the ISC License.

## Author Info

- **Olaniyan Mutiu A.**
  - LinkedIn: [https://linkedin.com/in/ennyolar96](https://linkedin.com/in/ennyolar96)
  - X (formerly Twitter): [https://twitter.com/ennyolar96](https://twitter.com/ennyolar96)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
# jobberflow-backend
