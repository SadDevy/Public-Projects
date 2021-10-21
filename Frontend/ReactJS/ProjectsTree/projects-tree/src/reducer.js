import { combineReducers } from 'redux'

import projectsReducer from './projectsSlice'

const rootReducer = combineReducers({
    projects: projectsReducer
});

export default rootReducer