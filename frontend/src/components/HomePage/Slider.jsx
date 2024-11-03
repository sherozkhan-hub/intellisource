import React, { useState, useEffect } from 'react';

const slides = [
  "/assets/images/home.png",
  "/assets/images/home.png",
  "/assets/images/home.png",
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 z-10 flex items-center justify-between">
        <button onClick={prevSlide} className="absolute left-0 z-10 px-4 py-2 m-4 text-white bg-gray-800 rounded-full shadow-md">
          &lt;
        </button>
        <button onClick={nextSlide} className="absolute right-0 z-10 px-4 py-2 m-4 text-white bg-gray-800 rounded-full shadow-md">
          &gt;
        </button>
      </div>
      <div className="relative flex items-center justify-center">
        {slides.map((slide, index) => (
          <img
            key={index}
            src="/assets/images/logo.png"
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
