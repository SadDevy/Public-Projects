import React from 'react'

import './MainButtons.css'

const ChangeButton = ({ isChanging, setIsChanging }) => {
    const handleOnClick = (event) => {
        event.preventDefault();

        if (isChanging)
            return false;

        setIsChanging(true);
    };

    const defaultButtonClass = 'buttons__button'
    const buttonClasses = !isChanging ? 
        defaultButtonClass : 
        defaultButtonClass +  ' buttons__button--disabled';

    return (
        <a href=" " className={buttonClasses} onClick={handleOnClick}>
            Change
        </a>
    );
}

export default ChangeButton