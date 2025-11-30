import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import TableComponent from "./components/TableComponent"

function App() {

    return (
        <div>
            <Header />
            
            <main className="main">
                <section className="card users-container">
                    <Search />

                    <TableComponent />

                    <button className="btn-add btn">Add new user</button>

                    <Pagination />
                </section>

            </main>

            <Footer />
        </div>
    )
}

export default App
