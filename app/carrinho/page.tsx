"use client";

import { useState } from "react";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    // Adiciona um item ao carrinho
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                // Atualiza a quantidade se o item já estiver no carrinho
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Adiciona um novo item ao carrinho
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove um item do carrinho
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    // Atualiza a quantidade de um item no carrinho
    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Calcula o total do carrinho
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

            {/* Lista de itens no carrinho */}
            <div className="space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
                            <div className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                <div>
                                    <h2 className="font-bold">{item.name}</h2>
                                    <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity === 1}
                                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">O carrinho está vazio.</p>
                )}
            </div>

            {/* Total */}
            <div className="mt-6">
                <h2 className="text-xl font-bold">Total: R$ {calculateTotal()}</h2>
                {cartItems.length > 0 && (
                    <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Finalizar Compra
                    </button>
                )}
            </div>
        </div>
    );
}
