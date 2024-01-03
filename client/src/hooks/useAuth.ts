import { useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../contexts/authContext";
import { USERS_BASE_PATH } from "../api/useUsersApi";

export interface AuthUserContext {
    user: AuthUser | null;
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
}

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePicture: string;
    plan: planEnum;
    coinsAmount: number;
}
  
type planEnum = "Free" | "Pro" | "Premium";

export const useAuth = () => {
    const { authUser, setAuthUser } = useContext(AuthContext);
    const { getItem, setItem, removeItem } = useLocalStorage();

    const addUser = (user: AuthUser, token: string) => {
        setAuthUser({ user: user, isAuthenticated: true, token: token, isLoading: false });
        setItem("token", token);
    };

    const removeUser = () => {
        setAuthUser({ user: null, isAuthenticated: false, token: "", isLoading: false });
        removeItem("token");
    };

    useEffect(() => {
        const token = getItem("token");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/me`, 
                {method: 'GET', headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}})
            .then((response: Response) => {
                if (response.ok) {
                    response.json().then((dataResponse) => {
                        const user = dataResponse.data;
                        let userData = {
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            profilePicture: user.profilePicture,
                            plan: user.plan,
                            coinsAmount: user.coinsAmount
                        };
                        addUser(userData, token);
                    });
                } else {
                    removeUser();
                }
            });
        } else {
            removeUser();
        }
    }, []);

    const login = (user: AuthUser, token: string) => {
        addUser(user, token);
    };

    const logout = () => {
        removeUser();
    };


    const fetchWithInterceptor = async (url:RequestInfo|URL, options?:RequestInit) =>{
        const response = await fetch(url, options);
        const newToken = response.headers.get("Authorization")?.split("Bearer ")[1].trim();
        if (newToken &&
            newToken !== getItem("token")) {
            if (authUser.user) {
                login(authUser.user, newToken);
            } else {
                fetch(`${process.env.REACT_APP_API_URL}${USERS_BASE_PATH}/me`, 
                    {method: 'POST', headers: {"Content-Type": "application/json", "Authorization": `Bearer ${newToken}`}})
                .then((response: Response) => {
                    if (response.ok) {
                        response.json().then((dataResponse) => {
                            const user = dataResponse.data;
                            let userData = {
                                id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                email: user.email,
                                profilePicture: user.profilePicture,
                                plan: user.plan,
                                coinsAmount: user.coinsAmount
                            };
                            addUser(userData, newToken);
                        });
                    } else {
                        removeUser();
                    }
                }).catch((error) => {
                    console.log(error);
                    removeUser();
                });
            }

        }
        return response;
    }

    return { authUser, login, logout, setAuthUser, fetchWithInterceptor };
};