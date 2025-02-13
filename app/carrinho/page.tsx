"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Homepage from "../components/template/page";

export default function CartPage() {
    const { isAuthenticated, user, logout } = useAuth();
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [itemIdDelete, setItemIdDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Busca o pedido do usuário
    useEffect(() => {
        fetch(`/api/orders`)
            .then((res) => res.json())
            .then((data) => {
                const userOrder = data.find((order) => order.userId === user.id);
                if (userOrder) {
                    setOrder(userOrder);
                    console.log("Deu certo", userOrder)
                } else {
                    setErrorMessage("Nenhum pedido encontrado.");
                }
            })
            .catch(() => setErrorMessage(null));
    }, [user, isAuthenticated]);

    // Busca os itens do pedido
    useEffect(() => {
        if (!order) return;

        fetch(`/api/orderItem`)
            .then((res) => res.json())
            .then((data) => {
                const items = data.filter((item) => item.orderId === order.id);
                setOrderItems(items);
            })
            .catch(() => setErrorMessage("Erro ao carregar itens do pedido."));
    }, [order]);

    // Busca os produtos correspondentes aos itens do pedido
    useEffect(() => {
        if (orderItems.length === 0) return;

        fetch(`/api/products`)
            .then((res) => res.json())
            .then((data) => {
                const filteredProducts = data.filter((product) =>
                    orderItems.some((item) => item.productId === product.id)
                );
                setProducts(filteredProducts);
            })
            .catch(() => setErrorMessage("Erro ao carregar produtos do pedido."));
    }, [orderItems]);



    // Atualiza a quantidade do item no carrinho
    const updateItemQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Impede valores negativos

        await fetch(`/api/orderItem`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId, quantity: newQuantity }),
        });

        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const alertDeleteItem = async (itemId) => {
        setItemIdDelete(itemId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = async () => {
        setShowDeleteModal(false);
        setItemIdDelete(null);
    }

    // Remove um item do carrinho
    const removeItem = async (itemId) => {
        await fetch(`/api/orderItem`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId }),
        });

        window.location.reload();
        setShowDeleteModal(false);
        setOrderItems(orderItems.filter((item) => item.id !== itemId));
    };

    // Calcula o total do pedido
    const totalPedido = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <Homepage>
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 text-center">🛒 Meu Carrinho</h1>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                {order && (
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <p className="text-lg font-semibold">Detalhes do Pedido:</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Total:</strong> R$ {totalPedido.toFixed(2)}</p>
                        <p><strong>Criado em:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                )}

                {orderItems.length > 0 ? (
                    <div className="space-y-6">
                        {orderItems.map((item) => {
                            const product = products.find((p) => p.id === item.productId);

                            return (
                                <div
                                    key={item.id}
                                    className="flex flex-col md:flex-row items-center bg-gray-100 rounded-lg shadow p-4"
                                >
                                    {/* Imagem do Produto */}
                                    {product && (
                                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                            <img
                                                src={product.image1}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Informações do Produto */}
                                    <div className="flex-1 text-center md:text-left md:ml-6">
                                        {product && (
                                            <>
                                                <p className="text-lg font-semibold">{product.name}</p>
                                                <p className="text-gray-700">R$ {item.price.toFixed(2)}</p>
                                                <p className="text-gray-600">Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
                                            </>
                                        )}
                                    </div>

                                    {/* Botões de Controle de Quantidade */}
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Botão de Remover */}
                                    <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center md:justify-end p-4">
                                        <button
                                            onClick={() => alertDeleteItem(item.id)}
                                            className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Total do Pedido */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h2 className="text-xl font-bold">Total do Pedido:</h2>
                            <p className="text-2xl font-semibold text-green-600">
                                R$ {totalPedido.toFixed(2)}
                            </p>
                        </div>

                        {showDeleteModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md z-50 p-4">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                                    <p className="text-lg font-semibold text-gray-800 mb-4">
                                        Deseja realmente remover este item do seu carrinho?
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                                        <button
                                            onClick={() => removeItem(itemIdDelete)}
                                            className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        >
                                            Sim
                                        </button>
                                        <button
                                            onClick={closeDeleteModal}
                                            className="w-full sm:w-auto px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Botões de Finalizar Compra */}
                        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                            <button className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Finalizar Compra
                            </button>
                            <button className="w-full md:w-auto px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-6">Seu carrinho está vazio.</p>
                )}
            </div>
        </Homepage>
    );
}
