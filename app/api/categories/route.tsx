import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todas os Categorias (GET)
export async function GET() {
    const category = await prisma.category.findMany();
    return NextResponse.json(category);
}

// Criar um novo Categoria (POST)
export async function POST(request: Request) {
    const body = await request.json();
    const category = await prisma.category.create({ data: body });
    return NextResponse.json(category);
}

// Atualizar um Categoria (PUT)
export async function PUT(request: Request) {
    const body = await request.json();
    const category = await prisma.category.update({
        where: { id: body.id },
        data: body,
    });
    return NextResponse.json(category);
}

// Deletar um Categoria (DELETE)
export async function DELETE(request: Request) {
    const body = await request.json();
    await prisma.category.delete({ where: { id: body.id } });
    return NextResponse.json({ message: "Categoria deletado com sucesso" });
}