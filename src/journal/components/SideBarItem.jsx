import { useDispatch } from "react-redux"
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ( {id, date,body="",title="", imageUrls=[]} ) => {

    const dispatch = useDispatch()

    const newTitle = useMemo( () => {
        return title.length > 20 
        ? title.substring(0, 17) + '...' 
        : title
    } )

    const handleActiveNote = () => {
        dispatch( setActiveNote({id, date,body,title, imageUrls}) )
    }

    return (
        <ListItem disablePadding
        onClick={ handleActiveNote }
        >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
