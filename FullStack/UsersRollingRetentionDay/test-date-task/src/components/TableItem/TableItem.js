import React from 'react'
import { useState } from 'react/cjs/react.development';

const TableItem = ({ user, users, setUsers, isChanging }) => {
    const [changingUser, setChangingUser] = useState(user)

    const getUsers = (users, user) => {
        const changingUsers = [...users];

        const index = users.findIndex(n => n.id === user.id);
        changingUsers[index] = user;

        return changingUsers;
    };

    const handleIdInput = (event) => {
        const id = event.target.value;

        const changedUser = {
            ...changingUser,
            id: id
        };
        setChangingUser(changedUser);

        const templateUsers = getUsers(users, changedUser);
        setUsers(templateUsers);
    };

    const handleRegestrationDateInput = (event) => {
        const date = event.target.value;

        if (date > changingUser.lastActivityDate)
            return;

        const changedUser = {
            ...changingUser,
            regestrationDate: date
        };
        setChangingUser(changedUser);

        const templateUsers = getUsers(users, changedUser);
        setUsers(templateUsers);
    };

    const handleLastActivityDateInput = (event) => {
        const date = event.target.value;

        if (date < changingUser.regestrationDate)
            return;

        const changedUser = {
            ...changingUser,
            lastActivityDate: date
        };
        setChangingUser(changedUser);

        const templateUsers = getUsers(users, changedUser);
        setUsers(templateUsers);
    };

    const renderItem = (user, isChanging) => {
        const getInvariantDate = (date) => {
            const dateSeparator = 'T';
            const dateParts = date.split(dateSeparator);

            return dateParts[0];
        };

        if (!isChanging)
            return (
                <tr>
                    <td>{user ? user.id : ''}</td>
                    <td>{user ? getInvariantDate(user.regestrationDate) : ''}</td>
                    <td>{user ? getInvariantDate(user.lastActivityDate) : ''}</td>
                </tr>
            );

        return (
            <tr>
                <td>
                    <input 
                        type='number' 
                        min='0' 
                        value={user ? user.id : ''} 
                        onChange={handleIdInput} disabled={true} 
                    />
                </td>
                <td>
                    <input 
                        type='date' 
                        value={user ? getInvariantDate(user.regestrationDate) : ''} 
                        onChange={handleRegestrationDateInput} 
                    />
                </td>
                <td>
                    <input 
                        type='date' 
                        value={user ? getInvariantDate(user.lastActivityDate) : ''} 
                        onChange={handleLastActivityDateInput} 
                    />
                </td>
            </tr>
        );
    };

    return renderItem(changingUser, isChanging);
}

export default TableItem