import React from 'react'
import { MenuBar } from './MenuBar'
import { Timeline } from './Timeline'
import { PreviewWindow } from './PreviewWindow'
import { ProjectExplorer } from './ProjectExplorer'
import Grommet, {
    Grid,
    Box,
    Button,
    Text,
    TextInput,
    Heading
} from 'grommet'
import {
    Edit,
    Folder,
    Close
} from 'grommet-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Action from '../store/actions'

export const  MainView = props => {
    return (
        <DndProvider backend={HTML5Backend}>

            <Grid
                fill="vertical"
                background="dark-2"
                rows={["xxsmall", "flex", "medium"]}
                columns={["60%", "flex"]}
                areas={[
                    { name: "MenuBar", start: [0, 0], end: [1, 0] },
                    { name: "Timeline", start: [0, 2], end: [1, 2] },
                    { name: "ProjectExplorer", start: [0, 1], end: [0, 1] },
                    { name: "PreviewWindow", start: [1, 1], end: [1, 1] },
                ]}
            >
                <Box
                    gridArea="MenuBar"
                    background="dark-1"
                    direction="row"
                >
                    <MenuBar />
                </Box>
                <Box
                    gridArea="Timeline"
                    background="dark-2"
                    direction="row"
                    pad={{horizonal: "large", vertical: "large"}}
                    justify="center"
                >
                    <Timeline />
                </Box>
                <Box
                    gridArea="ProjectExplorer"
                    border={{ color: 'black', size:"3px"}}
                    round="small"
                >
                    <ProjectExplorer />
                </Box>
                <Box
                    gridArea="PreviewWindow"
                    border={{ color: 'black', size:"3px"}}
                    round="small"
                >
                    <PreviewWindow />
                </Box>
            </Grid>
        </DndProvider>
    )}


const FileDialogButtons = ({targetEditPage, onCreateProject, onCloseProjectContext}) => {
    var _projectName = ""

    return (<div>
            <Box
                align="center"
                justify="center"
                fill={false}
            >
                <Heading> gifmaker </Heading>
            </Box>
            <Box
                direction="row-responsive"
                align="center"
                justify="center"
                pad="medium"
                gap="small"
                fill={false}
            >
                <TextInput 
                    placeholder="type project name here"
                    onChange={event => _projectName = event.target.value}
                />
                <Link to={"/edit"}>
                    <Button
                        label="Create"
                        onClick={() => {
                            onCreateProject(_projectName)

                        }}
                    />
                </Link>
                <Button
                    icon={<Close/>}
                    onClick={() => onCloseProjectContext()}
                />
            </Box></div>)
}

const ProjectDialogButtons = ({onOpenProjectContext, onCloseProjectContext}) => {
    return (<Box
                direction="row-responsive"
                align="center"
                justify="center"
                pad="medium"
                gap="small"
                fill={false}
            >
                <Heading> gifmaker </Heading>
                <Button
                    icon={<Edit/>}
                    label="New Project.."
                    onClick={() => onOpenProjectContext("new")}
                />
                <Button
                    icon={<Folder/>}
                    label="Open.."
                    onClick={() => onOpenProjectContext("new")}
                />
            </Box>)
}

const StartViewComponent = ({targetEditPage, inFileDialog=false, onOpenProjectContext, onCloseProjectContext, onCreateProject}) => {
    return (
        <Box
            gap="medium"
            align="center"
            justify="center"
            fill
        >
            <Box
                justify="center"
                background="dark-1"
                round
                width="xlarge"
                pad="large"
                align="center"
            >
                {
                    inFileDialog ? 
                    <FileDialogButtons 
                        targetEditPage={targetEditPage}
                        onCreateProject={onCreateProject}
                        onCloseProjectContext={onCloseProjectContext}
                    /> :
                    <ProjectDialogButtons 
                        onOpenProjectContext={onOpenProjectContext}
                        onCloseProjectContext={onCloseProjectContext}
                    />
                }
                <Text
                    width="medium"
                    size="large"
                >
                    Create, edit and merge gifs with ease.  
                    A small tool created for the coding challenge of tender frame.
                </Text>
            </Box>
            <Box
                direction="row-responsive"
                justify="center"
                align="center"
            >
            
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
        targetEditPage: "/edit/" + state.project.currentProject.name,
        inFileDialog: state.project.inFileDialog
    })

const mapDispatchToProps = dispatch => 
    ({
        onCreateProject(projectName) {
            dispatch(Action.createProject(projectName))
        },
        onOpenProjectContext(contextMode) {
            dispatch(Action.openProjectContext(contextMode))
        },
        onCloseProjectContext() {
            dispatch(Action.closeProjectContext())
        }
    })

export const StartView = connect(
    mapStateToProps,
    mapDispatchToProps
)(StartViewComponent)