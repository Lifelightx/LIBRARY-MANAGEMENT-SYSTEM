import { useState, useEffect } from "react"
import axios from "axios"

function BookList() {
  const [books, setBooks] = useState([])
  const url = "http://localhost:5000/"
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${url}api/books`, {
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
      {books.map(book => (
        <div key={book._id}>
          <h2>{book.title}</h2>
          <img src={`${url}${book.imageUrl}`} style={{height:"200px"}} alt={book.title} />
          {console.log(book.imageName)}
        </div>
      ))}
      </ul>
    </div>
  )
}

export default BookList

