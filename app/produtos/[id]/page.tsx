"use client";

import Homepage from "@/app/components/template/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const [product, setProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(""); // Estado para controlar a imagem selecionada
    const [zoomStyle, setZoomStyle] = useState({}); // Estado para o estilo do zoom
    const [isZooming, setIsZooming] = useState(false); // Controle de zoom ativado/desativado

    // Desestruturação de `params` como Promise
    const { id } = React.use(params);

    // Fetch para carregar a lista de produtos e encontrar o produto pelo ID
    useEffect(() => {
        fetch(`/api/products`)
            .then((res) => res.json())
            .then((data) => {
                const foundProduct = data.find((product) => product.id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                    setSelectedImage(foundProduct.image1); // Define a imagem padrão
                } else {
                    setErrorMessage("Produto não encontrado.");
                }
            })
            .catch(() => setErrorMessage("Erro ao carregar o produto."));
    }, [id]);

    if (errorMessage) {
        return (
            <Homepage>
                <div className="max-w-6xl mx-auto mt-8">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            </Homepage>
        );
    }

    if (!product) {
        return (
            <Homepage>
                <div className="max-w-6xl mx-auto mt-8">
                    <p>Carregando...</p>
                </div>
            </Homepage>
        );
    }

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({
            backgroundImage: `url(${selectedImage})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: "200%", // Zoom de 200%
        });
    };

    const handleMouseEnter = () => {
        setIsZooming(true);
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
        setZoomStyle({});
    };

    return (
        <Homepage>
            <div className="max-w-6xl mx-auto mt-8">
                <h2 className="text-sm text-gray-600 mb-4">
                    <span className="text-gray-800 font-bold"><Link href={`/`}>Início</Link></span> &gt;{" "}
                    <span className="text-gray-800 font-bold"><Link href={`/produtos`}>Castanhas</Link></span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Imagens com Slide */}
                    <div>
                        {/* Área da imagem principal com zoom */}
                        <div
                            className="relative w-full h-80 mb-4 overflow-hidden rounded-lg shadow-lg cursor-zoom-in"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Imagem normal ou zoom */}
                            {!isZooming ? (
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div
                                    style={zoomStyle}
                                    className="w-full h-full bg-no-repeat bg-cover"
                                ></div>
                            )}
                        </div>

                        {/* Miniaturas */}
                        <div className="flex gap-4">
                            <img
                                src={product.image1}
                                alt="Imagem 1"
                                onClick={() => handleImageClick(product.image1)}
                                className={`w-20 h-20 object-cover cursor-pointer rounded-lg shadow ${selectedImage === product.image1 ? "border-4 border-green-500" : ""
                                    }`}
                            />
                            {product.image2 && (
                                <img
                                    src={product.image2}
                                    alt="Imagem 2"
                                    onClick={() => handleImageClick(product.image2)}
                                    className={`w-20 h-20 object-cover cursor-pointer rounded-lg shadow ${selectedImage === product.image2 ? "border-4 border-green-500" : ""
                                        }`}
                                />
                            )}
                        </div>
                    </div>

                    {/* Informações do Produto */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <p className="text-3xl text-green-600 font-bold">
                            R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            até 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
                        </p>
                        <button className="px-6 py-3 bg-orange-500 border-4 border-white text-white rounded-lg text-lg font-semibold hover:bg-orange-600 mb-4">
                            Adicionar ao carrinho
                        </button>
                        <button className="px-6 py-3 bg-orange-500 border-4 border-white text-white rounded-lg text-lg font-semibold hover:bg-orange-600 mb-4">
                            Comprar agora
                        </button>

                        <div className="border-t pt-4">
                            <label className="block text-gray-800 font-semibold mb-2">Calcule o frete:</label>
                            <input
                                type="text"
                                placeholder="Digite seu CEP"
                                className="w-full p-2 border rounded-lg mb-2"
                            />
                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Calcular
                            </button>
                        </div>
                    </div>
                </div>

                {/* Descrição do Produto */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Descrição do produto</h2>
                    <p className="text-lg text-gray-600 mb-4">{product.description}</p>
                </div>
            </div>
        </Homepage>
    );
}



