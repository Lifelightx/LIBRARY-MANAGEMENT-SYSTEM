import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../Context';

function BookDetails() {
  const { id } = useParams();
  const { url, token } = useContext(StoreContext); // Assuming `token` contains the logged-in token data
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${url}/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id, url]);

  // Function to borrow a book
  const handleBorrow = async () => {
    if (!token) {
      setMessage("Please log in to borrow books.");
      return;
    }

    try {
      const response = await fetch(`${url}/api/books/${id}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming JWT authentication
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Book borrowed successfully! Due Date: ${new Date(data.dueDate).toLocaleDateString()}`);
        setBook((prev) => ({ ...prev, availableQuantity: prev.availableQuantity - 1 })); // Reduce available quantity
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      setMessage("An error occurred while borrowing.");
    }
  };

  // Function to reserve a book
  const handleReserve = async () => {
    if (!token) {
      setMessage("Please log in to reserve books.");
      return;
    }

    try {
      const response = await fetch(`${url}/api/books/${id}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Book reserved successfully! Expires on: ${new Date(data.expiryDate).toLocaleDateString()}`);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error reserving book:", error);
      setMessage("An error occurred while reserving.");
    }
  };

  if (!book) {
    return <p className="text-center text-gray-500 mt-10">Loading book details...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-18 max-w-4xl">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        
        {/* Book Image */}
        <div className="md:w-1/2">
          <img 
            src={`${url}/${book.imageUrl}`} 
            alt={book.title} 
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>

        {/* Book Details */}
        <div className="md:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold text-[#006D77]">{book.title}</h2>
          <p className="text-gray-600 font-semibold">{book.author}</p>
          <p className="text-sm text-gray-500">{book.category} • {book.genre}</p>
          <p className="mt-3 text-gray-700">{book.description}</p>
          <p className="mt-3 font-semibold">
            Available Quantity: <span className="text-blue-600">{book.availableQuantity}</span>
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button 
              className="bg-[#006D77] text-white px-4 py-2 rounded-lg hover:bg-[#2d4e51] disabled:bg-gray-400"
              onClick={handleBorrow}
              disabled={book.availableQuantity <= 0}
            >
              Borrow
            </button>
            <button 
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
              onClick={handleReserve}
              disabled={book.availableQuantity > 0}
            >
              Reserve
            </button>
          </div>

          {/* Display message */}
          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
