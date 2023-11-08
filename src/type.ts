export interface Res<T> {
  code: string;
  data: T;
  message: string;
}

export interface IJob {
  id: string;
  title: string;
  team: string;
  description: string;
  shortDescription: string;
  isSpotlight: boolean;
  minimumQualifications: string;
  responsibilities: string;
  benefits: string;
  expireDate: string;
  campaignId: string;
}

export enum AnswerType {
  FILE = 'FILE',
  TEXT = 'TEXT',
  MULTIPLE_ANSWER = 'MULTIPLE_ANSWERS',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  DATE_TIME = 'DATE_TIME',
  CHECKBOX = 'CHECKBOX'
}

export interface IAnswerOfDateQuestion {
  day: number
  month: number
  year: number
}

export interface IAnswerOfDateTimeQuestion {
  day: number
  month: number
  year: number
  hour: number
  minute: number
  second: number
}

export interface IJobFormAnswer {
  questionId: string
  answerOfTextQuestion?: string | null
  answerOfMultipleAnswerQuestion?: string | null
  answerOfCheckBoxQuestion?: string[] | null
  answerOfFileUploadQuestion?: string | null
  answerOfDateQuestion?: IAnswerOfDateQuestion | null
  answerOfDateTimeQuestion?: IAnswerOfDateTimeQuestion | null
  answerOfNumberQuestion?: number | null
}

export interface IJobFormQuestion {
  id: string
  question: string
  answerType: AnswerType
  options?: {
    id: string
    description: string
  }[]
  allowedFileExtensions?: string[]
  upperBound?: number
  lowerBound?: number
  isRequired: boolean
}

export interface IJobFormQuestionPart {
  questions: IJobFormQuestion[]
  title: string
  ordinal: number
}

export interface IJobForm {
  jobId: string
  closeAt: string
  openAt: string
  parts: IJobFormQuestionPart[]
}

export interface IAnswer {
  answers: any[];
  jobId: string;
  nonMemberId: string;
  _id: {
    $oid: string;
  }
}

export interface IUser {
  id: string
  name?: string
  email: string
  avatar?: string
}

export enum Mode {
  DEFAULT = 'DEFAULT',
  BY_ANSWER = 'BY_ANSWER',
  SMART = 'SMART'
}