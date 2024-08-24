import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'


const formData = {
  email: '',
  password: ''
}


export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const { email, password, onInputChange, formState } = useForm(formData)

  
  const isAuthenticated = useMemo( () => status === 'checking', [status] )

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(checkingAuthentication(formState))
    
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  const onLoginWithEmailPasword = () => {
    dispatch(startLoginWithEmailPassword(formState))
  }

  return (
    <AuthLayout title={'Inicia sesión'}>
      <form onSubmit={ onSubmit } >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Alert severity="error" sx={{ mt: 2 , display: !!errorMessage ? '' : 'none'}}>{errorMessage}</Alert>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          
            <Grid item xs={12} sm={6}>
              <Button 
              onClick={onLoginWithEmailPasword}
              disabled={isAuthenticated}
              type="submit" 
              variant="contained" 
              fullWidth>Iniciar Sesión</Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticated} onClick={ onGoogleSignIn }variant="contained" fullWidth>
                <Google /><Typography sx={{ ml: 1 }}> Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end' >
            <Link component={RouterLink} color='inherit' to='/auth/register'>Crear una cuenta</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
