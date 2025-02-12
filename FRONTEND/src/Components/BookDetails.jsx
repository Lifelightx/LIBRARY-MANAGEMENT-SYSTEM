import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context';

function BookDetails() {
  const { id } = useParams();
  const { url } = useContext(StoreContext);
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`${url}/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return <p className="text-center text-gray-500 mt-10">Loading book details...</p>;
  }
//   console.log(book)
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img 
          src={`${url}/${book.imageUrl}`} 
          alt={book.title} 
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold mt-4">{book.title}</h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500">{book.category} • {book.genre}</p>
        <p className="mt-3 text-gray-700">{book.description}</p>
        <p className="mt-3 font-semibold">
          Available Quantity: <span className="text-blue-600">{book.availableQuantity}</span>
        </p>
        
        <div className="mt-6 flex gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Borrow
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
