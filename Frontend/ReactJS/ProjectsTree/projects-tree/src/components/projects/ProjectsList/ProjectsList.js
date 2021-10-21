import React, { useState } from 'react'
import AddProjectButton from '../AddProjectButton/AddProjectButton'
import DeleteModalWindow from '../DeleteModalWindow/DeleteModalWindow'
import Project from '../Project/Project'
import initialProjects from '../projects.json'

import './ProjectsList.css'

const ProjectsList = () => {
    const [projects, setProjects] = useState(initialProjects)
    const [currentProject, setCurrentProject] = useState('')

    const [hiddenModalDelete, setHiddenModalDelete] = useState(true)

    const renderProjects = Object
    .keys(projects)
    .filter(key => key !== 'id')
    .map(project => {
        return <Project 
            key={projects[project].id} 
            name={project} 
            property={projects[project]} 
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            hiddenModalDelete={hiddenModalDelete}
            setHiddenModalDelete={setHiddenModalDelete}
        />
    })

    const handleResetCurrentProject = () => {
        setCurrentProject('');
    }

    return (
        <div className="projects-list">
            <div 
                className="projects-list__title title" 
                onClick={handleResetCurrentProject}
            >
                Projects
            </div>
            <ul className="projects-list__projects projects">
                { renderProjects }
            </ul>
            <AddProjectButton 
                projects={projects}
                setProjects={setProjects}
                currentProject={currentProject}
            />
            <DeleteModalWindow
                hidden={hiddenModalDelete}
                setHidden={setHiddenModalDelete}
                currentProject={currentProject}
                projects={projects}
                setProjects={setProjects}
            />
        </div>
    );
}

export default ProjectsList