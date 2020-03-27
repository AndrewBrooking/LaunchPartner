import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "../components/Login";
import Register from "../components/Register";
import { Container, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#23395B",
        color: "#FAFAFA",
        padding: theme.spacing(7, 3),
        margin: "0",
        textAlign: "center"
    },
    gitem: {
        padding: "0 1rem"
    }
}));

export default function Landing() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classes.root}>
            <Typography variant="h2" >Welcome to Populus</Typography>
            <Typography variant="body1">
                Discover new people!
            </Typography>

            <br />

            <Grid
                container 
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item className={classes.gitem}>
                    <Login />
                </Grid>
                <Grid item className={classes.gitem}>
                    <Register />
                </Grid>
            </Grid>
        </Container>
    );
}