"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Homepage from "../components/template/page";
import Link from "next/link";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const { token } = await response.json();
                document.cookie = `token=${token}; path=/; max-age=3600;`;
                window.location.href = "/"
            } else {
                const { error } = await response.json();
                setErrorMessage(error || "Erro ao fazer login.");
            }
        } catch (error) {
            setErrorMessage("Erro ao conectar ao servidor.");
        }
    };

    return (
        <Homepage>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
                    <input name="password" type="password" placeholder="Senha" required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Entrar</button>
                </form>
            </div>
        </Homepage>

    );
}
