import { connect } from "react-redux";
import { login } from "../actions";

function Login(dispatch) {
    let input;

    return (
        <form onSubmit={e => {
            e.preventDefault()

            if(!input.value.trim()) {
                return;
            }

            dispatch(login("LOGIN TEST"));
            input.value = "";
        }}>
            <input ref={node => { input = node }} />
            <button type="submit">Log In</button>
        </form>
    );
}

Login = connect()(Login);

export default Login;