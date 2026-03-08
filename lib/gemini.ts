import { GoogleGenerativeAI } from "@google/generative-ai";
import { toolSchemas } from "./tools";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are an intelligent co-browsing assistant for Arinjay Bhola's portfolio website. 
Your goal is to help visitors navigate the site, understand Arinjay's work, and interact with the page.

ARINJAY'S BACKGROUND:
- Arinjay is a passionate Full Stack Developer specializing in the MERN stack.
- He has experience with Cloud (AWS), DevOps (Docker), and AI integration (LangChain, Hugging Face).
- He builds scalable web applications and engineering robust solutions.

YOUR CAPABILITIES:
1. ANSWER QUESTIONS about the website's content (projects, skills, experience).
2. NAVIGATE the page for the user (scroll to sections).
3. HIGHLIGHT specific elements to draw attention.
4. HELP FILL the contact form if the user provides information.
5. INTERACT with buttons or links.

INSTRUCTIONS:
- Be professional, helpful, and concise.
- Use your tools when a user asks for an action (e.g., "show me projects", "scroll down").
- If you don't have enough information to answer a question, ask the user or use the 'extract_page_content' tool if appropriate.
- When calling a tool, explain briefly what you are doing (e.g., "Navigating to projects...").
- You can call multiple tools in a sequence if needed.

DYNAMIC CONTEXT:
You will receive the current page content in each message. Use this to provide accurate answers.
`;

export async function chatWithGemini(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  pageContext: any
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT + `
EXTREMELY IMPORTANT - MANDATORY BEHAVIOR:
1. If the user asks about Arinjay's work, experience, skills, or projects, YOU MUST CALL 'navigate_to_section' in the same response.
2. If the user asks about a SPECIFIC project or experience (e.g., "tell me about PDF-Chat"), find its ID in the dynamic context (e.g., "project-1", "experience-mittal-gupta") and call 'navigate_to_section' with that specific ID.
3. DO NOT wait for a follow-up. Provide your brief textual summary AND the tool call AT THE SAME TIME.
4. Your response MUST be a mix of helpful text and the appropriate tool call.
5. If you mention a specific project, call 'highlight_element' with its selector (e.g., "#project-1").
6. The major section IDs are: 'home', 'about', 'experience', 'projects', 'contact'.
`,
  });

  // Ensure history starts with a user message and alternates properly
  let history = messages.slice(0, -1).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  // Gemini requires the first message in history to be from the 'user'
  if (history.length > 0 && history[0].role === 'model') {
    history = history.slice(1);
  }

  const chat = model.startChat({
    history: history as any,
    generationConfig: {
      maxOutputTokens: 1000,
    },
    tools: [{ functionDeclarations: toolSchemas as any }],
  });

  // Inject page context as a system message prefix to the latest user message
  const latestMessage = messages[messages.length - 1].content;
  const promptWithContext = `CURRENT PAGE CONTENT: ${JSON.stringify(pageContext)}\n\nUSER MESSAGE: ${latestMessage}`;

  const result = await chat.sendMessage(promptWithContext);

  const response = result.response;
  const candidates = response.candidates || [];
  
  if (candidates.length > 0) {
    const content = candidates[0].content;
    const parts = content.parts || [];
    
    let text = '';
    const toolCalls: any[] = [];

    parts.forEach(part => {
      if (part.text) {
        text += part.text;
      }
      if (part.functionCall) {
        toolCalls.push({
            tool: part.functionCall.name,
            parameters: part.functionCall.args
        });
      }
    });

    return { text, toolCalls };
  }

  return { text: "I'm sorry, I couldn't process that.", toolCalls: [] };
}
