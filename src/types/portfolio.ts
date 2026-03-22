export interface Personal {
  name: string;
  role: string;
  summary: string;
  linkedin: string;
  email: string;
  badges: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  iconType: string;
}

export interface Skill {
  name: string;
  iconType: string;
}

export interface Education {
  id: number;
  institution: string;
  course: string;
  period: string;
  status: string;
}

export interface Course {
  id: number;
  institution: string;
  course: string;
  duration: string;
  status: string;
}

export interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface PortfolioData {
  personal: Personal;
  experiences: Experience[];
  skills: Skill[];
  education: Education[];
  courses: Course[];
  projects: Project[];
}
