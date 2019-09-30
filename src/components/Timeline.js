import gifshot from '../lib/gifshot.js'
import React from 'react'
import { connect } from 'react-redux'
import { useDrop } from 'react-dnd'
import { Box } from 'grommet'
import Action from '../store/actions'

const CreatePreviewGIF = (timeline, onUpdatePreview) => {
    var frames = []

    onUpdatePreview(timeline[0].url)
    return
    for(let i = 0; i < timeline.length; i++) {
        let url = URL.createObjectURL(timeline[i].shot)
        frames.push(url)
        /*
        gifFrames({url, frames: 'all', outputType: 'png'}, (err, frameData) => {
            if(err) {
                throw err
            }
            var newFrames = frameData.map((item) => item.getImage())
            console.log(newFrames)
            frames = newFrames

            if(i == timeline.length - 1) {
                console.log(frames)
                var urls = frames.map((image) => URL.createObjectURL(image))
                console.log(urls)

            }
        })*/
    }
}

const TimelineShot = ({ id, file }) => {
    const [, drop] = useDrop({
        accept: "DRAG",
        drop(data){
            console.log(data)
        }
    })

    return (
        <li key={id} style={{float: "left", display: "inline-block"}}
        ref={drop}>
            <Box
                height="small"
                width="medium"
                background="black"
                round="xsmall"
                align="center"
                justify="center"
                style={{backgroundImage:`url(${file.url})`}}
            >
            </Box>
        </li>
    )
}

const TimelineSeparator = ({ id, onInsertShot, onUpdatePreview }) => {
    const [, drop] = useDrop({
        accept: "DRAG",
        drop(data){
            onInsertShot(id, data.file)
            CreatePreviewGIF()
        }
    })

    return (
        <li key={id} style={{float:"left", display: "inline-block"}}>
            <Box
                width="2.5em"
                height="small"
                flex={false}
                justify="center"
                align="center"
                ref={drop}
            >
                <Box 
                    width="0.6em"
                    height="4em"
                    background="gray"
                    round
                    style={{float:"none"}}
                >
                </Box>
            </Box>
        </li>
    )
}

export const TimelineComponent = ({timeline, onInsertShot, onUpdatePreview}) => {
    var count = 0

    return (<ul style={{ overflowX: "hidden", overflowY: "hidden", listStyle: "None", whiteSpace: "nowrap"}}>
                {  
                    timeline.map(
                        x => {
                            return [
                            <TimelineSeparator id={count++} onInsertShot={onInsertShot} onUpdatePreview={onUpdatePreview}/>,
                            <TimelineShot id={count} file={x.shot}/>
                            ]
                        }

                    )
                }
                <TimelineSeparator id={count} onInsertShot={onInsertShot}/>
            </ul>
        )
}

const mapStateToProps = state => ({
        timeline: state.timeline
    })

const mapDispatchToProps = dispatch => ({
        onInsertShot(position, shot) {
            dispatch(Action.insertShotInTimeline(position, shot))
        },
        onUpdatePreview(file) {
            dispatch(Action.updatePreview(file))
        }
    })

export const Timeline = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineComponent)