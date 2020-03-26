// import Link from "next/link";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "./App";

export default function Index() {
    return (
        <Provider store={store}>
            <Head>
                <title>Populus</title>
            </Head>
            
            <App />
        </Provider>
    );
}