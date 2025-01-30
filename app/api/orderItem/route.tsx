import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todas os usuarios (GET)
export async function GET() {
    const orderItem = await prisma.orderItem.findMany();
    return NextResponse.json(orderItem);
}

// Criar um novo usuario (POST)
export async function POST(request: Request) {
    const body = await request.json();
    const orderItem = await prisma.orderItem.create({ data: body });
    return NextResponse.json(orderItem);
}

// Atualizar um usuario (PUT)
export async function PUT(request: Request) {
    const body = await request.json();
    const orderItem = await prisma.orderItem.update({
        where: { id: body.id },
        data: body,
    });
    return NextResponse.json(orderItem);
}

// Deletar um usuario (DELETE)
export async function DELETE(request: Request) {
    const body = await request.json();
    await prisma.orderItem.delete({ where: { id: body.id } });
    return NextResponse.json({ message: "Usuario deletado com sucesso" });
}