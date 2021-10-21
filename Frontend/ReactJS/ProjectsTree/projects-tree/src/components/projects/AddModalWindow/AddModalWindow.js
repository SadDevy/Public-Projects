import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_PROJECT } from '../../../actions'
import store from '../../../store'

import './AddModalWindow.css'

const AddModalWindow = ({ projects, setProjects, hidden, setHidden, currentProject }) => {
    const [projectName, setProjectName] = useState('')

    const selectedProjects = useSelector(state => state)
    const dispatch = useDispatch()

    store.subscribe(() => {
        setProjects({
            ...selectedProjects
        })
    });

    const handleCloseClick = (event) => {
        event.preventDefault();

        setHidden(!hidden);
        setProjectName('');
    }

    const handleAddClick = (event) => {
        event.preventDefault();

        setHidden(!hidden);
        setProjectName('');

        dispatch({ 
            type: ADD_PROJECT, 
            payload: {
                currentProject: currentProject,
                projectName: projectName
            }
        });
    }

    const handleChange = (event) => {
        const text = event.target.value;

        setProjectName(text);
    }

    return (
        <div className="modal-window" hidden={hidden}>
            <div className="modal-window__title">
                Add project
                <a href=" " className="modal-window__closeBtn" onClick={handleCloseClick}>
                </a>
            </div>
            <div className="modal-window__content">
                <p className="project-name">
                    Name
                    <input type="text" className="project-name__input" value={projectName} onChange={handleChange} />
                </p>

                <a href=" " className="modal-window__cancelBtn" onClick={handleCloseClick}>
                    Cancel
                </a>
                <a href=" " className="modal-window__addBtn" onClick={handleAddClick}>
                    Add Project
                </a>
            </div>
        </div>
    )
}

export default AddModalWindow