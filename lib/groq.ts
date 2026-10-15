import Groq from "groq-sdk";
import { toolSchemas } from "./tools";

// Both models are listed on Groq's Free Plan. Keep the Groq account on that
// plan for free usage; model selection does not override account billing.
const MODELS = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b"] as const;

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
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "Chat is not configured. Add GROQ_API_KEY to .env and restart the server.",
    );
  }
  if (!messages.length || !messages[messages.length - 1]?.content?.trim()) {
    throw new Error("Please send a non-empty message.");
  }
  // Disable SDK retries so a failed primary immediately moves to the fallback.
  const groq = new Groq({ apiKey, timeout: 12000, maxRetries: 0 });
  // Build the conversation: system prompt + prior history.
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "system" ? ("assistant" as const) : msg.role,
    content: msg.content,
  }));

  // Inject the current page context into the latest user message.
  const latestMessage = messages[messages.length - 1].content;
  const promptWithContext = `CURRENT PAGE CONTENT: ${JSON.stringify(
    pageContext,
  )}\n\nUSER MESSAGE: ${latestMessage}`;

  for (const model of MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        max_completion_tokens: 2000,
        reasoning_effort: model === "openai/gpt-oss-120b" ? "low" : "none",
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

      const toolCalls = (message?.tool_calls || []).flatMap((call) => {
        if (
          !toolSchemas.some(
            (schema) => schema.function.name === call.function.name,
          )
        )
          return [];
        try {
          const parameters = call.function.arguments
            ? JSON.parse(call.function.arguments)
            : {};
          if (
            !parameters ||
            typeof parameters !== "object" ||
            Array.isArray(parameters)
          )
            return [];
          return [{ tool: call.function.name, parameters }];
        } catch {
          return [];
        }
      });

      if (!text && toolCalls.length === 0) {
        throw new Error("Model returned no usable answer.");
      }

      return { text, toolCalls };
    } catch (error) {
      // Log only the model and status, never keys or raw provider payloads.
      const status =
        error && typeof error === "object" && "status" in error
          ? error.status
          : "unavailable";
      console.warn(`Chat model ${model} failed (${status}).`);
    }
  }
  throw new Error(
    "Both chat models are unavailable. Please try again shortly or contact Arinjay by email.",
  );
}
