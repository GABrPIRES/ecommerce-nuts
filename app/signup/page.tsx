"use client";

import Homepage from "@/app/components/template/page";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter(); // Hook para manipular o redirecionamento

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Obtem os dados do formulário
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            addresses: [
                {
                    street: event.target.street.value,
                    city: event.target.city.value,
                    state: event.target.state.value,
                    zipCode: event.target.zipCode.value,
                    country: event.target.country.value,
                },
            ],
        };

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Usuário registrado com sucesso!");
                router.push("/login");
            } else {
                const { error } = await response.json();
                setErrorMessage(error || "Erro ao registrar o usuário.");
            }
        } catch (error) {
            setErrorMessage("Erro ao conectar ao servidor.");
        }
    };

    return (
        <Homepage>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Registrar Usuário</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" type="text" placeholder="Nome" required className="w-full p-2 border rounded" />
                    <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
                    <input name="password" type="password" placeholder="Senha" required className="w-full p-2 border rounded" />
                    <input name="street" type="text" placeholder="Rua" required className="w-full p-2 border rounded" />
                    <input name="city" type="text" placeholder="Cidade" required className="w-full p-2 border rounded" />
                    <input name="state" type="text" placeholder="Estado" required className="w-full p-2 border rounded" />
                    <input name="zipCode" type="text" placeholder="CEP" required className="w-full p-2 border rounded" />
                    <input name="country" type="text" placeholder="País" required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Registrar
                    </button>
                </form>
            </div>
        </Homepage>
    );
}
