"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const desktopImages = [
    "/images/banner_1.jpg",
    "/images/banner_1.jpg",
    "/images/banner_1.jpg",
  ];

  const mobileImages = [
    "/images/banner_1_mobile.jpg",
    "/images/banner_1_mobile.jpg",
    "/images/banner_1_mobile.jpg",
  ];

  const [images, setImages] = useState(desktopImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ajusta as imagens com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImages(mobileImages); // Imagens menores para telas pequenas
      } else {
        setImages(desktopImages); // Imagens maiores para telas grandes
      }
    };

    handleResize(); // Verifica o tamanho da tela ao carregar
    window.addEventListener("resize", handleResize); // Atualiza ao redimensionar

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Troca automática de imagens no carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="mt-[208px] xs:mt-[150px] sm:mt-[150px] min-h-screen pt-30 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Carrossel */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Imagens do Carrossel */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 100}%`, // Define a largura total do contêiner pai
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full"
              style={{
                width: "100%", // Cada imagem ocupa 100% da largura do contêiner visível
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className=""
              />
            </div>
          ))}
        </div>

        {/* Indicadores (Dots) */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index
                ? "bg-green-600"
                : "bg-gray-400"
                }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Conteúdo abaixo do carrossel */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Bem-vindo à R&P Nuts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Categoria 1 */}
          <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="/images/nuts.jpg"
              alt="Nuts"
              className="w-32 h-32 object-cover mb-4"
            />
            <p className="font-bold text-lg">Nuts</p>
          </div>
          {/* Categoria 2 */}
          <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="/images/snacks.jpg"
              alt="Snacks"
              className="w-32 h-32 object-cover mb-4"
            />
            <p className="font-bold text-lg">Snacks</p>
          </div>
          {/* Categoria 3 */}
          <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="/images/fruits.jpg"
              alt="Fruits"
              className="w-32 h-32 object-cover mb-4"
            />
            <p className="font-bold text-lg">Frutas</p>
          </div>
          {/* Categoria 4 */}
          <div className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img
              src="/images/drinks.jpg"
              alt="Drinks"
              className="w-32 h-32 object-cover mb-4"
            />
            <p className="font-bold text-lg">Bebidas</p>
          </div>
        </div>
      </div>
    </div>
  );
}


