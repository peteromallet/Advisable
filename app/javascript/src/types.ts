export interface ProjectType {
  id: string;
  primarySkill?: string;
  companyDescription?: string;
}

export interface ApplicationType {
  id: string;
  status?: string;
  introduction?: string;
  availability?: string;
  project: ProjectType;
  questions?: ApplicationQuestionType[];
  previousProjects: PreviousProjectType[]
  rate: string;
  acceptsFee: boolean;
  acceptsTerms: boolean;
}

type PreviousProjectType = ProjectType | OffPlatformProjectType

interface ApplicationQuestionType {
  question: string;
  answer?: string;
}

export interface OffPlatformProjectType {
  id: string
}