"use client"

import Homepage from "@/app/components/template/page";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState([]);

    // Fetch inicial para carregar os usuários
    useEffect(() => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    // Função para adicionar um novo usuário na lista local
    const handleAddUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]); // Atualiza a lista localmente
    };

    return (
        <Homepage>
            <div>
                <h1>Usuários</h1>
                <AddUserForm onAddUser={handleAddUser} />
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email} - {user.password}
                        </li>
                    ))}
                </ul>
            </div>
        </Homepage>
    );
}

function AddUserForm({ onAddUser }) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };

        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const newUser = await response.json(); // Recebe o usuário criado do backend
            onAddUser(newUser); // Atualiza a lista local sem recarregar a página
            event.target.reset(); // Limpa os campos do formulário
        } else {
            alert("Erro ao adicionar usuário!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nome" required />
            <input name="email" type="email" placeholder="E-mail" required />
            <input name="password" type="password" placeholder="Senha" required />
            <button type="submit">Adicionar</button>
        </form>
    );
}
