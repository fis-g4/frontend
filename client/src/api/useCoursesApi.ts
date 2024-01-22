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

    const addCourse = async (name: string, description: string, price: number, categories: string[], language: string) => {
        console.log(name + " " + description + " " + price.toString() + " " + categories[0] + " " + language)
        const response = await fetch(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/new`, 
            { 
                method: "POST",
                headers: basicHeaders,
                body: JSON.stringify({ name: name, description: description, price: price, categories: categories, language: language })
            }
        );
        return response;
    }
    

    const updateCourse = async (course: any) => {
        
        let formData = new FormData()
        for(let key in course){
            formData.append(key, course[key])
        }
        
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${COURSES_BASE_PATH}/${course.id}`, 
            { 
                method: "PUT",
                headers: { Authorization: `Bearer ${authUser.token}`},
                body: formData
            }
        );
        return response;
    }
    
    return { getCourses, getBestCourses, addCourse, updateCourse };
};