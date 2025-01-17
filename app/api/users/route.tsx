import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todas os usuarios (GET)
export async function GET() {
    const user = await prisma.user.findMany();
    return NextResponse.json(user);
}

// Criar um novo usuario (POST)
export async function POST(request: Request) {
    const body = await request.json();
    const user = await prisma.user.create({ data: body });
    return NextResponse.json(user);
}

// Atualizar um usuario (PUT)
export async function PUT(request: Request) {
    const body = await request.json();
    const user = await prisma.user.update({
        where: { id: body.id },
        data: body,
    });
    return NextResponse.json(user);
}

// Deletar um usuario (DELETE)
export async function DELETE(request: Request) {
    const body = await request.json();
    await prisma.user.delete({ where: { id: body.id } });
    return NextResponse.json({ message: "Usuario deletado com sucesso" });
}
