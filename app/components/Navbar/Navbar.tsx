"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [order, setOrder] = useState(null);
    const [orderItemsLength, setOrderItemsLength] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    let timeout: ReturnType<typeof setTimeout>;

    // 🔍 Busca o pedido do usuário
    useEffect(() => {

        fetch(`/api/orders`)
            .then((res) => res.json())
            .then((data) => {
                const userOrder = data.find((order) => order.userId === user.id);
                if (userOrder) {
                    setOrder(userOrder);
                }
            })
            .catch(() => setErrorMessage("Erro ao carregar pedidos."));
    }, [user]);

    // 🔍 Busca os itens do pedido
    useEffect(() => {
        if (!order) return;

        fetch(`/api/orderItem`)
            .then((res) => res.json())
            .then((data) => {
                const items = data.filter((item) => item.orderId === order.id);
                setOrderItemsLength(items.length);
            })
            .catch(() => setErrorMessage("Erro ao carregar itens do pedido."));
    }, [order]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const showLogin = () => {
        clearTimeout(timeout);
        setShowModal(true);
    };

    const hideLogin = () => {
        timeout = setTimeout(() => setShowModal(false), 200);
    };

    const settings = {
        infinite: true, // Loop contínuo
        speed: 5000, // Velocidade do deslizamento (em ms)
        autoplay: true, // Ativa autoplay
        autoplaySpeed: 0, // Faz o carrossel deslizar continuamente
        cssEase: "linear", // Faz o movimento ser suave e linear
        slidesToShow: 1, // Quantos slides aparecem ao mesmo tempo
        slidesToScroll: 1, // Quantos slides são rolados por vez
        arrows: false, // Remove as setas de navegação
        variableWidth: true, // Permite que os itens tenham largura variável
    };

    return (
        <nav className="w-full fixed top-0 bg-white shadow-lg z-50">
            <div className="bg-green-600 text-white text-sm py-2 px-4">
                <div className="max-w-7xl mx-auto">
                    <Slider {...settings}>
                        <div className="px-4 pr-10">
                            🚚 Frete grátis acima de R$ 299,90 (Sul/Sudeste)
                        </div>
                        <div className="px-4 pr-10">
                            💳 Parcelamento em até 3x sem juros
                        </div>
                        <div className="px-4 pr-10">
                            🔒 Site 100% seguro
                        </div>
                        <div className="px-4 pr-10">
                            📦 Envio rápido para todo o Brasil
                        </div>
                    </Slider>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-5">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <p className="text-2xl font-bold text-green-600">R&P Nuts</p>
                        </Link>
                    </div>

                    <div className="hidden lg:flex flex-1 mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Procure aqui as suas delícias saudáveis"
                                className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white focus:outline-none"
                                aria-label="Pesquisar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-500 hover:text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* 🔹 Right Section: Auth + Carrinho */}
                    <div className="flex items-center space-x-4">
                        {/* 🔑 Authentication Links for Desktop */}
                        <div className="hidden md:flex space-x-2">
                            {!isAuthenticated ? (
                                <>
                                    <div
                                        onMouseEnter={showLogin}
                                        onMouseLeave={hideLogin}
                                        className="relative flex justify-center items-center"
                                    >
                                        <img
                                            src="/images/do-utilizador.png"
                                            alt="Meu ícone"
                                            className="w-8 h-8 cursor-pointer text-gray-700 hover:text-red-600 transition duration-300"
                                        />

                                        {/* Modal exibido ao passar o mouse */}
                                        {showModal && (
                                            <div
                                                onMouseEnter={showLogin}
                                                onMouseLeave={hideLogin}
                                                className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg border border-green-600 z-50 p-4 w-48"
                                            >
                                                <ul className="space-y-2">
                                                    <li>
                                                        <Link href="/login">
                                                            <p className="text-gray-800 hover:text-green-600 hover:border-b hover:border-green-600 transition duration-300 pb-1 flex justify-center items-center">
                                                                Login
                                                            </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/signup">
                                                            <p className="text-gray-800 hover:text-green-600 hover:border-b hover:border-green-600 transition duration-300 pb-1 flex justify-center items-center">
                                                                Criar Conta
                                                            </p>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        onMouseEnter={showLogin}
                                        onMouseLeave={hideLogin}
                                        className="relative flex justify-center items-center"
                                    >
                                        <img
                                            src="/images/do-utilizador (1).png"
                                            alt="Meu ícone"
                                            className="w-8 h-8 text-gray-700 hover:text-red-600 transition duration-300"
                                        />

                                        {/* Modal exibido ao passar o mouse */}
                                        {showModal && (
                                            <div
                                                onMouseEnter={showLogin}
                                                onMouseLeave={hideLogin}
                                                className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg border border-green-600 z-50 p-4 w-48"
                                            >
                                                <ul className="space-y-2">
                                                    <li>
                                                        <Link href="/dashboard">
                                                            <p className="text-gray-800 hover:text-green-600 hover:border-b hover:border-green-600 transition duration-300 pb-1 flex justify-center items-center">
                                                                Dashboard
                                                            </p>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/signup">
                                                            <p onClick={logout} className="text-gray-800 hover:text-red-600 hover:border-b hover:border-red-600 transition duration-300 pb-1 flex justify-center items-center">
                                                                Sair
                                                            </p>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>


                        {/* 🛒 Carrinho de Compras */}
                        <Link href="/carrinho">
                            <div className="relative flex items-center">
                                <span className="text-3xl cursor-pointer hover:text-green-600 transition-transform duration-300">
                                    🛒
                                </span>
                                {orderItemsLength > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                                        {orderItemsLength}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* 📱 Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-700 hover:text-green-600 focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-green-600 text-white text-sm py-2 px-4 hidden md:flex">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* 🖥️ Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8 text-lg">
                        <Link href="/produtos" className="pr-10">
                            <p className="text-white hover:border-b-2 hover:border-b-green-800 cursor-pointer p-1">Castanhas</p>
                        </Link>
                        <Link href="/ofertas" className="pr-10">
                            <p className="text-white hover:border-b-2 hover:border-b-green-800 cursor-pointer p-1">Ofertas</p>
                        </Link>
                        <Link href="/contato" className="pr-10">
                            <p className="text-white hover:border-b-2 hover:border-b-green-800 cursor-pointer p-1">Contato</p>
                        </Link>
                        <Link href="/sobre" className="pr-10">
                            <p className="text-white hover:border-b-2 hover:border-b-green-800 cursor-pointer p-1">Sobre</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 📱 Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="space-y-2 px-4 py-4">
                        <Link href="/produtos" onClick={toggleMenu}>
                            <p className="text-gray-700 hover:text-green-600">Castanhas</p>
                        </Link>
                        <Link href="/ofertas" onClick={toggleMenu}>
                            <p className="text-gray-700 hover:text-green-600">Ofertas</p>
                        </Link>
                        <Link href="/contato" onClick={toggleMenu}>
                            <p className="text-gray-700 hover:text-green-600">Contato</p>
                        </Link>
                        <Link href="/sobre" onClick={toggleMenu}>
                            <p className="text-gray-700 hover:text-green-600">Sobre</p>
                        </Link>

                        {/* 🔑 Authentication Links for Mobile */}
                        {!isAuthenticated ? (
                            <>
                                <Link href="/login" onClick={toggleMenu}>
                                    <p className="text-gray-700 hover:text-green-600">Login</p>
                                </Link>
                                <Link href="/signup" onClick={toggleMenu}>
                                    <p className="text-gray-700 hover:text-green-600">Criar Conta</p>
                                </Link>
                            </>
                        ) : (
                            <Link href="/dashboard" onClick={toggleMenu}>
                                <p className="text-gray-700 hover:text-green-600">
                                    Usuário: {user?.name || "Meu Perfil"}
                                </p>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

