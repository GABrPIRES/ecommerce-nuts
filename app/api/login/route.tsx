import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET; // Use uma variável de ambiente em produção

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    console.log(body)

    if (!secretKey) {
        throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
    }

    if (!email || !password) {
        return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: "Credenciais inválidas - Usuário" }, { status: 401 });
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Credenciais inválidas - Senha" }, { status: 401 });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            secretKey,
            { expiresIn: "1h" }
        );

        return NextResponse.json({ token }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
    }
}
