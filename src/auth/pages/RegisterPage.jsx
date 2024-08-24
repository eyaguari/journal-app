import { useMemo, useState } from "react"
import { Link as RouterLink } from "react-router-dom"

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingWithEmailPassword } from "../../store/auth/thunks"



const formValidations = {
    email: [(value) => value.includes('@'), 'El correo es inválido'],
    password: [(value) => value.length > 5, 'La contraseña es muy corta'],
    displayName: [(value) => value.length > 3, 'El nombre es requerido'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)
  const [formSubmmited, setformSubmmited] = useState(false)

  const { displayName, email, password, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid } = useForm({
    email: '',
    password: '',
    displayName: '',
  }, formValidations)  

  

  const isChecking = useMemo( ()=> status === 'checking', [status] )

  const onSubmit = (e) => {
    e.preventDefault();

    if(!isFormValid) return;
    setformSubmmited(true);

    dispatch( startCreatingWithEmailPassword(formState) )
  }


  return (
    <AuthLayout title={'Crea una cuenta'}>
      <form onSubmit={onSubmit}>
        <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Nombres"
              name='displayName'
              onChange={onInputChange}
              value={displayName}
              type="text"
              placeholder="John Doe"
              fullWidth
              error={ !!displayNameValid && formSubmmited }
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Correo"
              name="email"
              onChange={onInputChange}
              value={email}
              type="email"
              placeholder="correo@google.com"
              fullWidth
              error={ !!emailValid && formSubmmited }
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              name="password"
              onChange={onInputChange}
              value={password}
              type="password"
              placeholder="contraseña"
              fullWidth
              error={ !!passwordValid && formSubmmited }
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} >
              <Alert 
              severity="error"
              sx={{ display: !!errorMessage ? '': 'none'}}
              >
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} >
              <Button 
              disabled={isChecking}
              type='submit' 
              variant="contained" 
              fullWidth
              >Crear Cuenta
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end' >
            <Typography sx={{ mr: 1 }} >¿Ya tienes una cuenta? </Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>Inicia Sesión</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
