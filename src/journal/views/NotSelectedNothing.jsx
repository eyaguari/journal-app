import { StarOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"


export const NotSelectedNothing = () => {
  return (
    <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px )', backgroundColor: 'primary.main', borderRadius:3 }}
        >
            <Grid item xs={12}>
                <StarOutlined sx={{ fontSize: 100, color: 'white' }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ color: 'white' }}> No hay nada seleccionado </Typography>
            </Grid>
        </Grid>
  )
}
