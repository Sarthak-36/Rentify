import { useEffect, useState } from "react";

const Slide = () => {
    const staticImages = [
        "/assets/slide.jpg",
        "/assets/barn_cat.jpg",
        "/assets/arctic_cat.webp",
        "/assets/beach_cat.jpg",
        "/assets/camping_cat.jpg",
        "/assets/castle_cat.webp",
        "/assets/cave_cat.jpg",
        "/assets/countryside_cat.webp",
        "/assets/desert_cat.webp",
        "/assets/island_cat.webp",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % staticImages.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [staticImages.length]);
    return (
        <div className="relative w-full h-[80vh]">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
            {staticImages.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index}`}
                    className={`object-cover w-full h-full absolute transition-opacity duration-1000 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transition: "opacity 1s" }}
                />
            ))}
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center px-8 py-16">
                Welcome Home! Anywhere you roam <br /> Stay in the moment. Make your memories
            </h1>
        </div>
    );
};

export default Slide;
