import { createStore } from 'redux'
import { mainReducer } from './reducers'

const initState = { currentProject: { name: "undefined", importedFiles: [],} } 
export const storeFactory = (state=initState) => {
    return createStore(mainReducer)
}