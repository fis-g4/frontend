import { useAuth } from "../hooks/useAuth";

export const COURSES_BASE_PATH = "/v1/courses";

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
    
    return { getCourses, getBestCourses };
};