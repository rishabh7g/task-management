export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export enum TaskFieldType {
    TITLE = 'TITLE',
    DESCRIPTION = 'DESCRIPTION',
    STATUS = 'STATUS',
}
