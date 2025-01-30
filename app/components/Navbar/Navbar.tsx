"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="w-full fixed top-0 bg-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <p className="text-2xl font-bold text-green-600">R&P Nuts</p>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/produtos">
                            <p className="text-gray-700 hover:text-green-600">Castanhas</p>
                        </Link>
                        <Link href="/ofertas">
                            <p className="text-gray-700 hover:text-green-600">Ofertas</p>
                        </Link>
                        <Link href="/contato">
                            <p className="text-gray-700 hover:text-green-600">Contato</p>
                        </Link>
                        <Link href="/sobre">
                            <p className="text-gray-700 hover:text-green-600">Sobre</p>
                        </Link>
                        <Link href="/usuarios">
                            <p className="text-gray-700 hover:text-green-600">Usuarios</p>
                        </Link>
                        <Link href="/cadastrarprodutos">
                            <p className="text-gray-700 hover:text-green-600">Cadastrar produto</p>
                        </Link>
                        <Link href="/carrinho">
                            <p className="text-gray-700 hover:text-green-600">Carrinho</p>
                        </Link>
                    </div>

                    {/* Authentication Links for Desktop */}
                    <div className="hidden md:flex space-x-2">
                        {!isAuthenticated ? (
                            <>
                                <Link href="/login">
                                    <p className="px-4 py-2 border bg-gray-800 text-white rounded-md hover:bg-gray-950 hover:scale-105 transition-transform duration-300">
                                        Login
                                    </p>
                                </Link>
                                <Link href="/signup">
                                    <p className="px-4 py-2 border bg-gray-800 text-white rounded-md hover:bg-gray-950 hover:scale-105 transition-transform duration-300">
                                        Criar conta
                                    </p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard">
                                    <p className="px-4 py-2 border bg-gray-800 text-white rounded-md hover:bg-gray-950 hover:scale-105 transition-transform duration-300">
                                        Usuário: {user?.name || "Meu Perfil"}
                                    </p>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 border bg-red-600 text-white rounded-md hover:bg-red-700 transition-transform duration-300"
                                >
                                    Sair
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
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

            {/* Mobile Menu */}
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
                        <Link href="/usuarios" onClick={toggleMenu}>
                            <p className="text-gray-700 hover:text-green-600">Usuarios</p>
                        </Link>
                        <Link href="/cadastrarprodutos" onClick={toggleMenu}>
                            <p className="text-gray-700 hover:text-green-600">Cadastrar produto</p>
                        </Link>
                        <Link href="/carrinho">
                            <p className="text-gray-700 hover:text-green-600">Carrinho</p>
                        </Link>

                        {/* Authentication Links for Mobile */}
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
                            <>
                                <Link href="/dashboard" onClick={toggleMenu}>
                                    <p className="text-gray-700 hover:text-green-600">
                                        Usuário: {user?.name || "Meu Perfil"}
                                    </p>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        toggleMenu();
                                    }}
                                    className="text-gray-700 hover:text-red-600"
                                >
                                    Sair
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
