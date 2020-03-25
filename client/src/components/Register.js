import { connect } from "react-redux";
import { login } from "../../actions";

function Register(dispatch) {
    let input;

    return (
        <form onSubmit={e => {
            e.preventDefault()

            if (!input.value.trim()) {
                return;
            }

            dispatch(login("REGISTER TEST"));
            input.value = "";
        }}>
            <input ref={node => { input = node }} />
            <button type="submit">Register</button>
        </form>
    );
}

Register = connect()(Register);

export default Register;