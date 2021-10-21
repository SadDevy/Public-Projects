import React from 'react'
import ChangeButton from './ChangeButton'
import SaveButton from './SaveButton'
import CalculateButton from './CalculateButton'

import './MainButtons.css'

const MainButtons = ({users, setUsers, changingUsers, isChanging, setIsChanging }) => {
    return (
        <div className="main__buttons buttons">
            <ChangeButton
                isChanging={isChanging}
                setIsChanging={setIsChanging}
            />
            <SaveButton
                users={users}
                setUsers={setUsers}
                changingUsers={changingUsers}
                isChanging={isChanging}
                setIsChanging={setIsChanging}
            />
            <CalculateButton
                users={changingUsers}
                isChanging={isChanging}
            />
        </div>
    );
}

export default MainButtons