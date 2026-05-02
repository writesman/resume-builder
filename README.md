# Resume Builder Pro

**GitHub Repository:** [https://github.com/writesman/resume-builder](https://github.com/writesman/resume-builder)

A professional, single-page resume builder application built with vanilla HTML/CSS/JS, an Express backend, and a SQLite database. This application runs natively as a desktop application using ElectronJS.

## Getting Started

1. Clone the repository: `git clone https://github.com/writesman/resume-builder.git`
2. Install dependencies: `npm install`
3. Start the application:
   - For web mode: `npm start` (Access at `http://localhost:3000`)
   - For desktop mode: `npm run electron`

## Generative AI Disclosure

This project was developed with the assistance of Generative AI, specifically utilizing an agentic coding assistant powered by the Gemini model through the Antigravity MCP Server environment.

### Prompt Engineering & Workflow
The development process used an iterative, orchestration-based workflow rather than simple one-off prompts:
1. **Initial Scaffold:** An initial prompt to generate the foundational HTML/CSS/JS architecture with an Express backend and SQLite database.
2. **Feature Iteration:** Incremental prompts to add specific features, like the "✨ Enhance" buttons, binding them to local storage keys, and implementing data filtering.
3. **Accessibility Audit:** Specific prompts directing the AI to analyze Lighthouse scores and adjust heading hierarchy and color contrast to achieve a 100% accessibility rating.
4. **Desktop Wrap:** Final orchestrations to configure ElectronJS for a native desktop experience and resolve print pagination issues.
*Rules File:* A complete copy of the agent's persistent system prompt and MCP server configuration details can be found in [RULES.md](RULES.md).

### In-App AI Features

The application itself integrates Generative AI as a core feature. Users can click "✨ Enhance" on Job Responsibilities, Honors, or Activities to rewrite their bullet points using the Google Gemini API.
**Note on API Keys**: The backend does not strictly require the Gemini API key to boot. A system was implemented where the user provides their own API key in the frontend via localStorage for privacy and flexibility.

### Codebase Footprint

Comments have been placed throughout the application's source code indicating where AI was heavily utilized. These include:

- `server/gemini.js` - AI-generated wrapper for the `@google/genai` SDK.
- `public/js/forms.js` - AI-generated data binding and event delegation.
- `public/js/preview.js` - AI-generated layout logic for the print-friendly resume document.

## Sharing Statement

It is okay to share this project with other students to help with developing their resumes.
