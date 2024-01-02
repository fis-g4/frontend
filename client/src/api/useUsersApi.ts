import { useAuth } from "../hooks/useAuth";

export const USERS_BASE_PATH = "/v1/users";

export const useUsersApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth();

    const basicHeaders = { "Content-Type": "application/json", Authorization: `Bearer ${authUser.token}` };

    const getUsersMe = async() => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/me`, 
            { 
                method: "GET",
                headers: basicHeaders
            }
        );
        return response;
    };

    const loginUser = async (username: string, password: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/login`, 
            { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password })
            }
        );
        return response;
    };

    const registerUser = async (firstName: string, lastName: string, username: string, password: string, email: string) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/new`, 
            { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password, email: email })
            }
        );
        return response;
    }

    const updateUser = async (user: object) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/me`, 
            { 
                method: "PUT",
                headers: basicHeaders,
                body: JSON.stringify(user)
            }
        );
        return response;
    }

    const getAllUsers = async () => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/all`, 
            { 
                method: "GET",
                headers: basicHeaders
            }
        );
        return response;
    }
    
    return { getUsersMe, loginUser, registerUser, updateUser, getAllUsers };
};