import { useAuth } from "../hooks/useAuth";

export const COURSES_BASE_PATH = "/v1/courses";

export interface Course {
    _id: string
    name: string;
    description: string;
    price: number;
    categories: string[];
    language: string;
    creator: string;
    score: number;
    access: string[];
    classes: string[];
    materials: string[];
}

export const useCoursesApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth();

    const basicHeaders = { "Content-Type": "application/json", Authorization: `Bearer ${authUser.token}` };

    const getCourses = async() => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/list`, 
            { 
                method: "GET",
                headers: basicHeaders
            }
        );
        return response;
    };

    const getBestCourses = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/best`, 
            { 
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        return response;
    };

    const addCourse = async (name: string, description: string, price: number, categories: string[], language: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/new`, 
            { 
                method: "POST",
                headers: basicHeaders,
                body: JSON.stringify({ name: name, description: description, price: price, categories: categories, language: language })
            }
        );
        return response;
    }

    const updateCourse = async (name: string, description: string, price: number, categories: string[], language: string, id: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/${id}`, 
            { 
                method: "PUT",
                headers: basicHeaders,
                body: JSON.stringify({ name: name, description: description, price: price, categories: categories, language: language })
            }
        );
        return response;
    }

    const deleteCourse = async (courseId: string) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/${courseId}`, 
            { 
                method: "DELETE",
                headers: basicHeaders
            }
        );
        return response;
    }
    
    return { getCourses, getBestCourses, addCourse, updateCourse, deleteCourse };
};