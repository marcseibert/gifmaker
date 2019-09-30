import C from "./constants"

const action = {
    createProject(projectName) {
        return { type: C.CREATE_NEW_PROJECT, projectName}
    },
    openProjectContext(contextMode) {
        return { type: C.OPEN_PROJECT_DIALOG, contextMode}
    },
    closeProjectContext() {
        return { type: C.CLOSE_PROJECT_DIALOG}
    },
    importFiles(files) {
        return { type: C.IMPORT_FILES, files }
    },

    insertShotInTimeline(position, file) {
        return { type: C.INSERT_SHOT, position, file }
    },

    updatePreview(position, file) {
        return { type: C.UPDATE_PREVIEW,  file }
    }
}

export default action