// Perfil
export interface Profile {
  name: string;
  surname: string;
  email: string;
  phone: string;
  summary: string;
  photo?: string; // base64 o URL
}

// Educación
export interface EducationItem {
  title: string;
  institution: string;
  startYear: number | null;
  endYear: number | null;
}

// Experiencia
export interface ExperienceItem {
  role: string;
  company: string;
  startYear: number | null;
  endYear: number | null;
  description: string;
}

// Skills
export interface SkillItem {
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
}

// Modelo general del CV
export interface CV {
  profile: Profile;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
}