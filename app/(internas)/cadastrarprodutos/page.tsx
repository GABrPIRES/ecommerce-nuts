"use client";

import Homepage from "@/app/components/template/page";
import { useEffect, useState } from "react";

export default function RegisterProductPage() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetch inicial para carregar os produtos
    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch(() => setErrorMessage("Erro ao carregar produtos."));
    }, []);

    // Função para adicionar um novo produto na lista local
    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <Homepage>
            <div className="max-w-4xl mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-6">Gerenciamento de Produtos</h1>
                {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                )}
                <AddProductForm onAddProduct={handleAddProduct} />
                <h2 className="text-xl font-semibold mt-8 mb-4">Lista de Produtos</h2>
                {products.length > 0 ? (
                    <ul className="space-y-4">
                        {products.map((product) => (
                            <li key={product.id} className="p-4 border rounded">
                                <p><strong>Nome:</strong> {product.name}</p>
                                <p><strong>Descrição:</strong> {product.description}</p>
                                <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
                                <p><strong>Estoque:</strong> {product.stock} unidades</p>
                                <p><strong>ID da Categoria:</strong> {product.categoryId}</p>
                                <div className="mt-4">
                                    <strong>Imagens:</strong>
                                    <div className="flex gap-4 mt-2">
                                        {product.image1 && (
                                            <img
                                                src={`/images/${product.image1}`}
                                                alt="Imagem 1 do Produto"
                                                className="w-32 h-32 object-cover"
                                            />
                                        )}
                                        {product.image2 && (
                                            <img
                                                src={`/images/${product.image2}`}
                                                alt="Imagem 2 do Produto"
                                                className="w-32 h-32 object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Criado em: {new Date(product.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum produto cadastrado. Adicione um novo produto para começar.</p>
                )}
            </div>
        </Homepage>
    );
}

function AddProductForm({ onAddProduct }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const formData = new FormData(event.target);

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newProduct = await response.json();
                onAddProduct(newProduct);
                event.target.reset(); // Limpa os campos do formulário
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Erro ao adicionar o produto.");
            }
        } catch (error) {
            setErrorMessage("Erro ao adicionar o produto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
            )}
            <input
                name="name"
                type="text"
                placeholder="Nome do Produto"
                required
                className="w-full p-2 border rounded"
            />
            <textarea
                name="description"
                placeholder="Descrição"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Preço"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name="stock"
                type="number"
                placeholder="Estoque"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name="categoryId"
                type="text"
                placeholder="ID da Categoria"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name="image1"
                type="file"
                accept="image/*"
                required
                className="w-full"
            />
            <input
                name="image2"
                type="file"
                accept="image/*"
                className="w-full"
            />
            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
            >
                {loading ? "Enviando..." : "Adicionar Produto"}
            </button>
        </form>
    );
}
