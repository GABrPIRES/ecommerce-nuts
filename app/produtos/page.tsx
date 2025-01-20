"use client";

import Link from "next/link";
import Homepage from "@/app/components/template/page";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetch inicial para carregar os produtos
    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch(() => setErrorMessage("Erro ao carregar produtos."));
    }, []);

    return (
        <Homepage>
            <div className="max-w-6xl mx-auto mt-8">
                {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                )}
                <h2 className="text-2xl font-semibold mb-6 text-center">Nossos Produtos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg shadow-lg overflow-hidden group transition transform hover:scale-105"
                        >
                            <div className="relative w-full h-48">
                                {/* Imagem com efeito de hover */}
                                <img
                                    src={product.image1} // URL da imagem principal
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:hidden"
                                />
                                {product.image2 && (
                                    <img
                                        src={product.image2} // URL da imagem secundária
                                        alt={product.name}
                                        className="w-full h-full object-cover hidden group-hover:block"
                                    />
                                )}
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="font-bold text-lg text-gray-800 truncate">{product.name}</h3>
                                <p className="text-green-600 font-semibold text-lg">
                                    A partir de R$ {product.price.toFixed(2).replace('.', ',')}
                                </p>
                                <p className="text-sm text-gray-600">
                                    até 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
                                </p>
                                <Link
                                    href={`/produtos/${product.id}`}
                                    className="block mt-4 px-4 py-2 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600"
                                >
                                    Ver mais
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Homepage>
    );
}
