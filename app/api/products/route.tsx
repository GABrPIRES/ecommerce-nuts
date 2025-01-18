import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Inicializa o Prisma
const prisma = new PrismaClient();

// Configuração do Multer para armazenar as imagens localmente
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./public/images"; // Diretório onde as imagens serão armazenadas
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Cria o diretório se ele não existir
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`; // Nome único para cada arquivo
        cb(null, uniqueName);
    },
});

// Validação de arquivos (opcional)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceita o arquivo
    } else {
        cb(new Error("Tipo de arquivo não suportado"), false); // Rejeita o arquivo
    }
};

// Limite de tamanho de arquivo (opcional)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB por arquivo
});

// Desativa o bodyParser padrão do Next.js
export const config = {
    api: {
        bodyParser: false,
    },
};

// Função de upload e criação de produto
export async function POST(req: Request) {
    const form = new Promise((resolve, reject) => {
        const uploadMiddleware = upload.fields([
            { name: "image1", maxCount: 1 },
            { name: "image2", maxCount: 1 },
        ]);

        // Middleware para processar o upload
        uploadMiddleware(req as any, {} as any, async (err: any) => {
            if (err) {
                reject(new NextResponse(err.message, { status: 400 }));
            } else {
                resolve(req);
            }
        });
    });

    try {
        await form; // Aguarda o upload ser processado

        // Coleta os dados do corpo e arquivos
        const body = (req as any).body;
        const files = (req as any).files;

        const { name, description, price, stock, categoryId } = body;

        // URLs das imagens
        const image1 = files["image1"] ? files["image1"][0].filename : null;
        const image2 = files["image2"] ? files["image2"][0].filename : null;

        // Criação do produto no banco de dados
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock, 10),
                categoryId,
                image1,
                image2,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Função para listar produtos
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao listar produtos" }, { status: 500 });
    }
}

