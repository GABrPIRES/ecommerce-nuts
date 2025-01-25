"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any; // Pode ser tipado conforme necessário
    setUser: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Verifica o token nos cookies
        const cookie = document.cookie
            ?.split("; ")
            .find((cookie) => cookie.startsWith("token="));
        const token = cookie?.split("=")[1];

        if (token) {
            try {
                const userData = JSON.parse(atob(token.split(".")[1]));
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                setIsAuthenticated(false);
            }
        }
    }, []);

    const logout = () => {
        document.cookie = "token=; path=/; max-age=0"; // Remove o token
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login")
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
