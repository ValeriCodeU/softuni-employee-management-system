import { useState, useEffect } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import UserList from "./components/UserList"
import CreateUser from "./components/CreateUser"

function App() {

    const [users, setUsers] = useState([])
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/users')
            .then(response => response.json())
            .then(result => {
                setUsers(Object.values(result));

            })
            .catch(err => {

                alert(err.message);
            })
    }, [refresh]);

    const forceRefresh = () => {
        setRefresh(state => !state);
    }

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const closeUserModalHandler = () => {
        setShowCreateUser(false);
    };

    const addUserSubmitHander = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);       

        const { country, city, street, streetNumber, ...userData } = Object.fromEntries(formData);

        userData.address = {
            country,
            city,
            street,
            streetNumber
        };

        userData.createdAt = new Date().toISOString();
        userData.updatedAt = new Date().toISOString();
       
        // const user = {
        //     firstName: userData.get('firstName'),
        //     lastName: userData.get('lastName'),
        //     email: userData.get('email'),
        //     phone: userData.get('phone'),
        // };

        fetch('http://localhost:3030/jsonstore/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(() => {             
                closeUserModalHandler();
                forceRefresh();
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

                    <UserList refreshUsers={forceRefresh} users={users} />

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
