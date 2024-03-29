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

    const updateUser = async (user: any) => {
        
        let formData = new FormData()
        formData.append("profilePicture", user.profilePicture)
        delete user.profilePicture
        for(let key in user){
            formData.append(key, user[key])
        }
        
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/me`, 
            { 
                method: "PUT",
                headers: { Authorization: `Bearer ${authUser.token}`},
                body: formData
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

    const deleteUser = async () => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/me`, 
            { 
                method: "DELETE",
                headers: basicHeaders
            }
        );
        return response;
    }

    const resetPassword = async (params: URLSearchParams) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/reset?${params}`, 
            { 
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        return response;
    }
    
    return { getUsersMe, loginUser, registerUser, updateUser, getAllUsers, deleteUser, resetPassword };
};