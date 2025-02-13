import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../Context";

function BorrowedBook() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const { token, url } = useContext(StoreContext);

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

    useEffect(() => {
        if (!token) return;
        fetchBorrowedBooks();
    }, [token]);

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
            fetchBorrowedBooks();
        } catch (error) {
            alert("Error returning book: " + (error.response?.data?.message || error.message));
        }
    };

    const renewBook = (id) => {
        axios.post(`${url}/api/books/${id}/renew`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setBorrowedBooks(prevBooks =>
                prevBooks.map(book =>
                    book.book._id === id ? { ...book, dueDate: response.data.newDueDate } : book
                )
            );
            alert("Book renewed successfully");
        })
        .catch(error => {
            console.error("Error renewing book:", error);
            alert("Error renewing book: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
            
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
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

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {borrowedBooks.length > 0 ? (
                    borrowedBooks.map((book) => (
                        <div key={book._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                            <h3 className="font-bold text-lg mb-2">{book.book.title}</h3>
                            <div className="space-y-2">
                                <p><span className="font-semibold">Author:</span> {book.book.author}</p>
                                <p><span className="font-semibold">ISBN:</span> {book.book.isbn}</p>
                                <p><span className="font-semibold">Genre:</span> {book.book.genre}</p>
                                <p><span className="font-semibold">Category:</span> {book.book.category}</p>
                                <p><span className="font-semibold">Due Date:</span> {new Date(book.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
                                    onClick={() => renewBook(book.book._id)}
                                >
                                    Renew
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded flex-1"
                                    onClick={() => handleReturn(book.book._id)}
                                >
                                    Return
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 bg-white rounded-lg shadow-md">
                        No borrowed books
                    </div>
                )}
            </div>
        </div>
    );
}

export default BorrowedBook;