import { doc,collection, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { FirebaseAppFirestore } from '../../firebase/config'
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'
import { loadNotes } from '../../helpers/loadNotes'
import { fileUpload } from '../../helpers/fileUpload'


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote())

        const { uid} = getState().auth
        

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection(FirebaseAppFirestore, `${uid}/journal/notes`))
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        

        dispatch( addNewEmptyNote(newNote) )
        dispatch( setActiveNote(newNote) )

        
    }

} 

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        
        if (!uid) throw new Error('No hay un uid')

        const notes = await loadNotes(uid)
        
        dispatch( setNotes(notes) )
        
    } 
 }

 export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch( setSaving() )

        const { uid } = getState().auth
        const { activeNote } = getState().journal

        const noteToFirestore = { ...activeNote}
        delete noteToFirestore.id

        const docRef = doc(FirebaseAppFirestore, `${uid}/journal/notes/${activeNote.id}`)
        await setDoc(docRef, noteToFirestore, { merge: true })

        dispatch( updateNote(activeNote) )
    }
 }

 export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {

        dispatch( setSaving() )

        const filesUploadsPromises = []

        for( const file of files ){
            filesUploadsPromises.push( fileUpload(file))
        }

        const photosUrl = await Promise.all(filesUploadsPromises)
        
        dispatch( setPhotosToActiveNote(photosUrl) )
    }
 }

 export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        
        const { uid } = getState().auth
        const { id } = getState().journal.activeNote

        const docRef = doc( FirebaseAppFirestore, `${uid}/journal/notes/${id}`)
        await deleteDoc( docRef )

        dispatch( deleteNoteById( id ) )
        
    }
 }