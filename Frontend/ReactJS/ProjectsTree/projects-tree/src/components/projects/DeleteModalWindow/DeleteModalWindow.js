import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_PROJECT } from '../../../actions'
import store from '../../../store'

import './DeleteModalWindow.css'

const DeleteModalWindow = ({ projects, setProjects, hidden, setHidden, currentProject }) => {
    const selectedProjects = useSelector(state => state)
    const dispatch = useDispatch()

    store.subscribe(() => {
        setProjects({
            ...selectedProjects
        });
    });

    const handleClose = (event) => {
        event.preventDefault();

        setHidden(!hidden);
    }

    const handleDeletion = (event) => {
        event.preventDefault();

        setHidden(!hidden);

        dispatch({
            type: DELETE_PROJECT,
            payload: {
                currentProject: currentProject
            }
        });
    }

    return (
        <div className="modal-window" hidden={hidden}>
            <div className="modal-window__title">
                Delete project
                <a href=" " className="modal-window__closeBtn" onClick={handleClose}></a>
            </div>
            <div className="modal-window__content">
                Are you sure you want to delete project "{currentProject}"?
                <a href=" " className="modal-window__cancelBtn" onClick={handleClose}>
                    Cancel
                </a>
                <a href=" " className="modal-window__deleteBtn" onClick={handleDeletion}>
                    Delete Project
                </a>
            </div>
        </div>
    );
}

export default DeleteModalWindow