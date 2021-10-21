import React from 'react'

import './MainButtons.css'

const SaveButton = ({ users, setUsers, changingUsers, isChanging, setIsChanging }) => {
    const handleOnClick = (event) => {
        event.preventDefault();

        const uri = 'http://www.usersdata.somee.com/api/user';
        changingUsers.forEach(user => {
            if (users.filter(n => n.id === user.id).length !== 0) {
                fetch(uri + '/' + user.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
            }
            else {
                fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
            }

        });

        setUsers(changingUsers);
        setIsChanging(false);
    };

    const defaultButtonClass = 'buttons__button'
    const buttonClasses = isChanging ?
        defaultButtonClass :
        defaultButtonClass + ' buttons__button--disabled';

    return (
        <a href=" " className={buttonClasses} onClick={handleOnClick}>
            Save
        </a>
    );
}

export default SaveButton