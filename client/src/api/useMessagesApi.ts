import { useAuth } from "../hooks/useAuth";

export const USERS_BASE_PATH = "/v1/users/me";

export const useMessagesApi = () => {
    const { fetchWithInterceptor, authUser } = useAuth();

    const basicHeaders = { "Content-Type": "application/json", Authorization: `Bearer ${authUser.token}` };

    const getMessagesMe = async(params: URLSearchParams) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/messages?${params}`, 
            { 
                method: "GET",
                headers: basicHeaders
            }
        );
        return response;
    };

    const updateMessage = async (id: string, subject: string, message: string) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/messages/${id}`, 
            { 
                method: "PATCH",
                headers: basicHeaders,
                body: JSON.stringify({ subject: subject, message: message })
            }
        );
        return response;
    }

    const openMessage = async (id: string) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/messages/${id}/open`, 
            { 
                method: "PATCH",
                headers: basicHeaders
            }
        );
        return response;
    }

    const deleteMessage = async (id: string) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/messages/${id}`, 
            { 
                method: "DELETE",
                headers: basicHeaders
            }
        );
        return response;
    }

    const createMessage = async (message: object) => {
        const response = await fetchWithInterceptor(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/messages/new`, 
            { 
                method: "POST",
                headers: basicHeaders,
                body: JSON.stringify(message)
            }
        );
        return response;
    }
    
    return { getMessagesMe, updateMessage, openMessage, deleteMessage, createMessage };
};