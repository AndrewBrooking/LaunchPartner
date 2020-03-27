import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import UserPage from "./pages/UserPage";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/user/:uuid" component={UserPage} />
            </Switch>
        </Router>
    );
}