"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Homepage from "../components/template/page";

export default function DashboardPage(request: Request) {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [error, setErrorMessage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const cookie = document.cookie
            ?.split("; ")
            .find((cookie) => cookie.startsWith("token="));
        const token = cookie?.split("=")[1];

        // Decodifica o token para obter as informações do usuário
        const userData = JSON.parse(atob(token.split(".")[1]));
        console.log(userData)

        fetch(`/api/users`)
            .then((res) => res.json())
            .then((data) => {
                const foundUser = data.find((user) => user.id === userData.id);
                if (foundUser) {
                    setUser(foundUser);
                } else {
                    setErrorMessage("Produto não encontrado.");
                }
            })
            .catch(() => setErrorMessage("Erro ao carregar o produto."));

        fetch(`/api/adresses`)
            .then((res) => res.json())
            .then((data) => {
                const foundAddresses = data.find((adresses) => adresses.userId === userData.id);
                if (foundAddresses) {
                    setAddresses(foundAddresses);
                } else {
                    setErrorMessage("Produto não encontrado.");
                }
            })
            .catch(() => setErrorMessage("Erro ao carregar o produto."));
    }, [router]);

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <Homepage>
            <div className="max-w-6xl mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user.name}</h1>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">ID: {user.id}</p>
                <p className="text-gray-600">ID: {addresses.street}</p>
            </div>
        </Homepage>
    );
}
