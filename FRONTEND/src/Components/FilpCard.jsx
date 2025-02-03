import React from "react";

function FlipCard() {
  return (
    <div className="relative w-102 h-88 rounded-xl shadow-lg overflow-hidden perspective-1000 group">
      {/* Front Side (Image) */}
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out transform group-hover:rotate-x-90" 
        style={{ backgroundImage: `url('https://images.pexels.com/photos/8085262/pexels-photo-8085262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
      </div>

      {/* Back Side (Content) */}
      <div className="absolute inset-0 bg-gray-100 p-5 flex flex-col justify-center items-center text-center transition-transform duration-500 ease-in-out transform rotate-x-90 group-hover:rotate-x-0">
        <h2 className="text-xl font-bold text-gray-700">Library Collection</h2>
        <p className="text-sm text-indigo-700 mt-2">
          Discover a wide range of books and resources to expand your knowledge.
        </p>
      </div>
    </div>
  );
}

export default FlipCard;
