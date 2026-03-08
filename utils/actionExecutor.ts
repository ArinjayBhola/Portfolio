import { ToolCall } from '@/lib/tools';

export const executeAction = (call: ToolCall) => {
  const { tool, parameters } = call;

  switch (tool) {
    case 'scroll_down': {
      const pixels = parameters?.pixels || 500;
      window.scrollBy({ top: pixels, behavior: 'smooth' });
      break;
    }
    case 'scroll_up': {
      const pixels = parameters?.pixels || 500;
      window.scrollBy({ top: -pixels, behavior: 'smooth' });
      break;
    }
    case 'navigate_to_section': {
      const sectionId = parameters?.sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        highlightElement(element);
      }
      break;
    }
    case 'highlight_element': {
      const selector = parameters?.selector;
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightElement(element as HTMLElement);
      }
      break;
    }
    case 'click_element': {
      const selector = parameters?.selector;
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        element.click();
      }
      break;
    }
    case 'fill_input': {
      const { selector, value } = parameters as { selector: string; value: string };
      const element = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.value = value;
        // Trigger input event to notify React/form handlers
        element.dispatchEvent(new Event('input', { bubbles: true }));
        highlightElement(element);
      }
      break;
    }
    default:
      console.warn(`Tool ${tool} not implemented on frontend.`);
  }
};

const highlightElement = (element: HTMLElement) => {
  const originalTransition = element.style.transition;
  const originalBoxShadow = element.style.boxShadow;
  const originalZIndex = element.style.zIndex;

  element.style.transition = 'all 0.5s ease';
  element.style.boxShadow = '0 0 20px 5px rgba(59, 130, 246, 0.7)'; // primary blue glow
  element.style.zIndex = '50';
  element.classList.add('animate-pulse');

  setTimeout(() => {
    element.style.boxShadow = originalBoxShadow;
    element.style.transition = originalTransition;
    element.style.zIndex = originalZIndex;
    element.classList.remove('animate-pulse');
  }, 3000);
};
