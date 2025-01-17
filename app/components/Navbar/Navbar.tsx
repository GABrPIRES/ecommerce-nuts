import Link from 'next/link';

const Navbar = () => {
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

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/maisvendidos">
                            <p className="text-gray-700 hover:text-green-600">+VENDIDOS</p>
                        </Link>
                        <Link href="/produtos">
                            <p className="text-gray-700 hover:text-green-600">Castanhas</p>
                        </Link>
                        <Link href="/ofertas">
                            <p className="text-gray-700 hover:text-green-600">Ofertas</p>
                        </Link>
                        <Link href="/usuarios">
                            <p className="text-gray-700 hover:text-green-600">Usuarios</p>
                        </Link>
                        <Link href="/cadastrarprodutos">
                            <p className="text-gray-700 hover:text-green-600">Cadastrar produto</p>
                        </Link>
                    </div>

                    {/* Search Field */}
                    <div className="hidden md:flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            Procurar
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="hidden md:flex space-x-2">
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
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-green-600 focus:outline-none">
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
        </nav>
    );
};

export default Navbar;
