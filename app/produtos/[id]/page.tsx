interface ProductDetailsProps {
    params: { id: string };
}

export default function ProductDetails({ params }: ProductDetailsProps) {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Detalhes do Produto</h1>
            <p>ID do produto: {params.id}</p>
        </div>
    );
}