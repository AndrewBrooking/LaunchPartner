import Login from "../components/Login";
import Register from "../components/Register";
import { Container } from "@material-ui/core";

export default function App() {

    return (
        <Container>
            Hello World!

            <br />

            <div>
                <Login />
                <Register />
            </div>
        </Container>
    );
}