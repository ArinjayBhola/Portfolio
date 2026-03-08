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

export const toolSchemas = [
  {
    name: "scroll_up",
    description: "Scroll the page up by a certain amount.",
    parameters: {
      type: "OBJECT",
      properties: {
        pixels: {
          type: "NUMBER",
          description: "Number of pixels to scroll up (default: 500)"
        }
      }
    }
  },
  {
    name: "scroll_down",
    description: "Scroll the page down by a certain amount.",
    parameters: {
      type: "OBJECT",
      properties: {
        pixels: {
          type: "NUMBER",
          description: "Number of pixels to scroll down (default: 500)"
        }
      }
    }
  },
  {
    name: "navigate_to_section",
    description: "Navigate/scroll to a specific section of the page based on its ID.",
    parameters: {
      type: "OBJECT",
      properties: {
        sectionId: {
          type: "STRING",
          description: "The ID of the section to navigate to (e.g., 'home', 'about', 'projects', 'contact')"
        }
      },
      required: ["sectionId"]
    }
  },
  {
    name: "highlight_element",
    description: "Visually highlight an element on the page using a CSS selector or description.",
    parameters: {
      type: "OBJECT",
      properties: {
        selector: {
          type: "STRING",
          description: "The CSS selector of the element to highlight (e.g., '#projects', '.project-card')"
        },
        description: {
            type: "STRING",
            description: "A description of the element to highlight if selector is not known."
        }
      },
      required: ["selector"]
    }
  },
  {
    name: "click_element",
    description: "Click on a link or button on the page.",
    parameters: {
      type: "OBJECT",
      properties: {
        selector: {
          type: "STRING",
          description: "The CSS selector of the element to click."
        }
      },
      required: ["selector"]
    }
  },
  {
    name: "fill_input",
    description: "Fill out an input field or textarea (e.g., in the contact form).",
    parameters: {
      type: "OBJECT",
      properties: {
        selector: {
          type: "STRING",
          description: "The CSS selector of the input field."
        },
        value: {
          type: "STRING",
          description: "The text to fill into the input."
        }
      },
      required: ["selector", "value"]
    }
  },
  {
    name: "extract_page_content",
    description: "Re-extract the page content to get updated information about the current view.",
    parameters: {
      type: "OBJECT",
      properties: {}
    }
  }
];
