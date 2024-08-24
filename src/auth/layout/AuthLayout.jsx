import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', p: 4 }}
        >

            <Grid item
                width={ {sm:450} }
                className="box-shadow"
                xs={3}
                sx={{ bgcolor: 'background.paper', borderRadius: 1, p: 4 }}
            >
                <Typography variant="h5" sx={{ mb: 1, }}> {title} </Typography>
                {children}
            </Grid>
        </Grid>
    )
}
