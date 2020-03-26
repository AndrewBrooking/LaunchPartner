import { createStore } from "redux";
import { LOGIN, LOGOUT, SEARCH } from "./actions";

// Define initial state
const initialState = {
    authenticated: false,
    search: ""
};

// Create reducer
function appEvent(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            state.authenticated = true;
        case LOGOUT:
            state.authenticated = false;
        case SEARCH:
            state.search = action.payload.term;
    }

    return state;
}

// Create adn export store
export default createStore(appEvent);