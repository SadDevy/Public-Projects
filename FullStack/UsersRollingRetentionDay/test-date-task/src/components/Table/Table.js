import React from 'react'
import AddButton from '../Buttons/AddButton/AddButton';
import TableItem from '../TableItem/TableItem';

import './Table.css'

const Table = ({ users, setUsers, isChanging }) => {
    const renderedTableItems = users.map(user => {
        return (
            <TableItem
                key={user.id}
                user={user}
                users={users}
                setUsers={setUsers}
                isChanging={isChanging}
            />
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>Date Registration</th>
                    <th>Date Last Activity</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td colSpan="3">
                        Data
                        <AddButton
                            users={users}
                            setUsers={setUsers}
                            hidden={!isChanging}
                        />
                    </td>
                </tr>
            </tfoot>
            <tbody>
                {renderedTableItems}
            </tbody>
        </table>
    );
}

export default Table