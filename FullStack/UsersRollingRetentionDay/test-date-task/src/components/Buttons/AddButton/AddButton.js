import React from 'react'

import './AddButton.css'

const AddButton = ({ users, setUsers, hidden }) => {
    const getLastUserId = (users) => {
        return users[users.length - 1].id;
    };

    const getInvariantDate = (date) => {
        const splittedDate = date.toLocaleString('en-US').split(',')[0].split('/');

        const year = splittedDate[2];
        const month = splittedDate[1].length === 1 ? "0" + splittedDate[1] : splittedDate[1];
        const day = splittedDate[0].length === 1 ? "0" + splittedDate[0] : splittedDate[0];

        return `${year}-${month}-${day}`;
    };

    const handleAddUser = (event) => {
        event.preventDefault();

        const newUser = {
            id: getLastUserId(users) + 1,
            regestrationDate: getInvariantDate(new Date()),
            lastActivityDate: getInvariantDate(new Date())
        };

        setUsers([...users, newUser]);
    };

    return (
        <div hidden={hidden}>
            <a href=" " className="table__add-button add-button" onClick={handleAddUser}>
                Add row
            </a>
        </div>
    );
}

export default AddButton