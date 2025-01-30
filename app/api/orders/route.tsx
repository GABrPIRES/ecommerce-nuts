import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ItemInput = {
    productId: string;
    quantity: string;
    price: Float32Array;
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, total, items } = body;

        // Valida os dados obrigatórios
        if (!userId || !total || !items || items.length === 0) {
            return NextResponse.json({ error: "Erro ao adiconar algum campo do produto" }, { status: 400 });
        }

        // Cria o usuário e o endereço
        const newOrder = await prisma.user.create({
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
            include: {
                items: true,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Erro ao registrar o usuário:", error);
        return NextResponse.json({ error: "Erro ao registrar o usuário" }, { status: 500 });
    }
}

// Método GET - Listar Produtos
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao listar os produtos" },
            { status: 500 }
        );
    }
}

// Método PUT - Atualizar Produto
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, name, description, price, stock, categoryId } = body;

        if (!id) {
            throw new Error("ID do produto é obrigatório para atualização.");
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                categoryId,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Erro ao atualizar o produto" },
            { status: 500 }
        );
    }
}

// Método DELETE - Remover Produto
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            throw new Error("ID do produto é obrigatório para exclusão.");
        }

        // Busca o produto no banco de dados
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        // Remove as imagens associadas no Cloudinary
        if (product.image1) {
            const image1PublicId = product.image1.split("/").pop()?.split(".")[0]; // Extrai o Public ID
            await cloudinary.uploader.destroy(`ecommerce-nuts/${image1PublicId}`);
        }

        if (product.image2) {
            const image2PublicId = product.image2.split("/").pop()?.split(".")[0]; // Extrai o Public ID
            await cloudinary.uploader.destroy(`ecommerce-nuts/${image2PublicId}`);
        }

        // Remove o produto do banco de dados
        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Produto deletado com sucesso." }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Erro ao deletar o produto" },
            { status: 500 }
        );
    }
}