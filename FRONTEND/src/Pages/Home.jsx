import React from 'react';
import Carousel from '../Components/Carousel';
import Heros from '../Components/Heros';
import BookGenreCards from '../Components/BookGenreCards';
import BookList from '../Components/BookList';
import HeroSectionPage from './HeroSectionPage';

function Home() {
  const trendingBooks = [
    { title: "Atomic Habits", author: "James Clear", image: "https://i.pinimg.com/736x/18/1d/51/181d51dbebec41271b6941f408bff883.jpg" },
    { title: "The Psychology of Money", author: "Morgan Housel", image: "https://i.pinimg.com/736x/9c/c6/ae/9cc6ae6347ab896525cb55c872bd07c7.jpg" },
  ];

  const newArrivals = [
    { title: "AI Superpowers", author: "Kai-Fu Lee", image: "https://m.media-amazon.com/images/I/61AY2K2WPeL._AC_UF350,350_QL50_.jpg" },
    { title: "Deep Work", author: "Cal Newport", image: "https://i.pinimg.com/736x/65/b5/ef/65b5efa52bfb19cd034dd45390b71e50.jpg" },
  ];

  const staffPicks = [
    { title: "The Alchemist", author: "Paulo Coelho", image: "https://i.pinimg.com/736x/49/7f/22/497f22527c6c0b20fb0bbe814ab918b2.jpg" },
    { title: "Sapiens", author: "Yuval Noah Harari", image: "https://i.pinimg.com/736x/43/64/17/4364176205e92dde419e0f2d47eee0f1.jpg" },
  ];

  return (
    <div className="px-12">
      <Carousel />
      <Heros />
      <BookGenreCards />
      <hr className='text-gray-400' /> {/* Changed the color of hr to green */}
      <HeroSectionPage/>
      <div className="mx-auto py-8 space-y-8">
        <BookList title={<><span className="text-red-600">🔥</span> Trending Books</>} books={trendingBooks} />
        <BookList title={<><span className="text-blue-600">📅</span> New Arrivals</>} books={newArrivals} />
        <BookList title={<><span className="text-yellow-500">⭐</span> Staff Picks</>} books={staffPicks} />
      </div>
    </div>
  );
}

export default Home;
