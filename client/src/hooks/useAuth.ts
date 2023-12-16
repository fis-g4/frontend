import { useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../context/authContext";

export interface AuthUserContext {
    user: AuthUser | null;
    isAuthenticated: boolean;
    token: string;
}

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photoURL: string;
    plan: planEnum;
    coins: number;
}
  
type planEnum = "Free" | "Pro" | "Premium";

export const useAuth = () => {
    const { authUser, setAuthUser } = useContext(AuthContext);
    const { getItem, setItem, removeItem } = useLocalStorage();

    const addUser = (user: AuthUser, token: string) => {
        setAuthUser({ user: user, isAuthenticated: true, token: token });
        setItem("user", JSON.stringify(user));
        setItem("token", token);
    };

    const removeUser = () => {
        setAuthUser({ user: null, isAuthenticated: false, token: "" });
        removeItem("user");
        removeItem("token");
    };

    useEffect(() => {
        // eslint-disable-next-line
        const token = getItem("token");
        if (token) {
            // Habría que llamar a la API para comprobar que el token es válido y obtener los datos del usuario. En este caso, como no tenemos API, lo simulamos con el localStorage (esto significa que el objeto user del local storage debe ser eliminado en versiones futuras).
            // eslint-disable-next-line
            const user = getItem("user");
            // eslint-disable-next-line
            if (user) addUser(JSON.parse(user), token);
        }
    }, []);

    const login = (user: AuthUser, token: string) => {
        addUser(user, token);
    };

    const logout = () => {
        removeUser();
    };

    return { authUser, login, logout, setAuthUser };
};