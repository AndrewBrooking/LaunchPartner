import Link from "next/link";
import { Provider } from "react-redux";
import store from "../../store";
import Login from "../components/Login";
import Register from "../components/Register";

export default function App() {
    return (
        <Provider store={store}>
            Hello World!

            <br />

            <Login />
            <Register />
        </Provider>
    );
}