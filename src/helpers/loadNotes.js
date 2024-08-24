import {  collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseAppFirestore } from "../firebase/config"

export const loadNotes = async ( uid = '' ) => {
    if (!uid) throw new Error('No hay un uid')
    
    const collectionRef = collection( FirebaseAppFirestore, `${uid}/journal/notes`) 
    const docs = await getDocs(collectionRef)

    const notes = []
    docs.forEach( doc => {
        notes.push( { id: doc.id, ...doc.data() } )
    } )
    return notes
} 