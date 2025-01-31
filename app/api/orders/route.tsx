import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ItemInput = {
    productId: string;
    quantity: number;
    price: number;
};

// Criar um novo pedido (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, total, items } = body;

        if (!userId || !total || !items || items.length === 0) {
            return NextResponse.json({ error: "Erro ao adicionar algum campo do pedido" }, { status: 400 });
        }

        const newOrder = await prisma.order.create({
            data: {
                userId,
                total,
                items: {
                    create: items.map((item: ItemInput) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { items: true },
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 });
    }
}

// Listar todos os pedidos (GET)
export async function GET() {
    try {
        const orders = await prisma.order.findMany({ include: { items: true } });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao listar pedidos" }, { status: 500 });
    }
}

// Atualizar o total do pedido (PUT)
export async function PUT(request: Request) {
    try {
        const { orderId, total } = await request.json();

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { total },
        });

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar pedido" }, { status: 500 });
    }
}

// Excluir um pedido (DELETE)
export async function DELETE(request: Request) {
    try {
        const { orderId } = await request.json();

        await prisma.order.delete({ where: { id: orderId } });

        return NextResponse.json({ message: "Pedido deletado com sucesso." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar pedido" }, { status: 500 });
    }
}
