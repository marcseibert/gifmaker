import React from 'react'
import { connect } from 'react-redux'
import {
    Box,
    Grid,
    Button
} from 'grommet'

import Action from '../store/actions'


export const PreviewWindowComponent = ({preview, timeline, onUpdatePreview}) => {
    return (
        <Box
            fill
            align="center"
            justify="center"
            gap="small"
            background="dark-1"
        >
            <Box
                width="medium"
                height="medium"
                background="dark-3"
                style={{backgroundImage:`url(${preview})`, backgroundSize:'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}
            >

            </Box>
            <Box
                round
            >
                <Grid
                    fill
                    areas={
                        [
                            { name: "back", start: [0, 0], end: [0,0] },
                            { name: "play", start: [1, 0], end: [1,0] },
                            { name: "toEnd", start: [2, 0], end: [2,0] },
                        ]
                    }
                    columns={["flex", "flex", "flex"]}
                    rows={["flex"]}
                    gap="small"
                >
                    <Button gridArea="back" label="|<"/>
                    <Button gridArea="play" label=">" primary/>
                    <Button gridArea="toEnd" label=">|"/>

                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
        timeline: state.timeline,
        preview: state.project.preview
    })

const mapDispatchToProps = dispatch => ({
        onUpdatePreview(file) {
            dispatch(Action.updatePreview(file))
        }
    })

export const PreviewWindow = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewWindowComponent)