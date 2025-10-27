import { useMemo } from "react";
import type { Courses } from "../types/userType";

export function useSortedCourses(courses: Courses[] | null) {
    const sortedCourses = useMemo(() => {
        if (!courses) return [];
        return [...courses].sort((a, b) => a.name.localeCompare(b.name, "vi", { sensitivity: "base" }));
    }, [courses]);

    return sortedCourses;
}
