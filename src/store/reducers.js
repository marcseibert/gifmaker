import { combineReducers } from 'redux'
import C from './constants'

const editProject = (state, action) => {
    switch(action.type) {
        case C.CREATE_NEW_PROJECT:
            return {...state,
                    name: action.projectName,
                    importedFiles: []
                }
        case C.IMPORT_FILES:
            return {...state,
                    importedFiles: [...state.importedFiles, 
                        action.files.map((file) => ({
                            file,
                            url: URL.createObjectURL(file)
                        }))]
                }
        default:
            return state == {} ?
                { name: "", importedFiles: [] } :
                state
    }
}

const timeline = (state, action) => {
    switch(action.type) {
        case C.INSERT_SHOT:
            var newState = [...state]
            newState.splice(action.position, 0, { shot: action.file})
            return newState

        default:
            return state == null ? 
                [] : 
                state
    }
}

const createProject = (state, action) => {
    switch(action.type) {
        case C.OPEN_PROJECT_DIALOG:
            return Object.assign({}, state, {
                inFileDialog: true
            })
        case C.CLOSE_PROJECT_DIALOG:
            return Object.assign({}, state, {
                inFileDialog: false
            })
        case C.CREATE_NEW_PROJECT:
            return {...state, currentProject: editProject(state.currentProject, action)} 
        default:
            return state == {} ?
                {...state, currentProject: editProject(state.currentProject, action)} :
                state
    }
}

const project = (state, action) => {
    switch(action.type) {
        case C.OPEN_PROJECT_DIALOG:
            return Object.assign({}, state, {
                inFileDialog: true
            })
        case C.CLOSE_PROJECT_DIALOG:
            return Object.assign({}, state, {
                inFileDialog: false
            })
        case C.CREATE_NEW_PROJECT:
            return {...state,
                ...createProject(state, action)
            }
        case C.IMPORT_FILES:
            return {...state, currentProject: editProject(state.currentProject, action)}
        case C.UPDATE_PREVIEW:
            return { ...state, preview: action.file }
        default:
            return state == null ? 
            {inFileDialog: false, currentProject: {name:"undefined", importedFiles: []}} : 
            state
    }
}
export const mainReducer = combineReducers({project, timeline})
