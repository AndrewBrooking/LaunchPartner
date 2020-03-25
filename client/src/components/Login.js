import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    input: {
        marginBottom: "1rem"
    },
    button: {
        margin: "0 25%"
    }
}));

function Login(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>Log In</Button>

            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <form noValidate autoComplete="off" onSubmit={e => {
                        e.preventDefault();

                        if (!username.trim()) {
                            return;
                        }

                        // TODO: Log user in
                        props.login({ uuid: "TESTING" });
                        setUsername("");
                        setPassword("");
                        handleClose();
                    }}>
                        <div className={classes.paper}>
                            <h2>Log In</h2>

                            <TextField
                                required
                                className={classes.input}
                                type="text"
                                label="Username"
                                
                                onChange={event => setUsername(event.target.value)}
                                autoComplete="current-username"
                            />

                            <br />

                            <TextField
                                required
                                className={classes.input}
                                type="text"
                                label="Password"
                                type="password"
                                
                                onChange={event => setPassword(event.target.value)}
                                autoComplete="current-password"
                            />

                            <br />

                            <Button variant="contained" color="primary" type="submit" className={classes.button}>Log In</Button>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        login: uuid => dispatch(login(uuid))
    };
}

export default connect(null, mapDispatchToProps)(Login);