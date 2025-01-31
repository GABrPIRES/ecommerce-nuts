import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todos os itens dos pedidos (GET)
export async function GET() {
    try {
        const orderItems = await prisma.orderItem.findMany();
        return NextResponse.json(orderItems);
    } catch (error) {
        console.error("Erro ao listar os itens:", error);
        return NextResponse.json({ error: "Erro ao listar os itens do pedido" }, { status: 500 });
    }
}

// Criar um novo item no pedido (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newItem = await prisma.orderItem.create({ data: body });

        return NextResponse.json(newItem);
    } catch (error) {
        console.error("Erro ao adicionar item:", error);
        return NextResponse.json({ error: "Erro ao adicionar item" }, { status: 500 });
    }
}

// Atualizar quantidade do item no pedido (PUT)
export async function PUT(request: Request) {
    try {
        const { itemId, quantity, price } = await request.json();

        const updatedItem = await prisma.orderItem.update({
            where: { id: itemId },
            data: { quantity, price },
        });

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar item do pedido" }, { status: 500 });
    }
}

// Deletar um item do pedido (DELETE)
export async function DELETE(request: Request) {
    try {
        const { itemId } = await request.json();

        await prisma.orderItem.delete({ where: { id: itemId } });

        return NextResponse.json({ message: "Item deletado com sucesso" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar item do pedido" }, { status: 500 });
    }
}
