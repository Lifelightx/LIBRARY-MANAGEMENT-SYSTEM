import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    category: "",
    quantity: 0
  });

  const { adminToken, url } = useContext(StoreContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${url}api/books`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("Progess...")
    try {
      await axios.put(
        `${url}api/books/${selectedBook._id}`,
        updateForm,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      // console.log("Done..")
      setIsUpdateModalOpen(false);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${url}api/books/${id}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const openUpdateModal = (book) => {
    setSelectedBook(book);
    setUpdateForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      category: book.category,
      quantity: book.quantity
    });
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#006D77] mb-6">Book List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-[#006D77] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">ISBN</th>
              <th className="px-6 py-3 text-left">Genre</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={`${url}${book.imageUrl}`}
                    alt={book.title}
                    className="h-20 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.isbn}</td>
                <td className="px-6 py-4">{book.genre}</td>
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4">{book.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openUpdateModal(book)}
                      className="bg-[#006D77] text-white px-3 py-1 rounded hover:bg-teal-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <>
          <div className="fixed inset-0  z-40" style={{"backgroundColor":"rgba(0,0,0,0.5)"}}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-104 shadow-xl">
              <h3 className="text-xl font-bold text-teal-600 mb-4">Update Book</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={updateForm.title}
                    onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                    className="mt-1 block w-full outline-none px-3 rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={updateForm.author}
                    onChange={(e) => setUpdateForm({ ...updateForm, author: e.target.value })}
                    className="mt-1 block w-full outline-none px-3 rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ISBN</label>
                  <input
                    type="text"
                    value={updateForm.isbn}
                    onChange={(e) => setUpdateForm({ ...updateForm, isbn: e.target.value })}
                    className="mt-1 block w-full outline-none px-3 rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Genre</label>
                  <input
                    type="text"
                    value={updateForm.genre}
                    onChange={(e) => setUpdateForm({ ...updateForm, genre: e.target.value })}
                    className="mt-1 block w-full outline-none px-3 rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                    className="mt-1 block w-full outline-none px-3 rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    value={updateForm.quantity}
                    onChange={(e) => setUpdateForm({ ...updateForm, quantity: parseInt(e.target.value) })}
                    className="mt-1 block w-full  outline-none px-3 rounded border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#006D77] text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;