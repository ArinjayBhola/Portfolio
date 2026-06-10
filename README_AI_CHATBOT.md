# AI Co-browsing Portfolio Assistant

This project adds a production-quality, AI-powered co-browsing chatbot to a Next.js portfolio website. The chatbot acts as an intelligent assistant that understands the website's content and can interact with the page using a tool-based system.

## 🚀 Features

- **Conversational AI**: Powered by Groq (Llama 3.3 70B Versatile) for fast, low-latency inference.
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
