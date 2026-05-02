# AI Agent Rules & Context

This file documents the system rules and context provided to the Antigravity AI assistant during the development of this application, fulfilling the project documentation requirements.

## Core Directives

### 1. Technology Stack
- **Frontend**: Use semantic HTML5, Vanilla JavaScript for DOM manipulation and logic, and Bootstrap 5 for styling. The use of React, Vue, or other frontend frameworks is strictly forbidden.
- **Backend**: Use Node.js and Express to develop RESTful API services. SSR and MVC architectures are not permitted.
- **Database**: Use SQLite to persist user data locally.

### 2. Design Aesthetics
- **Visual Excellence**: Prioritize modern, high-quality, visually excellent designs. 
- **User Experience**: Ensure smooth interactions, proper spacing, clear typography, and strong color contrast.

### 3. Accessibility & SEO
- **Lighthouse Goals**: Ensure strict adherence to WCAG accessibility guidelines to achieve and maintain a 100% Lighthouse Accessibility score.
- **Semantics**: Utilize a single `<h1>` tag per page, correct heading hierarchy, and descriptive unique IDs.

### 4. Code Organization & DevOps
- **Modularity**: Maintain clear code organization by splitting logic into functional files (e.g., `api.js`, `forms.js`, `preview.js`) rather than a monolithic script.
- **Offline Capability**: Host all libraries locally. The use of CDNs is not allowed.

## MCP Server Environment

The AI operated within the **Antigravity MCP Server environment**, which provided the agent with the following capabilities to act as a fully autonomous pair programmer:
- **Execution**: Ability to run Bash and Node scripts natively.
- **File Management**: Direct read and write access to the workspace repository.
- **Search**: Ripgrep capabilities to instantly search through code files.
- **Browser Automation**: Ability to launch a headless browser to visually test UI elements and run Lighthouse accessibility audits.
