import { Project } from "@/types/project";
import { TechnicalSkill, Technology } from "@/types/technology";
import {
  IconDefinition,
  faBriefcase,
  faBusinessTime,
  faClock,
  faCode,
  faFileContract,
  faGraduationCap,
  faHouseLaptop,
  faPalette,
  faPeopleRoof,
  faUserTie,
} from "@fortawesome/pro-regular-svg-icons";
import { Role } from "@prisma/client";
import edjsHTML from "editorjs-html";

export const HOME_PAGES = ["/dashboard", "/careers", "/courses", "/admin"];

export const ONBOARDING_PAGES = ["/login", "/register", "/forgot-password"];

export const JOB_TAGS = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Freelance",
  "Temporary",
  "Contract",
  "Remote",
  "Developer",
  "Designer",
  "Management",
];

export const TAG_ICONS = (tag: string) => {
  const icons: { [key: string]: IconDefinition } = {
    "Full-Time": faClock,
    "Part-Time": faClock,
    Internship: faGraduationCap,
    Freelance: faUserTie,
    Temporary: faBusinessTime,
    Contract: faFileContract,
    Remote: faHouseLaptop,
    Developer: faCode,
    Designer: faPalette,
    Management: faPeopleRoof,
  };
  return icons[tag] ?? faBriefcase;
};

export const YEARS = Array.from(
  { length: 58 },
  (_, i) => i + new Date().getFullYear() - 50
).reverse();

export const STATUS_TEXT: (status: string) => {
  text: string;
  color: "success" | "error" | "info" | "warning";
} = (status: string) => {
  switch (status) {
    case "incomplete":
      return { text: "Incomplete", color: "warning" };
    case "accepted":
      return { text: "Approved", color: "success" };
    case "rejected":
      return { text: "Rejected", color: "error" };
    case "withdrawn":
      return { text: "Withdrawn", color: "error" };
    case "hired":
      return { text: "Hired", color: "success" };
    default:
      return { text: "Pending Review", color: "info" };
  }
};

export const CATEGORIES = [
  "Accessibility",
  "Artificial Intelligence",
  "Career Advice",
  "Cloud Computing",
  "Cover Letter",
  "Cybersecurity",
  "Data Science",
  "DevOps",
  "Digital Marketing",
  "Diversity & Inclusion",
  "Freelancing",
  "Game Development",
  "Interviewing",
  "Job Search",
  "Leadership",
  "Machine Learning",
  "Mental Health",
  "Mobile Development",
  "Networking",
  "Personal Development",
  "Product Management",
  "Remote Work",
  "Resume",
  "Salary Negotiation",
  "Software Engineering",
  "UI/UX Design",
  "Web Development",
  "Work-Life Balance",
];

export const CODING = "coding";
export const TEXT = "text";

export const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "CSS",
  "LESS",
  "SCSS",
  "JSON",
  "HTML",
  "XML",
  "PHP",
  "C#",
  "C++",
  "Razor",
  "Markdown",
  "Diff",
  "Java",
  "VB",
  "CoffeeScript",
  "Handlebars",
  "Batch",
  "Pug",
  "F#",
  "Lua",
  "Powershell",
  "Python",
  "Ruby",
  "SASS",
  "R",
  "Objective-C",
];

export const READ_TIME = (text: string) => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s+/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
};

export const JSON_TO_HTML = (content: string) => {
  const blocks = JSON.parse(JSON.parse(content));
  const edjsParser = edjsHTML();
  const html = edjsParser.parse({ blocks });
  return html.toString().replace(/>,</g, "> <");
};

export const MATCH_ROLE = (roles: Role[], role: Role) => {
  if (roles.includes("admin") || roles.includes(role)) return true;
  return false;
};

export const PROJECTS: Project[] = [
  {
    name: "Wifeplanet",
    image: "/images/projects/wifeplanet.webp",
    logo: "/images/projects/wifeplanet-logo.svg",
    url: "xxxxxx",
  },
  {
    name: "Rodroute",
    image: [
      "/images/projects/rodroute1.webp",
      "/images/projects/rodroute2.webp",
      "/images/projects/rodroute3.webp",
      "/images/projects/rodroute4.webp",
    ],
    logo: "/images/projects/rodroute-logo.jpg",
  },
  {
    name: "GoatMentor",
    image: "/images/projects/goatmentor.webp",
    logo: "/images/projects/goatmentor-logo.png",
    url: "xxxxxx",
  },
];

export const COURSE_DURATION = (duration: number, long: boolean = false) => {
  if (duration < 3600)
    return `${Math.round(duration / 60)} ${long ? "minutes" : "min"}`;
  const hours = Math.round(duration / 3600);
  return `${hours} ${long ? "hour" : "hr"}${hours === 1 ? "" : "s"}`;
};

export const TECHNOLOGIES: Technology[] = [
  {
    key: "html-and-css",
    label: "HTML & CSS",
    icon: "/images/tech/html-css.webp",
  },
  {
    key: "javascript",
    label: "JavaScript",
    icon: "/images/tech/js.svg",
  },
  {
    key: "react",
    label: "React js",
    icon: "/images/tech/react.svg",
  },
  {
    key: "react-native",
    label: "React Native",
    icon: "/images/tech/react-native.svg",
  },
  {
    key: "nodejs",
    label: "Node.js",
    icon: "/images/tech/node.svg",
  },
  {
    key: "python",
    label: "Python",
    icon: "/images/tech/python.svg",
  },
  {
    key: "flutter",
    label: "Flutter",
    icon: "/images/tech/flutter.svg",
  },
  {
    key: "solidity",
    label: "Solidity",
    icon: "/images/tech/solidity.svg",
  },
  {
    key: "blockchain",
    label: "Blockchain",
    icon: "/images/tech/blockchain.webp",
  },
  {
    key: "ui-design",
    label: "UI Design",
    icon: "/images/tech/figma.svg",
  },
  {
    key: "graphic-design",
    label: "Graphic Design",
    icon: "/images/tech/graphic-design.webp",
  },
  {
    key: "project-management",
    label: "Project Management",
    icon: "/images/tech/project-management.webp",
  },
  {
    key: "technical-writing",
    label: "Technical Writing",
    icon: "/images/tech/technical-writing.webp",
  },
];

export const TECHNICAL_SKILLS: TechnicalSkill[] = [
  {
    key: "communication",
    label: "Communication Skills",
  },
  {
    key: "language",
    label: "English Language Skills",
  },
  {
    key: "attitude",
    label: "Attitude",
  },
  {
    key: "experience",
    label: "Experience Level",
  },
  {
    key: "testing-results",
    label: "Testing results",
  },
];
