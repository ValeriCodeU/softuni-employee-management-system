import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import UserList from "./components/UserList"
import CreateUser from "./components/CreateUser"

function App() {

    const [showCreateUser, setShowCreateUser] = useState(false);

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const closeUserModalHandler = () => {
        setShowCreateUser(false);
    };

    const addUserSubmitHander = (e) => {       
        e.preventDefault();

        const userData = new FormData(e.target);
        console.log(userData);
        
        const user = Object.fromEntries(userData);

        console.log(user);
        // const user = {
        //     firstName: userData.get('firstName'),
        //     lastName: userData.get('lastName'),
        //     email: userData.get('email'),
        //     phone: userData.get('phone'),
        // };

        fetch('http://localhost:3030/jsonstore/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);          
            closeUserModalHandler();
        })
        .catch(err => {
            alert(err.message);
        });

    };
    return (


        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />

                    < UserList />

                    <button onClick={addUserClickHandler} className="btn-add btn">Add new user</button>

                    <Pagination />
                </section>

                {showCreateUser &&
                    <CreateUser
                        onClose={closeUserModalHandler}
                        onSubmit={addUserSubmitHander}
                    />
                }
            </main>

            <Footer />
        </div>
    )
}

export default App
