import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

type AddressInput = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};

// Criar um novo usuário (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, addresses } = body;

        // Valida os dados obrigatórios
        if (!name || !email || !password || !addresses || addresses.length === 0) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        // Verifica se o usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Usuário já registrado" }, { status: 400 });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário e o endereço
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                addresses: {
                    create: addresses.map((address: AddressInput) => ({
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        zipCode: address.zipCode,
                        country: address.country,
                    })),
                },
            },
            include: {
                addresses: true, // Retorna os endereços junto com o usuário
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Erro ao registrar o usuário:", error);
        return NextResponse.json({ error: "Erro ao registrar o usuário" }, { status: 500 });
    }
}
