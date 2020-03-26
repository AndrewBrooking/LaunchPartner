import { makeStyles } from "@material-ui/core/styles";
import Login from "../components/Login";
import Register from "../components/Register";
import { Container, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#23395B",
        color: "#FAFAFA",
        padding: "7rem 3rem",
        margin: "0",
        textAlign: "center"
    }
}));

export default function App() {
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
                <Grid item style={{ padding: "0 1rem" }}>
                    <Login />
                </Grid>
                <Grid item style={{ padding: "0 1rem" }}>
                    <Register />
                </Grid>
            </Grid>
        </Container>
    );
}