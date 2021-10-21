const projectsReducer = (state = {}, action) => {
    const payload = action.payload;

    switch (action.type) {
        case 'Add Project': {
            addNewProject(state, payload.currentProject, payload.projectName);
            return state;
        }
        case 'Delete Project': {
            deleteProject(state, payload.currentProject);
            return state;
        }
        default:
            return state;
    }
}

const getMaxProjectId = (projects, id = 0) => {
    let maxId = id;

    for (let key in projects) {
        if (projects[key].id)
            if (maxId < projects[key].id)
                maxId = projects[key].id;

        if (Object.keys(projects[key]).length !== 0)
            maxId = getMaxProjectId(projects[key], maxId);
    }

    return maxId;
}

const getCurrentProject = (projects, currentProject) => {
    if (currentProject === '')
        return;

    for (let key in projects) {
        if (key === currentProject)
            return projects[key];

        if (Object.keys(projects[key]).length !== 0) {
            const current = getCurrentProject(projects[key], currentProject);
            if (current)
                return current;
        }
    }

    return;
}

const addNewProject = (projects, currentProject, projectName) => {
    const project = getCurrentProject(projects, currentProject);
    if (!project) {
        projects[projectName] = {
            id: getMaxProjectId(projects) + 1    
        }

        return;
    }

    project[projectName] = {
        id: getMaxProjectId(projects) + 1
    }
}

const deleteProject = (projects, currentProject) => {
    for (let key in projects) {
        if (key === currentProject) {
            delete projects[key];
            return;
        }

        if (Object.keys(projects[key]).length !== 0) {
            const current = deleteProject(projects[key], currentProject);
            if (current)
                return current;
        }
    }

    return;
}

export default projectsReducer