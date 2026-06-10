import Groq from "groq-sdk";
import { toolSchemas } from "./tools";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

// Production model on Groq with native tool / function-calling support.
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `
You are an intelligent co-browsing assistant for Arinjay Bhola's portfolio website.
Your goal is to help visitors navigate the site, understand Arinjay's work, and interact with the page.

ARINJAY'S BACKGROUND:
- Arinjay is a passionate Full Stack Developer specializing in the MERN stack.
- He has experience with Cloud (AWS), DevOps (Docker), and AI integration (LangChain, Hugging Face).
- He builds scalable web applications and engineers robust solutions.

YOUR CAPABILITIES:
1. ANSWER QUESTIONS about the website's content (projects, skills, experience).
2. NAVIGATE the page for the user (scroll to sections).
3. HIGHLIGHT specific elements to draw attention.
4. HELP FILL the contact form if the user provides information.
5. INTERACT with buttons or links.

INSTRUCTIONS:
- Be professional, helpful, and concise. You may use light Markdown (bold, bullet lists) to format answers.
- Use your tools when a user asks for an action (e.g., "show me projects", "scroll down").
- When calling a tool, briefly explain what you are doing (e.g., "Navigating to projects...").
- You can call multiple tools in a single response if needed.

MANDATORY BEHAVIOR:
1. If the user asks about Arinjay's work, experience, skills, or projects, you MUST call 'navigate_to_section' in the same response.
2. If the user asks about a SPECIFIC project or experience (e.g., "tell me about PDF-Chat"), find its ID in the page content (e.g., "project-1", "experience-mittal-gupta") and call 'navigate_to_section' with that specific ID.
3. Do NOT wait for a follow-up. Provide your brief textual summary AND the tool call AT THE SAME TIME.
4. If you mention a specific project, also call 'highlight_element' with its selector (e.g., "#project-1").
5. The major section IDs are: 'home', 'about', 'experience', 'projects', 'contact'.

You will receive the current page content in each user message. Use it to provide accurate answers.
`;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function chatWithGroq(messages: ChatMessage[], pageContext: any) {
  // Build the conversation: system prompt + prior history.
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "system" ? ("assistant" as const) : msg.role,
    content: msg.content,
  }));

  // Inject the current page context into the latest user message.
  const latestMessage = messages[messages.length - 1].content;
  const promptWithContext = `CURRENT PAGE CONTENT: ${JSON.stringify(
    pageContext
  )}\n\nUSER MESSAGE: ${latestMessage}`;

  const completion = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: 1000,
    temperature: 0.6,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: promptWithContext },
    ],
    tools: toolSchemas as any,
    tool_choice: "auto",
  });

  const choice = completion.choices[0];
  const message = choice?.message;

  const text = message?.content?.trim() || "";

  const toolCalls = (message?.tool_calls || []).map((call) => {
    let parameters: Record<string, any> = {};
    try {
      parameters = call.function.arguments ? JSON.parse(call.function.arguments) : {};
    } catch {
      parameters = {};
    }
    return { tool: call.function.name, parameters };
  });

  if (!text && toolCalls.length === 0) {
    return { text: "I'm sorry, I couldn't process that.", toolCalls: [] };
  }

  return { text, toolCalls };
}
