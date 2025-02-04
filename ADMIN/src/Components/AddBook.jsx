import { useState } from "react"
import axios from "axios"

function AddBook() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState("")
  const [genre, setGenre] = useState("")
  const [category, setCategory] = useState("Fiction")
  const [quantity, setQuantity] = useState(1)
  const [availableQuantity, setAvailableQuantity] = useState(1)
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()
      formData.append('image', image)
      formData.append('title', title)
      formData.append('author', author)
      formData.append('isbn', isbn)
      formData.append('genre', genre)
      formData.append('category', category)
      formData.append('quantity', quantity)
      formData.append('availableQuantity', availableQuantity)
      await axios.post(
        "http://localhost:5000/api/books",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      alert("Book added successfully")
      setTitle("")
      setAuthor("")
      setIsbn("")
      setGenre("")
      setCategory("Fiction")
      setQuantity(1)
      setAvailableQuantity(1)
      setImage(null)
    } catch (error) {
      alert("Error adding book: " + error.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Fiction">Fiction</option>
        <option value="Non-fiction">Non-fiction</option>
        <option value="Research">Research</option>
        <option value="Magazine">Magazine</option>
        <option value="Culture">Culture</option>
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
        min="1"
        required
      />
      <input
        type="number"
        placeholder="Available Quantity"
        value={availableQuantity}
        onChange={(e) => setAvailableQuantity(Number.parseInt(e.target.value))}
        min="0"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  )
}

export default AddBook
