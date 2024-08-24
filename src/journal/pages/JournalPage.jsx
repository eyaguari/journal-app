import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"

import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NotSelectedNothing } from "../views"
import { useMemo } from "react"



export const JournalPage = () => {

  const dispatch = useDispatch()
  const { isSaving, activeNote } = useSelector( state => state.journal )

  const handleNewNote = () => {
    
    dispatch( startNewNote() )

  }
  return (
    <JournalLayout>
      
      {
        (!!activeNote)
        ? <NoteView/>
        : <NotSelectedNothing/>
      }
      
      

      <IconButton
      disabled={isSaving}
      onClick={handleNewNote}
      size="large"
      sx={{
        color: "white",
        backgroundColor: "error.main",
        ":hover": {backgroundColor: "error.main", opacity: 0.9},
        position: "fixed",
        right: 50,
        bottom: 50,
      }}
      >
      <AddOutlined sx={{ fontSize: 30 }} />
    </IconButton>
    </JournalLayout>
    

    
  )
}
