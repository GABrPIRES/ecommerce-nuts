import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const address = await prisma.address.findMany();
    return NextResponse.json(address);
}

// Criar um novo endereco (POST)
export async function POST(request: Request) {
    const body = await request.json();
    const address = await prisma.address.create({ data: body });
    return NextResponse.json(address);
}

// Atualizar um endereco (PUT)
export async function PUT(request: Request) {
    const body = await request.json();
    const address = await prisma.address.update({
        where: { id: body.id },
        data: body,
    });
    return NextResponse.json(address);
}

// Deletar um endereco (DELETE)
export async function DELETE(request: Request) {
    const body = await request.json();
    await prisma.address.delete({ where: { id: body.id } });
    return NextResponse.json({ message: "endereco deletado com sucesso" });
}