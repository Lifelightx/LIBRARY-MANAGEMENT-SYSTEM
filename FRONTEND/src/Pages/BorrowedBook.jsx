import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context";

function BorrowedBook() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { token, url } = useContext(StoreContext);

  useEffect(() => {
    if (!token) return; // Prevent API call if token is missing

    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(`${url}/api/users/borrowed-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, [token]); // Add token as a dependency

  const handleReturn = async (bookId) => {
    try {
      await axios.post(
        `${url}/api/books/${bookId}/return`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book returned successfully");
      fetchBorrowedBooks(); // Refresh list after returning a book
    } catch (error) {
      alert("Error returning book: " + (error.response?.data?.message || error.message));
    }
  };

  const renewBook = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/renewbook/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBorrowedBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.book._id === id ? { ...book, dueDate: response.data.newDueDate } : book
        )
      );
    } catch (error) {
      console.error("Error renewing book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">ISBN</th>
            <th className="border border-gray-300 px-4 py-2">Genre</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length > 0 ? (
            borrowedBooks.map((book) => (
              <tr key={book._id}>
                <td className="border border-gray-300 px-4 py-2">{book.book.title}</td>
                <td className="border border-gray-300 px-4 py-2">{book.book.author}</td>
                <td className="border border-gray-300 px-4 py-2">{book.book.isbn}</td>
                <td className="border border-gray-300 px-4 py-2">{book.book.genre}</td>
                <td className="border border-gray-300 px-4 py-2">{book.book.category}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(book.dueDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => renewBook(book.book._id)}
                  >
                    Renew
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleReturn(book.book._id)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center" colSpan="7">
                No borrowed books
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowedBook;
