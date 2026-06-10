export type ToolName =
  | 'scroll_up'
  | 'scroll_down'
  | 'navigate_to_section'
  | 'highlight_element'
  | 'click_element'
  | 'fill_input'
  | 'extract_page_content';

export interface ToolCall {
  tool: ToolName;
  parameters?: Record<string, any>;
}

// OpenAI / Groq compatible tool (function calling) schemas.
export const toolSchemas = [
  {
    type: "function",
    function: {
      name: "scroll_up",
      description: "Scroll the page up by a certain amount.",
      parameters: {
        type: "object",
        properties: {
          pixels: {
            type: "number",
            description: "Number of pixels to scroll up (default: 500)",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "scroll_down",
      description: "Scroll the page down by a certain amount.",
      parameters: {
        type: "object",
        properties: {
          pixels: {
            type: "number",
            description: "Number of pixels to scroll down (default: 500)",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "navigate_to_section",
      description: "Navigate/scroll to a specific section of the page based on its ID.",
      parameters: {
        type: "object",
        properties: {
          sectionId: {
            type: "string",
            description:
              "The ID of the section to navigate to (e.g., 'home', 'about', 'experience', 'projects', 'contact')",
          },
        },
        required: ["sectionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "highlight_element",
      description: "Visually highlight an element on the page using a CSS selector.",
      parameters: {
        type: "object",
        properties: {
          selector: {
            type: "string",
            description: "The CSS selector of the element to highlight (e.g., '#project-1', '.project-card')",
          },
          description: {
            type: "string",
            description: "A description of the element to highlight if selector is not known.",
          },
        },
        required: ["selector"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "click_element",
      description: "Click on a link or button on the page.",
      parameters: {
        type: "object",
        properties: {
          selector: {
            type: "string",
            description: "The CSS selector of the element to click.",
          },
        },
        required: ["selector"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "fill_input",
      description: "Fill out an input field or textarea (e.g., in the contact form).",
      parameters: {
        type: "object",
        properties: {
          selector: {
            type: "string",
            description: "The CSS selector of the input field.",
          },
          value: {
            type: "string",
            description: "The text to fill into the input.",
          },
        },
        required: ["selector", "value"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "extract_page_content",
      description: "Re-extract the page content to get updated information about the current view.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];
