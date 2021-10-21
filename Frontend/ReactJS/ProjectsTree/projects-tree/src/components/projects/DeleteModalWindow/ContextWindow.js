import React from "react"

import './ContextWindow.css'

const ContextWindow = ({ hidden, setHidden, hiddenModalDelete, setHiddenModalDelete, currentProject }) => {

    const handleDeleteProject = (event) => {
        event.preventDefault();

        setHiddenModalDelete(!hiddenModalDelete);
        setHidden(!hidden);
    }

    return (
        <ul className="projects__context-menu context-menu" hidden={hidden}>
            <li className="context-menu__item">
                <a href=" " className="context-menu__link" onClick={handleDeleteProject}>
                    Delete
                </a>
            </li>
        </ul>
    );
}

export default ContextWindow