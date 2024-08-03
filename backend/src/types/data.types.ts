export interface User {
    id: string;
    email: string;
    password: string;
    tasks: Task[];
    roles: string[];
    refreshToken?: string;
}

export interface StoredData {
    users: User[];
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
}
