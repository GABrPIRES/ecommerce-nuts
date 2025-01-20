"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }

        // Decodifica o token para obter as informações do usuário
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser(userData);
    }, [router]);

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user.name}</h1>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">ID: {user.id}</p>
            <p className="text-gray-600">ID: {user.address.street}</p>
        </div>
    );
}
