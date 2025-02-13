import React from "react";

const genres = [
    { name: "Fiction", image: "https://i.pinimg.com/736x/26/94/1d/26941d46f0fe6a388ee75cfa6db14179.jpg" },
    { name: "Non-Fiction", image: "https://i.pinimg.com/736x/e3/41/c8/e341c877be662fa60c6c1364d38b52ed.jpg" },
    { name: "Science", image: "https://i.pinimg.com/736x/2c/cf/d5/2ccfd5168dedee5552532c835f6f5a86.jpg" },
    { name: "Computer Science", image: "https://i.pinimg.com/736x/50/c0/a5/50c0a5ab925d8b7d65b5e8da0d0f225a.jpg" },
    { name: "History", image: "https://i.pinimg.com/736x/de/d9/22/ded922a16d6a31da6656095bf6d58b1d.jpg" },
    { name: "Coding", image: "https://i.pinimg.com/736x/b0/b5/ab/b0b5abcc36c5b6043af5725582c1c620.jpg" },
    { name: "Self-Help", image: "https://i.pinimg.com/736x/38/78/86/387886db6ee10492b345f32942ed0d95.jpg" },
];

const BookGenreCards = () => (
    <div className="p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">Explore Genres</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
            {genres.map((genre, index) => (
                <div
                    key={index}
                    className="relative shadow-lg rounded-xl overflow-hidden cursor-pointer w-full max-w-[160px]"
                    style={{ height: 240 }}
                >
                    <img
                        src={genre.image}
                        alt={genre.name}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 p-2">
                        <h3 className="text-black text-sm font-semibold">{genre.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default BookGenreCards;