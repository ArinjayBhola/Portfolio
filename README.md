# Arinjay Bhola's Portfolio & AI Co-browsing Assistant

A production-quality personal portfolio built with **Next.js 14**, **TypeScript**, and **TailwindCSS**, featuring a cutting-edge **AI Co-browsing Chatbot** powered by **Groq (Llama 3.3 70B)**.

## 🚀 Features

### **Portfolio Website**
- **Modern UI/UX**: Clean, minimalist design with a focus on typography and smooth transitions.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop.
- **Project Showcase**: Detailed grid of featured work with animated cards.
- **Skills & Experience**: Structured sections highlighting technical expertise and professional history.
- **Dark/Light Mode**: Seamless theme switching with system preference detection.

### **AI Co-browsing Chatbot**
- **Autonomous Navigation**: The AI can scroll the user to specific sections ('Projects', 'About', 'Contact') on command.
- **Dynamic Content Extraction**: Uses a custom DOM extraction engine to understand the page content in real-time.
- **Intelligent Summarization**: Provides brief, context-aware summaries of sections before navigating.
- **Element Highlighting**: Visually pulses and glows specific elements to draw the user's attention.
- **Tool-Calling Architecture**: Built with a robust agentic loop that maps AI intent to frontend actions.

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Groq API — Llama 3.3 70B](https://groq.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏗️ Architecture

### **Co-browsing Agent Flow**
1. **Context Extraction**: Upon user message, the system scans the DOM for headings, text, and IDs.
2. **AI Processing**: Message + DOM context is sent to Groq with a custom system instruction set.
3. **Intent Recognition**: The AI decides whether to respond with text, call a tool (navigation, highlight), or both.
4. **Action Execution**: The frontend `actionExecutor` receives tool calls and triggers smooth scrolls or visual glows.

## 🏁 Getting Started

### **Prerequisites**
- Node.js 18.x or later
- npm or yarn
- A Groq API Key from [Groq Console](https://console.groq.com/keys)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root and add your API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the site**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see your portfolio in action.

## 📝 Usage

Ask the bot things like:
- "Tell me about your projects"
- "Show me your experience"
- "How can I contact you?"
- "Scroll down a bit"