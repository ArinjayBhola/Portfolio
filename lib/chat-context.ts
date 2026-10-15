import { experiences, projects } from "./data";

// Use the same content as the portfolio, including experience hidden in tabs.
export const portfolioKnowledge = {
  experiences,
  projects: projects.map(
    ({ id, title, description, techStack, liveUrl, githubLink }) => ({
      id: `project-${id}`,
      title,
      description,
      techStack,
      liveUrl,
      githubLink,
    }),
  ),
  contact: { email: "arinjay26bhola@gmail.com" },
};

export function sectionAnswer(
  question: string,
  target?: string,
  pageContext?: any,
): string {
  const query = question.toLowerCase();
  const specificExperience = experiences.find(
    (item) =>
      query.includes(item.company.toLowerCase().replace(" pvt. ltd.", "")) ||
      target === `experience-${item.slug}`,
  );
  if (specificExperience)
    return `**${specificExperience.role} at ${specificExperience.company}** (${specificExperience.duration})\n\n${specificExperience.description.map((line) => `- ${line}`).join("\n")}`;
  if (
    /experience|career|internship|work history|companies/.test(query) ||
    target === "experience"
  ) {
    return experiences
      .map(
        (item) =>
          `**${item.company} — ${item.role}**\n${item.duration}\n${item.description[0]}`,
      )
      .join("\n\n");
  }
  if (/contact|email|reach|hire/.test(query) || target === "contact")
    return "You can email Arinjay at **arinjay26bhola@gmail.com**, or use the contact form below with your name, email, and message.";
  const project = projects.find(
    (item) =>
      target === `project-${item.id}` ||
      query.includes(item.title.toLowerCase()),
  );
  if (project)
    return `**${project.title}**\n\n${project.description}\n\n**Stack:** ${project.techStack.join(", ")}.\n\n[Live project](${project.liveUrl}) · [Source code](${project.githubLink})`;
  if (/projects|portfolio|work/.test(query) || target === "projects")
    return projects
      .map((item) => `**${item.title}** — ${item.description}`)
      .join("\n\n");
  const section = Array.isArray(pageContext?.sections)
    ? pageContext.sections.find((item: any) => item.id === target)
    : undefined;
  return typeof section?.text === "string"
    ? section.text.trim().slice(0, 1800)
    : "";
}
