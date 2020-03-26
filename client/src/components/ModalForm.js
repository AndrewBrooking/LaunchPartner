import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Backdrop, Fade } from "@material-ui/core";

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
        padding: theme.spacing(2, 4, 3),
        width: "300px",
        textAlign: "center"
    },
    button: {
        margin: "0 25%"
    }
}));

function ModalForm(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>{props.buttonText}</Button>

            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
                        <div className={classes.paper}>
                            {props.children}
                            
                            <Button variant="contained" color="primary" type="submit" className={classes.button}>{props.buttonText}</Button>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalForm;