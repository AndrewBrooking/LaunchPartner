import { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../actions";
import { TextField } from "@material-ui/core";
import ModalForm from "./ModalForm";

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: "1rem",
        width: "90%"
    }
}));

function Login(props) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ModalForm buttonText="Log In" onSubmit={e => {
            e.preventDefault();

            if (!username.trim()) {
                return;
            }

            // TODO: Log user in

            props.login({ uuid: "TESTING" });
            setUsername("");
            setPassword("");
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
        login: uuid => dispatch(login(uuid))
    };
}

export default connect(null, mapDispatchToProps)(Login);