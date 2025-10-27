// type user ========================
export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    rule: "admin" | "user"
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

// type courses =====================
export interface Courses {
    id?: number;
    name: string;
    type: string;
    description: string;
    price: number;
    imageUrl: string
}
export interface CoursesState {
    courses: Courses[];
    loading: boolean;
    error: string | null;
}