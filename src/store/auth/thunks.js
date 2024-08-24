import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ({ email, password }) => {
    return (dispatch) => {
        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn =  () => {
    return async (dispatch) => {
        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()

        if (!result.ok) {
            return dispatch( logout(result) )
        }

        dispatch( login(result))
    }
}

export const startCreatingWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() )

        const {ok, uid, photoURL, errorMessage} = await registerWithEmailPassword({email, password, displayName})
        
        if (!ok) {
            return dispatch( logout({errorMessage}) )
        }

        dispatch( login({uid, email, displayName, photoURL}) )
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch( checkingCredentials())

        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({email, password})


        if (!ok) {
            return dispatch( logout({errorMessage}) )
        }

        dispatch( login({uid, email, displayName, photoURL}) )
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        
        await logoutFirebase()

        dispatch( clearNotesLogout() )
        dispatch( logout({}) )
    }
}