import React, {useCallback} from 'react';
import { connect } from 'react-redux'
import { useDrag } from 'react-dnd'
import { useDropzone } from 'react-dropzone'
import {
    Grid,
    Box,
    Text,
    InfiniteScroll,
    Heading,
    ThemeContext
} from 'grommet'
import Action from '../store/actions'

import '../style/Main.css'

const ImportFileHint = props => {
    return (
        <Box
            round={"small"}
            border={{"color": "white", "size": "small", "style":"dashed",}}
            fill
            align="center"
            justify="center"
            className="boxHover"
        >
            <Heading>
                Drag and Drop GIFs here..
            </Heading>
        </Box>
    )
}

const ExplorerFileDraggable = ({ id, img }) => {

    const [, dragRef] = useDrag({
        item: { type: "DRAG", file: img}
    })

    return (
        <Box
            background="black"
            round="xsmall"
            pad="medium"
            height="7.2em"
            flex={false}
            align="center"
            justify="center"
            ref={dragRef}
            style={{backgroundImage: `url(${img.url})`}}
        >
            <Text>
            </Text>
        </Box>
    )
}

const ProjectExplorerComponent = ({ importedFiles, onImportFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        var filteredFiles = []

        acceptedFiles.forEach(element => {
            if(element.type === "image/gif") {
                filteredFiles.push(element)
            } else {
                console.log("unsupported file ")
            }
        });

        onImportFiles(filteredFiles)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({onDrop})

    return (
        <Box
            fill
            overflow="auto"
            pad="small"
            background="dark-1"
            {...getRootProps()}
        >
            <input 
            {...getInputProps()} />
            {importedFiles.length != 0 ? null :
                <ImportFileHint/>
            }
            <Grid columns="small" rows="flex" gap="small">
                <InfiniteScroll items={importedFiles} step={3}>
                    {
                        x => {
                            console.log(x)
                            return (<ExplorerFileDraggable 
                                        id={x}
                                        img={x[0]}
                                    />)
                        }
                    }
                </InfiniteScroll>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
        importedFiles: state.project.currentProject.importedFiles
    })

const mapDispatchToProps = dispatch => ({
        onImportFiles(files){ dispatch(Action.importFiles(files))}
    })

export const ProjectExplorer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectExplorerComponent)