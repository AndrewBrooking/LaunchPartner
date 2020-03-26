import { useState } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import API from "../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../redux/actions";
import { TextField } from "@material-ui/core";
import ModalForm from "./ModalForm";
import UploadButton from "./UploadButton";

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: "1rem",
        width: "90%"
    }
}));

function Register(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);

    return (
        <ModalForm buttonText="Register" onSubmit={e => {
            e.preventDefault();

            if (password === verify) {
                API.register(email, username, password, description, photo).then(res => {
                    // Store UUID
                    let uuid = res.data.uuid;

                    // Process login
                    props.login();

                    // Clear fields
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setVerify("");
                    setDescription("");
                    setPhoto(null);

                    // Redirect to user page
                    Router.push(`/user/${uuid}`);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                // TODO: Display failure message
                console.log("Passwords do not match");
            }
        }}>
            <h2>Registration</h2>

            <TextField
                required
                className={classes.input}
                type="text"
                label="Email"
                onChange={event => setEmail(event.target.value)}
                value={email}
                autoComplete="current-email"
            />

            <TextField
                required
                className={classes.input}
                type="text"
                label="Username"
                onChange={event => setUsername(event.target.value)}
                value={username}
                autoComplete="current-username"
            />

            <TextField
                required
                className={classes.input}
                type="password"
                label="Password"
                onChange={event => setPassword(event.target.value)}
                value={password}
                autoComplete="current-password"
            />

            <TextField
                required
                className={classes.input}
                type="password"
                label="Verify Password"
                onChange={event => setVerify(event.target.value)}
                value={verify}
                autoComplete="verify-password"
            />

            <TextField
                className={classes.input}
                type="text"
                multiline={true}
                rowsMax={10}
                label="Description"
                onChange={event => setDescription(event.target.value)}
                value={description}
                autoComplete="current-description"
            />

            <UploadButton setPhoto={setPhoto} />

        </ModalForm>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        login: uuid => dispatch(login(uuid))
    };
}

export default connect(null, mapDispatchToProps)(Register);