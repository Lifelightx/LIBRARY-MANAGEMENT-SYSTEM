import React from 'react';

function HeroSectionPage() {
    return (
        <div className="bg-gradient-to-r flex space-x-16 justify-center items-center bg-white text-gray-700 p-8 rounded-lg shadow-lg">
            <div>
                <h1 className="text-5xl font-serif mb-4">Find Your Favorite Books Here</h1>
                <p className="text-md mb-6">Discover your next great read from our extensive collection of books. Whether you're looking for thrilling <br /> adventures, insightful non-fiction,  or heartwarming tales, we have something for every reader. Dive into our <br /> curated selections and let your imagination soar!</p>
                <button className="bg-slate-200 text-[#006D77] font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    Explore Now
                </button>
            </div>
            <div className="flex flex-col bg-[#006D77] p-10 rounded-lg items-center">
                <div className="flex space-x-4 mb-4">
                    <img src="https://i.pinimg.com/736x/18/1d/51/181d51dbebec41271b6941f408bff883.jpg" alt="Trending Book 1" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                    <img src="https://i.pinimg.com/736x/9c/c6/ae/9cc6ae6347ab896525cb55c872bd07c7.jpg" alt="Trending Book 2" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                </div>
                <div className="flex space-x-4">
                    <img src="https://m.media-amazon.com/images/I/61AY2K2WPeL._AC_UF350,350_QL50_.jpg" alt="New Arrival 1" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                    <img src="https://i.pinimg.com/736x/65/b5/ef/65b5efa52bfb19cd034dd45390b71e50.jpg" alt="New Arrival 2" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                </div>
            </div>
        </div>
    );
}

export default HeroSectionPage;
