"use client"

import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Home() {
  const desktopImages = [
    "/images/banner_1.jpg",
    "/images/banner_2.jpg",
    "/images/banner_3.png",
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
    <div className="mt-[45px] sm:mt-[45px] md:mt-[98px] lg:mt-[98px] min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Carousel showThumbs={true} autoPlay>
        {desktopImages.map((image, index) => (
          <div key={index}>
            <a className="flex">
              <img src={image} alt="banner" className="h-[70vh] md:h-[50vh]" />
            </a>
          </div>
        ))}
      </Carousel>

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


