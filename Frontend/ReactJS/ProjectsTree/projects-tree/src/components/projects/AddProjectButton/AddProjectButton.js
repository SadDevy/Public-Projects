import React, { useState } from "react"
import AddModalWindow from "../AddModalWindow/AddModalWindow"

import './AddProjectButton.css'

const AddProjectButton = ({ projects, setProjects, currentProject }) => {
    const [hiddenModal, setHiddenModal] = useState(true)

    const handle = (event) => {
        event.preventDefault();

        setHiddenModal(!hiddenModal);
    }

    return (
        <div>
            <a
                href=" "
                className="add-button"
                onClick={handle}
            >
                Add project
            </a>
            <AddModalWindow
                projects={projects}
                setProjects={setProjects}
                hidden={hiddenModal}
                setHidden={setHiddenModal}
                currentProject={currentProject}
            />
        </div>
    )
}

export default AddProjectButton