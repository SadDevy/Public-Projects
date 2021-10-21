import React from 'react'
import { useState } from 'react/cjs/react.development'
import CalculateQueryModalWindow from '../../Modal Windows/CalculateQueryModalWindow/CalculateQueryModalWindow'

import './MainButtons.css'

const CalculateButton = ({ users, isChanging }) => {
    const [hiddenModal, setHiddenModal] = useState(true)

    const handleClick = (event) => {
        event.preventDefault();

        setHiddenModal(!hiddenModal);
    };

    const defaultButtonClass = 'buttons__button'
    const buttonClasses = !isChanging ?
        defaultButtonClass :
        defaultButtonClass + ' buttons__button--disabled';

    return (
        <div>
            <a href=" " className={buttonClasses} onClick={handleClick}>
                Calculate
            </a>
            <CalculateQueryModalWindow 
                users={users}
                hidden={hiddenModal}
                setHidden={setHiddenModal}
            />
        </div>
    );
}

export default CalculateButton