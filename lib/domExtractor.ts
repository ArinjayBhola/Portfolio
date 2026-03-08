/**
 * Utility to extract structured content from the DOM.
 * This is used to provide context to the Gemini AI.
 */

export interface PageContent {
  sections: Array<{ id: string; title: string; text: string }>;
  projects: Array<{ title: string; description: string }>;
  skills: string[];
  links: Array<{ text: string; id?: string; className?: string }>;
  inputs: Array<{ name: string; placeholder: string; id: string }>;
}

export const extractPageContent = (): PageContent => {
  if (typeof window === 'undefined') return { sections: [], projects: [], skills: [], links: [], inputs: [] };

  const sections: PageContent['sections'] = [];
  const projects: PageContent['projects'] = [];
  const skills: string[] = [];
  const links: PageContent['links'] = [];
  const inputs: PageContent['inputs'] = [];

  // Extract sections
  const sectionElements = document.querySelectorAll('section[id]');
  sectionElements.forEach((section) => {
    const id = section.id;
    const titleElement = section.querySelector('h1, h2, h3');
    const title = titleElement ? titleElement.textContent?.trim() || id : id;
    const text = Array.from(section.querySelectorAll('p'))
      .map(p => p.textContent?.trim())
      .filter(Boolean)
      .join(' ');
    
    sections.push({ id, title, text });
  });

  // Extract projects (looking for common patterns in ProjectCard)
  const projectArticles = document.querySelectorAll('article');
  projectArticles.forEach((article) => {
    const title = article.querySelector('h3')?.textContent?.trim() || '';
    const description = article.querySelector('p')?.textContent?.trim() || '';
    if (title) {
        projects.push({ title, description });
    }
  });

  // Extract skills (assuming they are in spans or divs with specific background colors)
  // From About.tsx, we see skill items have text inside spans
  const skillElements = document.querySelectorAll('#about div.flex.flex-wrap span');
  skillElements.forEach(el => {
    const text = el.textContent?.trim();
    if (text && !skills.includes(text)) {
        skills.push(text);
    }
  });

  // Extract links and buttons for tool interaction
  const anchorElements = document.querySelectorAll('a, button');
  anchorElements.forEach(el => {
      const text = el.textContent?.trim() || '';
      if (text) {
          links.push({
              text,
              id: el.id || undefined,
              className: el.className || undefined
          });
      }
  });

  // Extract inputs (e.g., contact form)
  const inputElements = document.querySelectorAll('input, textarea');
  inputElements.forEach(el => {
      const input = el as HTMLInputElement | HTMLTextAreaElement;
      inputs.push({
          name: input.name || input.id || '',
          placeholder: input.placeholder || '',
          id: input.id || ''
      });
  });

  return {
    sections,
    projects,
    skills,
    links,
    inputs
  };
};
