
export interface SpecialistType { 
  id: string;
  email?: string;
  airtableId?: string;
  bio?: string;
  skills?: string[];
}

export interface UserType {
  id: string;
}

export interface ProjectType {
  id: string;
  description?: string;
  primarySkill?: string;
  companyDescription?: string;
  questions?: string[];
  estimatedBudget?: string;
}

export interface ApplicationType {
  id: string;
  airtableId?: string;
  status?: string;
  appliedAt?: string;
  introduction?: string;
  availability?: string;
  project?: ProjectType;
  questions?: ApplicationQuestionType[];
  previousProjects?: PreviousProjectType[];
  interviewRequest?: InterviewType;
  rate?: string;
  acceptsFee?: boolean;
  acceptsTerms?: boolean;
}

export interface InterviewType {
  id: string;
}

type PreviousProjectType = ProjectType | OffPlatformProjectType;

interface ApplicationQuestionType {
  question: string;
  answer?: string;
}

export interface OffPlatformProjectType {
  id: string;
}

export interface Task {
  id: string;
  name?: string;
  status: string;
  estimate?: number;
  dueDate?: string;
  description?: string;
}