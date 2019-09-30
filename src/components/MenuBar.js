import React from 'react'
import { connect } from 'react-redux'
import { 
    Box,
    Menu,
    Text 
} from 'grommet'

const MenuBarComponent = ({ projectName="undefined" }) => {
    return (
        <Box
            fill
            background="dark"
        >
            <Box 
                direction="row-responsive"
            >
                <Box
                    direction="row-responsive"
                >
                    <Menu label="File"
                        items={[
                            { label: 'New Project', onClick: f => f},
                            { label: 'Open Project', onClick: f => f},
                            { label: 'Save Project', onClick: f => f},
                            { label: 'Export GIF..', onClick: f => f},
                        ]}

                    />
                    <Menu
                        label="Edit"
                        items={[
                            { label: 'Undo', onClick: f => f},
                            { label: 'Redo', onClick: f => f},
                        ]}
                    />
                </Box>
                <Box
                    align="center"
                    justify="center"
                    fill
                >
                    <Text
                        style={{ margin:"auto" }}
                        weight="bold"
                    >
                        { projectName }
                    </Text>

                </Box>
                </Box>
            </Box>
        )
    }

    const mapStateToProps = state => ({
            projectName: state.project.currentProject.name
        })

    const mapDispatchToProps = dispatch => ({

        })

    export const MenuBar = connect(
        mapStateToProps,
        mapDispatchToProps
    )(MenuBarComponent)
