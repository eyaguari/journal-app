import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"

import { DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'




export const NoteView = () => {

    const dispatch = useDispatch()
    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(activeNote)

    const dateFormatted = useMemo(() => {
        const dateObj = new Date(date)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return dateObj.toLocaleDateString('es-ES', options)
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {

        if (messageSaved.length > 0) {
            Swal.fire('Guardado', messageSaved, 'success')
        }

    }, [messageSaved])


    const handleSaveNote = () => {
        dispatch(startSaveNote())
    }

    const handleDelete = () => {
        
        dispatch( startDeletingNote() )
    }

    const handleInputChange = ({ target }) => {
        if (target.files.length === 0) return

        dispatch(startUploadingFiles(target.files))
    }


    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateFormatted}</Typography>
            </Grid>

            <input
                type="file"
                onChange={handleInputChange}
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
            />


            <Grid item  >

                <IconButton
                    disabled={isSaving}
                    color="primary"
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined/>
                </IconButton>
                
                <Button
                    disabled={isSaving}
                    onClick={handleSaveNote}
                     >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    name="title"

                    fullWidth
                    placeholder="Escribe el titulo de tu nota"
                    label="Titulo"
                    value={title}
                    sx={{ border: 'none', mb: 1 }}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    name="body"
                    onChange={onInputChange}
                    fullWidth
                    placeholder="Que ha sucedio hoy?"
                    multiline
                    minRows={10}
                    value={body}
                    sx={{ border: 'none', mb: 1 }}
                />

            </Grid>

            <Grid container justifyContent='end'>
                <Button
                onClick={ handleDelete}
                sx={{ mt: 2 }}
                color="error"
                > 
                    <DeleteOutlined/>
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={activeNote.imageUrls}/>
        </Grid>
    )
}
