# AI Co-browsing Portfolio Assistant

This project adds an AI-powered co-browsing chatbot to a Next.js portfolio website. The chatbot understands the website's content and can interact with the page using tools.

Current model order on Groq: **`openai/gpt-oss-120b`** (primary), then **`qwen/qwen3.8-27b`** (fallback, preview). Both are listed under [Groq Free Plan limits](https://console.groq.com/docs/rate-limits). Use a Free Plan Groq account for free usage; these same model IDs are billable on paid plans. Free quotas and account access still apply, and a fallback cannot guarantee service if both quotas are exhausted.

Each model gets one attempt with a 12-second timeout. Provider errors, rate limits, timeouts, empty responses, and replies containing only malformed tools trigger fallback. If both fail, the API returns a readable error. A missing `GROQ_API_KEY` is reported without making provider requests. Configure the key in `.env` and restart the server.

Run `node tests/chat-fallback.mjs` to verify primary success, fallback behavior, tool-call preservation, and error handling with simulated provider responses. This test does not require a real key or consume quota.

## 🚀 Features

- **Conversational AI**: Powered by Groq with GPT-OSS 120B and automatic Qwen 3.8 27B fallback.
- **Dynamic Context**: Automatically extracts section content, project details, and form fields from the DOM.
- **Co-browsing Tools**: The AI can scroll, navigate to sections, highlight elements, and even help fill out contact forms.
- **Modern UI**: A sleek, floating chat widget built with React, TailwindCSS, and Framer Motion.
- **Vercel Ready**: Optimized for deployment on Vercel with Next.js App Router.

## 🛠️ Architecture

### 1. Dynamic DOM Extraction (`lib/domExtractor.ts`)
The `extractPageContent` utility scans the DOM to build a structured map of the website. This allows the AI to "see" what's on the page without hardcoding any content.

### 2. Tool Calling System (`lib/tools.ts` & `utils/actionExecutor.ts`)
We've implemented a registry of tools that the model can invoke:
- `navigate_to_section`: Scrolls to a specific ID and highlights it.
- `scroll_down` / `scroll_up`: Natural page navigation.
- `highlight_element`: Visual feedback (glow effect) for specific elements.
- `fill_input`: Populates form fields programmatically.

### 3. Agentic Loop
User Message → Extract Page State → API Call (Groq) → Parse Response/Tools → Execute Frontend Actions → Display Response.

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
git clone <repository-url>
cd portfolio
npm install
```

### 2. Environment Variables
Create a `.env.local` file (or update your `.env`) with:
```env
# Get your free key at https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run Locally
```bash
npm run dev
```
## 🤖 Example Queries to Try

- "What projects are showcased here?" (Extracts projects)
- "Tell me about your skills." (Extracts skills list)
- "Go to the contact section." (Navigates)
- "Help me fill out the contact form with my name 'Alice' and email 'name@example.com'." (Fills inputs)
- "Scroll down a bit." (Performs scroll)
