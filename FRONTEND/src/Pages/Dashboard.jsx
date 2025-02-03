import BookList from "../Components/BookList"
import BorrowedBooks from "../Components/BorrowedBooks"

function Dashboard() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <BookList />
      <BorrowedBooks />
    </div>
  )
}

export default Dashboard

