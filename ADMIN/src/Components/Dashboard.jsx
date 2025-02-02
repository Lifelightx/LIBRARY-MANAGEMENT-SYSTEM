import AddBook from "./AddBook"
import BookList from "./BookList"
import CreateUser from "./CreateUser"

function Dashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <AddBook />
            <BookList />
            <CreateUser />
        </div>
    )
}

export default Dashboard
