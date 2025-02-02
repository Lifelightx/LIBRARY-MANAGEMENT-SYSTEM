import { useState, useEffect } from "react"
import axios from "axios"

function BookList() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setBooks(response.data)
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} - ISBN: {book.isbn}
            <br />
            Total: {book.quantity}, Available: {book.availableQuantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookList

