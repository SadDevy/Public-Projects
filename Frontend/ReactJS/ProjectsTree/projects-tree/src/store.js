import { createStore } from 'redux'
import projectsReducer from './projectsSlice'

import projects from './components/projects/projects.json'

const store = createStore(projectsReducer, projects);

export default store

