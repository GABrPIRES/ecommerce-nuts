import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Configuração do Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Seu Cloud Name
    api_key: process.env.CLOUDINARY_API_KEY, // Sua API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Sua API Secret
});

export const config = {
    api: {
        bodyParser: false, // Desativa o bodyParser padrão do Next.js
    },
};

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        // Coleta os dados do corpo da requisição
        const name = form.get("name") as string;
        const description = form.get("description") as string;
        const price = parseFloat(form.get("price") as string);
        const stock = parseInt(form.get("stock") as string);
        const categoryId = form.get("categoryId") as string;

        // Arquivos de imagem
        const image1 = form.get("image1") as File;
        const image2 = form.get("image2") as File | null;

        // Upload das imagens para o Cloudinary
        const uploadToCloudinary = async (file: File) => {
            const buffer = await file.arrayBuffer();
            const result = await cloudinary.uploader.upload_stream({
                folder: "ecommerce-nuts", // Pasta onde as imagens serão armazenadas
            });
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "ecommerce-nuts" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );
                stream.end(Buffer.from(buffer));
            });
        };

        const image1Url = await uploadToCloudinary(image1);
        const image2Url = image2 ? await uploadToCloudinary(image2) : null;

        // Salvar o produto no banco de dados
        const prisma = new PrismaClient();
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                categoryId,
                image1: image1Url as string,
                image2: image2Url as string,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Erro ao processar a requisição" },
            { status: 500 }
        );
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

