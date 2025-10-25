export type ToolCategoryId =
  | "writing"
  | "communication"
  | "visual"
  | "content"
  | "development"
  | "professional"
  | "creativity"
  | "travel"
  | "learning"
  | "community"
  | "legal";

export type ToolMeta = {
  name: string;
  href: string;
  category: ToolCategoryId;
  icon: string; // lucide-react icon identifier to be mapped by consumers
  keywords?: string[];
};

export const categories: { id: ToolCategoryId; label: string; order: number }[] = [
  { id: "writing", label: "Writing", order: 1 },
  { id: "communication", label: "Communication", order: 2 },
  { id: "visual", label: "Visual", order: 3 },
  { id: "content", label: "Content", order: 4 },
  { id: "development", label: "Development", order: 5 },
  { id: "professional", label: "Professional", order: 6 },
  { id: "creativity", label: "Creativity", order: 7 },
  { id: "travel", label: "Travel", order: 8 },
  { id: "learning", label: "Learning", order: 9 },
  { id: "community", label: "Community", order: 10 },
  { id: "legal", label: "Legal", order: 11 },
];

export const tools: ToolMeta[] = [
  // Communication / Chat
  { name: "Ask AIToolbox", href: "/chatbot", category: "communication", icon: "MessagesSquare", keywords: ["chat", "assistant"] },

  // Writing
  { name: "AI Email Writer", href: "/email-writer", category: "writing", icon: "Mail" },
  { name: "AI Translator", href: "/ai-translator", category: "writing", icon: "Globe" },
  { name: "AI Blog Writer", href: "/blog-writer", category: "writing", icon: "PenTool" },
  { name: "AI Grammar Fixer", href: "/grammar-fixer", category: "writing", icon: "Check" },
  { name: "AI Cover Letter Generator", href: "/cover-letter-generator", category: "writing", icon: "FileUser" },
  { name: "AI Bio Generator", href: "/ai-bio-generator", category: "writing", icon: "Siren" },
  { name: "AI LinkedIn Post Generator", href: "/linkedin-post-generator", category: "writing", icon: "Linkedin" },
  { name: "AI Prompt Generator", href: "/prompt-generator", category: "writing", icon: "PenTool" },
  { name: "Product Description Generator", href: "/product-description-generator", category: "writing", icon: "Pen" },

  // Visual / Design
  { name: "AI Image Generator", href: "/image-generator", category: "visual", icon: "ImageIcon" },
  { name: "AI Anime Image Generator", href: "/anime-ai-generator", category: "visual", icon: "ImageIcon" },
  { name: "AI Logo Generator", href: "/logo-generator", category: "visual", icon: "Box" },

  // Content & Media
  { name: "AI YouTube Summarizer", href: "/youtube-summarizer", category: "content", icon: "Youtube" },
  { name: "AI PPT Builder", href: "/ai-ppt-builder", category: "content", icon: "Presentation" },
  { name: "AI Text Summarizer", href: "/text-summarizer", category: "content", icon: "FileText" },
  { name: "AI YouTube Ideas", href: "/youtube-idea-generator", category: "content", icon: "Video" },
  { name: "AI Blog Ideas", href: "/blog-idea-generator", category: "content", icon: "Newspaper" },

  // Development / Learning
  { name: "AI Code Explainer", href: "/code-explainer", category: "development", icon: "Code" },
  { name: "AI Project Recommender", href: "/project-recommender", category: "learning", icon: "Target" },

  // Professional
  { name: "AI Resume Builder", href: "/resume-builder", category: "professional", icon: "FileSpreadsheet" },
  { name: "AI Mock Interview", href: "/mock-interview", category: "professional", icon: "Briefcase" },

  // Creativity / Ideas
  { name: "AI Idea Generator", href: "/idea-generator", category: "creativity", icon: "Lightbulb" },
  { name: "AI Startup Ideas", href: "/startup-idea-generator", category: "creativity", icon: "Rocket" },
  { name: "AI App Ideas", href: "/app-idea-generator", category: "creativity", icon: "Smartphone" },
  { name: "AI Product Ideas", href: "/product-idea-generator", category: "creativity", icon: "Package" },

  // Travel
  { name: "AI Trip Planner", href: "/trip-planner", category: "travel", icon: "MapPin" },

  // Community / Docs
  { name: "Community", href: "/community", category: "community", icon: "Users" },
  { name: "Blog", href: "/blog", category: "community", icon: "PenTool" },

  // Legal / Policies
  { name: "Privacy-Policy", href: "/privacy-policy", category: "legal", icon: "Scale" },
  { name: "Cookie-Policy", href: "/cookie-policy", category: "legal", icon: "Cookie" },
  { name: "Terms of Service", href: "/terms-of-service", category: "legal", icon: "ReceiptText" },
  { name: "DMCA Policy", href: "/dmca-policy", category: "legal", icon: "Siren" },
];