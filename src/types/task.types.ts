export interface Task {
  id: number;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
}

export enum TaskCategory {
  PERSONAL = "PERSONAL",
  WORK = "WORK",
  SHOPPING = "SHOPPING",
  OTHER = "OTHER",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum TaskFieldType {
  TITLE = "TITLE",
  DESCRIPTION = "DESCRIPTION",
  CATEGORY = "CATEGORY",
  STATUS = "STATUS",
}
