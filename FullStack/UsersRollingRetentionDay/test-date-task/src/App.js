import React, { useEffect, useState } from 'react'
import MainButtons from './components/Buttons/MainButtons/MainButtons';
import Table from './components/Table/Table';
import Loading from './components/Loading/Loading'

import './App.css'

const App = () => {
    const [isChanging, setIsChanging] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [changingUsers, setChangingUsers] = useState([])

    const [users, setUsers] = useState([])

    const uri = 'http://www.usersdata.somee.com/api/users'
    useEffect(() => {
        setIsLoading(true);

        const getUsers = async () => {
            const response = await fetch(uri);

            let json;
            if (response.ok)
                json = await response.json();

            return json;
        }

        const gotUsers = getUsers();
        gotUsers.then(result => {
            setUsers(result);
            setChangingUsers(result);
        });

        setIsLoading(false);
    }, [])

    const renderBody = () => {
        if (isLoading)
            return (
                <Loading />
            );

        return (
            <div>
                <Table
                    users={changingUsers}
                    setUsers={setChangingUsers}
                    isChanging={isChanging}
                />
                <MainButtons
                    users={users}
                    setUsers={setUsers}
                    changingUsers={changingUsers}
                    isChanging={isChanging}
                    setIsChanging={setIsChanging}
                />
            </div>
        );
    };

    return (
        <div className="container">
            <section className="header-container">
                <h1 className="header">React Client</h1>
            </section>
            <section className="main-container">
                {renderBody()}
            </section>
            <section className="footer-container">
            </section>
        </div>
    );
}

export default App