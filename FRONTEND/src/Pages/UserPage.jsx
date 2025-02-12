import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const [books, setBooks] = useState([]);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url}/api/books/`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {books.map(book => (
          <div 
            key={book._id} 
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/book/${book._id}`)}  
          >
            <img 
              src={`${url}/${book.imageUrl}`} 
              alt={book.title} 
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500">{book.category} • {book.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
