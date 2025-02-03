import { useState, useEffect } from "react"
import axios from "axios"

function BorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([])

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/api/users/borrowed-books", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setBorrowedBooks(response.data)
      } catch (error) {
        console.error("Error fetching borrowed books:", error)
      }
    }

    fetchBorrowedBooks()
  }, [])

  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `http://localhost:5000/api/books/${bookId}/return`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      alert("Book returned successfully")
      // Refresh the borrowed books list
      const response = await axios.get("http://localhost:5000/api/users/borrowed-books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBorrowedBooks(response.data)
    } catch (error) {
      alert("Error returning book: " + error.response.data.message)
    }
  }

  return (
    <div>
      <h2>My Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((record) => (
          <li key={record._id}>
            {record.book.title} by {record.book.author}
            <br />
            Borrowed on: {new Date(record.borrowDate).toLocaleDateString()}
            <button onClick={() => handleReturn(record.book._id)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BorrowedBooks

