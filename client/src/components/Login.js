import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import API from "../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../redux/actions";
import { TextField } from "@material-ui/core";
import ModalForm from "./ModalForm";

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(1),
        width: "90%"
    }
}));

function Login({ login }) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState("");

    if (redirect.length > 0) {
        return <Redirect to={redirect} />;
    }

    return (
        <ModalForm buttonText="Log In" onSubmit={e => {
            e.preventDefault();

            if (!username.trim()) {
                return;
            }

            API.login(username, password).then(res => {
                // Process login
                login();

                // Clear fields
                setUsername("");
                setPassword("");

                // Redirect to user page
                setRedirect(`/user/${res.data.uuid}`);
            }).catch(err => {
                console.log(err);
            });
        }}>
            <h2>Log In</h2>

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
                label="Password"
                type="password"
                onChange={event => setPassword(event.target.value)}
                value={password}
                autoComplete="current-password"
            />
        </ModalForm>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        login: () => dispatch(login())
    };
}

export default connect(null, mapDispatchToProps)(Login);