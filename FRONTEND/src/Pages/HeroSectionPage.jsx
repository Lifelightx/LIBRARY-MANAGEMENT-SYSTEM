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
            <div className="flex flex-col bg-[#9dd7dc] p-10 rounded-lg items-center">
                <div className="flex space-x-7 mb-4">
                    <img src="https://i.pinimg.com/736x/71/e7/d8/71e7d8f0d46c0b300654016d15b922b6.jpg" alt="Trending Book 1" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                    <img src="https://i.pinimg.com/736x/0a/79/dd/0a79dd7d98d41d8142fb2a91a62cce4a.jpg" alt="Trending Book 2" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                </div>
                <div className="flex space-x-7">
                    <img src="https://i.pinimg.com/736x/f7/91/d7/f791d7f821a23e8ec2a76dfc63a5bdb6.jpg" alt="New Arrival 1" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                    <img src="https://i.pinimg.com/736x/39/c6/bf/39c6bff983453edb70f80d82305110c7.jpg" alt="New Arrival 2" className="w-1/2 h-48 rounded-lg shadow-md object-cover" />
                </div>
            </div>
        </div>
    );
}

export default HeroSectionPage;
