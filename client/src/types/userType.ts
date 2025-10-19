export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}