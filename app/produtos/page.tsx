import Link from "next/link";

export default function ProductsPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Lista de Produtos</h1>
            <p>Confira os produtos disponíveis no nosso catálogo.</p>
            <Link href="/produtos/1">Link produto</Link>
        </div>
    );
}