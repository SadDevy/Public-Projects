import React, { useState } from 'react'
import ContextWindow from '../DeleteModalWindow/ContextWindow'

import './Project.css'

const Project = ({ name, property, currentProject, setCurrentProject, hiddenModalDelete, setHiddenModalDelete }) => {
    const [hidden, setHidden] = useState(true);
    const [drop, setDrop] = useState('');
    const [contextLinkClass, setContextLinkClass] = useState('projects__context-menu-link')
    const [contextHidden, setContextHidden] = useState(true)

    const nestedProjects = Object
        .keys(property)
        .filter(key => key !== 'id');

    const renderNestedProjects = nestedProjects.map(project => {
        return (
            <Project
                key={property[project].id}
                name={project}
                property={property[project]}
                currentProject={currentProject}
                setCurrentProject={setCurrentProject}
                hiddenModalDelete={hiddenModalDelete}
                setHiddenModalDelete={setHiddenModalDelete}
            />
        )
    })

    const linkDropClass = nestedProjects
        .length !== 0 ?
        `projects__drop ${drop}` :
        "";
    const linkClasses = "projects__link " + linkDropClass;


    const handleProjectClick = (event) => {
        event.preventDefault();

        const current = event.target.textContent;
        setCurrentProject(current);

        setHidden(!hidden);

        const dropDown = !hidden ? "" : "projects__drop--down";
        setDrop(dropDown);
    }

    let result;
    if (renderNestedProjects.length !== 0) {
        result = (
            <ul
                className="projects-list__projects projects"
                hidden={hidden}
            >
                {renderNestedProjects}
            </ul>
        );
    }

    const handleMouseOver = () => {
        setContextLinkClass('projects__context-menu-link projects__context-menu-link--active');
    }
    const handleMouseOut = () => {
        setContextLinkClass('projects__context-menu-link');
    }

    const handleContextOnClick = (event) => {
        event.preventDefault();
        setContextHidden(!contextHidden);

        const current = event.target.previousSibling.textContent;
        setCurrentProject(current);
    }

    const renderProject = () => {
        return (
            <li className="projects__item" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <span className="projects__point"></span>
                <a
                    href="index.html"
                    className={linkClasses}
                    onClick={handleProjectClick}
                >
                    {name}
                </a>
                <a href=" " className={contextLinkClass} onClick={handleContextOnClick}></a>
                <ContextWindow 
                    hidden={contextHidden}
                    setHidden={setContextHidden}
                    hiddenModalDelete={hiddenModalDelete}
                    setHiddenModalDelete={setHiddenModalDelete}
                    currentProject={currentProject}
                />
                {result}
            </li>
        )
    }

    return (
        renderProject()
    );
}

export default Project